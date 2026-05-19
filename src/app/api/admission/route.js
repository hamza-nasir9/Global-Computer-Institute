/**
 * POST /api/admission  — submit admission form → save to MongoDB
 * GET  /api/admission  — admin only → fetch all submissions from MongoDB
 */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admission from '@/models/Admission';
import { sendAdmissionNotification } from '@/lib/mailer';

const isObjectId = (s) => /^[a-f\d]{24}$/i.test(String(s ?? ''));

/**
 * Get requester role from request headers.
 * x-user-role: admin is set by AuthContext from the verified login response.
 * For ObjectId users we also verify against the DB.
 */
async function getRole(req) {
  const uid  = req.headers.get('x-user-id')  || '';
  const role = req.headers.get('x-user-role') || '';

  if (role === 'admin') {
    // Additionally verify in DB for ObjectId users
    if (isObjectId(uid)) {
      try {
        const conn = await dbConnect();
        if (conn) {
          const { default: User } = await import('@/models/User');
          const u = await User.findById(uid).select('role').lean();
          return u?.role || null;
        }
      } catch { /* DB verify failed — trust header */ }
    }
    return 'admin'; // trust header for non-ObjectId (local admin during setup)
  }

  if (isObjectId(uid)) {
    try {
      const conn = await dbConnect();
      if (!conn) return null;
      const { default: User } = await import('@/models/User');
      const u = await User.findById(uid).select('role').lean();
      return u?.role || null;
    } catch { return null; }
  }

  return null;
}

/* ── POST: Submit admission form ─────────────────────────────── */
export async function POST(req) {
  try {
    // Parse body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body — expected JSON.' }, { status: 400 });
    }

    const {
      // Registration
      regNo,
      // Student info
      fullName, fatherName, address, qualification, profession,
      // Contact
      phone, guardianPhone, whatsapp, email,
      // Course
      course, courseToJoin, selectedCourses,
      // Timing & how they knew
      timing, howKnew,
      // Fee
      dateOfAdmission, monthlyFee, admissionFee, totalFee,
      // Photo path (filesystem path from /api/upload)
      image,
      // IDs
      userId: bodyUserId,
      // Legacy fields
      cnic, gender, dob,
    } = body;

    // ── Required field validation ──────────────────────────────
    if (!fullName?.trim()) {
      return NextResponse.json({ error: 'Student name (fullName) is required.' }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Student mobile (phone) is required.' }, { status: 400 });
    }

    // ── Resolve primary course ─────────────────────────────────
    let primaryCourse = '';
    if (Array.isArray(selectedCourses) && selectedCourses.length > 0) {
      primaryCourse = selectedCourses[0];
    } else if (typeof selectedCourses === 'string' && selectedCourses.trim()) {
      primaryCourse = selectedCourses.trim().split(',')[0].trim();
    }
    if (!primaryCourse) primaryCourse = (courseToJoin || course || 'Not specified').trim();

    // ── Resolve howKnew to string ──────────────────────────────
    const howKnewStr = Array.isArray(howKnew)
      ? howKnew.join(', ')
      : (howKnew || '');

    // ── Resolve selectedCourses to string ──────────────────────
    const selectedCoursesStr = Array.isArray(selectedCourses)
      ? selectedCourses.join(', ')
      : (selectedCourses || '');

    // ── Resolve userId ─────────────────────────────────────────
    const headerUid   = req.headers.get('x-user-id') || '';
    const resolvedUid = isObjectId(headerUid)  ? headerUid
                      : isObjectId(bodyUserId) ? String(bodyUserId)
                      : null;

    const cleanEmail = (email || '').trim().toLowerCase();

    // ── Build payload matching Admission model schema ──────────
    const admissionPayload = {
      // User link
      userId:    resolvedUid,
      userEmail: cleanEmail,

      // Core
      fullName:      fullName.trim(),
      fatherName:    (fatherName    || '').trim(),
      course:        primaryCourse,
      phone:         phone.trim(),
      email:         cleanEmail,

      // Registration / legacy
      regNo:         (regNo || cnic || '').trim(),
      cnic:          (cnic  || regNo || '').trim(),

      // Personal
      address:       (address       || '').trim(),
      qualification: (qualification || '').trim(),
      gender:        gender  || '',
      dob:           dob     || '',

      // Extended GCI form fields
      profession:      (profession    || '').trim(),
      guardianPhone:   (guardianPhone || '').trim(),
      whatsapp:        (whatsapp      || '').trim(),
      timing:          timing         || '',
      courseToJoin:    (courseToJoin  || '').trim(),
      howKnew:         howKnewStr,
      selectedCourses: selectedCoursesStr,

      // Fee
      dateOfAdmission: dateOfAdmission || '',
      monthlyFee:      monthlyFee      || '',
      admissionFee:    admissionFee    || '',
      totalFee:        totalFee        || '',

      // Photo — filesystem path e.g. /uploads/students/student-xxx.jpg
      image: image || '',

      status: 'Pending',
    };

    // ── Connect and save ───────────────────────────────────────
    let conn;
    try {
      conn = await dbConnect();
    } catch (dbErr) {
      console.error('[POST /api/admission] DB connection error:', dbErr.message);
      return NextResponse.json(
        { error: 'Database connection failed. Your data was not saved. Please try again.' },
        { status: 503 }
      );
    }

    let savedAdmission;

    if (conn) {
      // ── MongoDB save ──────────────────────────────────────────
      try {
        const doc = await Admission.create(admissionPayload);
        savedAdmission = {
          ...doc.toObject(),
          id:          doc._id.toString(),
          _id:         doc._id.toString(),
          submittedAt: doc.createdAt,
        };
        console.log(`[admission] ✓ Saved to MongoDB: ${doc._id} — ${fullName}`);
      } catch (saveErr) {
        console.error('[POST /api/admission] Mongoose save error:', saveErr.message, saveErr.errors);
        return NextResponse.json(
          { error: `Failed to save: ${saveErr.message}` },
          { status: 500 }
        );
      }
    } else {
      // ── Offline fallback ──────────────────────────────────────
      const localId = `local-${Date.now()}`;
      savedAdmission = {
        ...admissionPayload,
        id:          localId,
        _id:         localId,
        submittedAt: new Date().toISOString(),
        createdAt:   new Date().toISOString(),
      };
      console.warn('[admission] ⚠ Saved locally only — MongoDB not connected');
    }

    // ── Fire email notification (non-blocking) ─────────────────
    sendAdmissionNotification(savedAdmission).catch(err =>
      console.warn('[admission] Email notification failed (non-fatal):', err.message)
    );

    return NextResponse.json({ admission: savedAdmission }, { status: 201 });

  } catch (err) {
    console.error('[POST /api/admission] Unexpected error:', err.message, err.stack);
    return NextResponse.json(
      { error: 'Unexpected server error. Please try again.' },
      { status: 500 }
    );
  }
}

/* ── GET: Admin fetch all admissions ─────────────────────────── */
export async function GET(req) {
  try {
    // Auth check
    const role = await getRole(req);
    if (!role) {
      return NextResponse.json({ error: 'Unauthorized — please log in.' }, { status: 401 });
    }
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    // Connect
    let conn;
    try {
      conn = await dbConnect();
    } catch (dbErr) {
      return NextResponse.json(
        { error: `Database connection failed: ${dbErr.message}` },
        { status: 503 }
      );
    }

    if (!conn) {
      return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
    }

    // Parse query params
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const course = searchParams.get('course') || '';
    const q      = searchParams.get('q')      || '';
    const page   = Math.max(1, parseInt(searchParams.get('page')  || '1'));
    const limit  = Math.min(500, parseInt(searchParams.get('limit') || '200'));

    // Build filter
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    if (course && course !== 'All') filter.course = course;
    if (q.trim()) {
      const re = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { fullName: re },
        { email: re },
        { phone: re },
        { cnic: re },
        { regNo: re },
        { course: re },
      ];
    }

    const [admissions, total] = await Promise.all([
      Admission.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Admission.countDocuments(filter),
    ]);

    const normalised = admissions.map(a => ({
      ...a,
      id:          a._id.toString(),
      _id:         a._id.toString(),
      submittedAt: a.createdAt || new Date(),
    }));

    return NextResponse.json({ admissions: normalised, total, page, limit });

  } catch (err) {
    console.error('[GET /api/admission] Unexpected error:', err.message, err.stack);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
