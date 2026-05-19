'use client';
import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { getStudentById } from '@/lib/studentStore';

function PrintPageClient() {
  const params = useParams();
  const [student,  setStudent]  = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;

    async function load() {
      /* 1. Try MongoDB API first (most up-to-date data) */
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('gci_user') : null;
        const user   = stored ? JSON.parse(stored) : null;
        const headers = { 'Content-Type': 'application/json' };
        if (user?.id)   headers['x-user-id']   = String(user.id);
        if (user?.role) headers['x-user-role']  = String(user.role);

        const res = await fetch(`/api/admission/${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.admission) {
            const a = data.admission;
            setStudent({
              ...a,
              id:          a._id?.toString() || a.id || id,
              submittedAt: a.createdAt || a.submittedAt || new Date().toISOString(),
            });
            setTimeout(() => window.print(), 900);
            return;
          }
        }
      } catch (err) {
        console.warn('[print] API lookup failed:', err.message);
      }

      /* 2. Fallback: localStorage */
      const local = getStudentById(id);
      if (local) {
        setStudent(local);
        setTimeout(() => window.print(), 900);
        return;
      }

      setNotFound(true);
    }

    load();
  }, [params?.id]);

  if (notFound) return (
    <div style={{ fontFamily: 'Arial,sans-serif', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#333', marginBottom: 8 }}>Record not found.</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 20 }}>The record may have been deleted or the ID is invalid.</p>
      <button onClick={() => window.close()}
        style={{ padding: '8px 20px', cursor: 'pointer', borderRadius: 6, border: '1px solid #ccc' }}>
        Close
      </button>
    </div>
  );

  if (!student) return (
    <div style={{ fontFamily: 'Arial,sans-serif', padding: 40, textAlign: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #D4A017', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
      <p style={{ marginTop: 16, color: '#666' }}>Loading…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  const s = student;
  const submittedDate = new Date(s.submittedAt || s.createdAt).toLocaleDateString('en-PK', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  /* Parse selectedCourses — can be comma-separated string or array */
  const coursesArr = Array.isArray(s.selectedCourses)
    ? s.selectedCourses
    : (s.selectedCourses || '').split(',').map(x => x.trim()).filter(Boolean);

  const ALL_COURSES_LEFT = [
    'Diploma Information Technology (DIT)',
    'Certificate Information Technology (CIT)',
    'Microsoft Office',
    'Multimedia & Graphics',
    'Web Design & Development',
    'English Language / IELTS Preparation',
    'Job Package',
    'Auto Cad 2D & 3D',
  ];
  const ALL_COURSES_RIGHT = [
    'Social Media Marketing',
    'Computerized Accounting',
    'Computer Hardware & Networking',
    'Computer Languages C++ PHP',
    'Freelancing Career',
    'School Teaching Course / Summer Camp',
  ];

  /* Resolve image: filesystem path (/uploads/...) or base64 data-URL */
  const photoSrc = s.image || null;

  return (
    <>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Segoe UI',Arial,sans-serif; background:#f5f5f5; color:#111; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        .page { background:#fff; max-width:820px; margin:20px auto; border-radius:10px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.12); }
        .header { background:linear-gradient(135deg,#D4A017 0%,#F5C842 100%); padding:14px 28px; display:flex; align-items:center; justify-content:space-between; }
        .logo-text h1 { font-size:26px; font-weight:900; color:#000; letter-spacing:-1px; }
        .logo-text p { font-size:13px; font-weight:700; color:#000; }
        .logo-text small { font-size:10px; color:rgba(0,0,0,.6); }
        .admit-badge { background:#000; color:#F5C842; font-weight:900; font-size:12px; padding:6px 14px; border-radius:6px; letter-spacing:.05em; text-align:center; }
        .body { padding:20px 28px; }
        .reg-photo-row { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; gap:16px; }
        .reg-section { flex:1; }
        .reg-boxes { display:flex; gap:3px; margin-top:4px; }
        .reg-box { width:26px; height:28px; border:1.5px solid #aaa; border-radius:3px; font-size:11px; display:flex; align-items:center; justify-content:center; font-weight:700; background:#f9f9f9; }
        .photo-box { width:88px; height:106px; border:2px solid #D4A017; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden; background:#f9f9f9; }
        .photo-box img { width:100%; height:100%; object-fit:cover; }
        .photo-label { font-size:9px; color:#999; text-align:center; }
        .field-row { display:flex; align-items:baseline; gap:8px; margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:6px; }
        .field-label { font-size:12px; font-weight:700; white-space:nowrap; flex-shrink:0; color:#111; }
        .field-value { font-size:12.5px; color:#333; flex:1; min-width:0; word-break:break-word; }
        .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:10px; }
        .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px; }
        .section-title { background:linear-gradient(90deg,#D4A017,#F5C842); color:#000; font-weight:900; font-size:12px; text-align:center; padding:5px; letter-spacing:.1em; margin:14px -2px 10px; border-radius:3px; }
        .course-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid #ddd; border-radius:4px; overflow:hidden; margin-bottom:12px; }
        .course-col { padding:8px 10px; }
        .course-col:first-child { border-right:1px solid #ddd; }
        .course-item { display:flex; align-items:center; gap:6px; margin-bottom:5px; font-size:11px; color:#333; }
        .checkbox { width:13px; height:13px; border:1.5px solid #aaa; border-radius:2px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .checkbox.checked { background:#D4A017; border-color:#D4A017; }
        .checkmark { color:#000; font-size:9px; font-weight:900; }
        .fee-table { width:100%; border-collapse:collapse; margin-bottom:12px; border:1.5px solid #ddd; border-radius:4px; overflow:hidden; }
        .fee-table td { padding:8px 12px; font-size:12px; border:1px solid #eee; }
        .fee-table .label { font-weight:700; color:#111; width:50%; }
        .fee-table .value { color:#555; }
        .terms { font-size:10px; color:#555; margin-bottom:14px; }
        .terms p { margin-bottom:3px; }
        .terms span { font-weight:700; color:#D4A017; }
        .sig-row { display:flex; gap:30px; margin-top:18px; }
        .sig-box { flex:1; border-top:1.5px solid #aaa; padding-top:6px; text-align:center; }
        .sig-label { font-size:10px; color:#666; font-weight:600; }
        .campus-section { background:#f8f8f8; border-top:1px solid #eee; padding:12px 28px; }
        .campus-row { display:flex; align-items:flex-start; gap:10px; margin-bottom:6px; }
        .campus-dot { width:18px; height:18px; border-radius:50%; background:linear-gradient(135deg,#D4A017,#F5C842); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:900; color:#000; flex-shrink:0; margin-top:1px; }
        .campus-info { font-size:10px; color:#444; }
        .campus-info strong { font-weight:700; color:#D4A017; font-size:10.5px; }
        .how-grid { display:flex; flex-wrap:wrap; gap:12px; margin-bottom:12px; }
        .how-item { display:flex; align-items:center; gap:6px; font-size:11px; color:#333; }
        @media print {
          body { background:#fff; }
          .page { margin:0; box-shadow:none; border-radius:0; max-width:100%; }
          .no-print { display:none !important; }
          @page { margin:8mm; size:A4; }
        }
      `}</style>

      {/* Screen toolbar */}
      <div className="no-print" style={{ background:'#0a0a0a', padding:'10px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#D4A017,#F5C842)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, color:'#000', fontSize:16 }}>G</div>
          <span style={{ color:'#fff', fontSize:13, fontWeight:600 }}>GCI Admission Form — Print Preview</span>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={() => window.print()}
            style={{ background:'linear-gradient(135deg,#D4A017,#F5C842)', color:'#000', border:'none', padding:'7px 18px', borderRadius:8, fontSize:12, fontWeight:700, cursor:'pointer' }}>
            🖨 Print / Save PDF
          </button>
          <button onClick={() => window.close()}
            style={{ background:'transparent', color:'rgba(255,255,255,.6)', border:'1px solid rgba(255,255,255,.15)', padding:'7px 14px', borderRadius:8, fontSize:12, cursor:'pointer' }}>
            Close
          </button>
        </div>
      </div>

      {/* Printable document */}
      <div className="page">

        {/* Header */}
        <div className="header">
          <div className="logo-text">
            <h1>Global Computer Institute</h1>
            <p>Registered by: Sindh Board of Technical Education</p>
          </div>
          <div className="admit-badge">ADMISSION<br />FORM</div>
        </div>

        <div className="body">

          {/* Reg No + Photo */}
          <div className="reg-photo-row">
            <div className="reg-section">
              <div className="field-label">Reg. No.</div>
              <div className="reg-boxes">
                {(s.regNo || s.cnic || '').padEnd(8, ' ').slice(0, 8).split('').map((ch, i) => (
                  <div key={i} className="reg-box">{ch.trim()}</div>
                ))}
              </div>
            </div>
            <div className="photo-box">
              {photoSrc
                ? <img src={photoSrc} alt={s.fullName} />
                : <span className="photo-label">Photo<br />1 × 1</span>}
            </div>
          </div>

          {/* Core fields */}
          <div className="field-row">
            <div className="field-label">Student Name:</div>
            <div className="field-value">{s.fullName || '—'}</div>
          </div>
          <div className="field-row">
            <div className="field-label">Father&apos;s Name:</div>
            <div className="field-value">{s.fatherName || '—'}</div>
          </div>
          <div className="field-row">
            <div className="field-label">Address:</div>
            <div className="field-value">{s.address || '—'}</div>
          </div>

          {/* Row: Profession · Student Mob · Guardian Mob */}
          <div className="grid-3">
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Profession:</div>
              <div className="field-value">{s.profession || '—'}</div>
            </div>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Student Mob #:</div>
              <div className="field-value">{s.phone || '—'}</div>
            </div>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Guardian Mob #:</div>
              <div className="field-value">{s.guardianPhone || '—'}</div>
            </div>
          </div>

          {/* Row: Qualification · WhatsApp */}
          <div className="grid-2" style={{ marginTop:8 }}>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Qualification:</div>
              <div className="field-value">{s.qualification || '—'}</div>
            </div>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">WhatsApp #:</div>
              <div className="field-value">{s.whatsapp || s.phone || '—'}</div>
            </div>
          </div>

          {/* Row: Course · Timing */}
          <div className="grid-2" style={{ marginTop:8 }}>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Course To Be Join:</div>
              <div className="field-value">{s.courseToJoin || s.course || '—'}</div>
            </div>
            <div className="field-row" style={{ margin:0 }}>
              <div className="field-label">Timing:</div>
              <div className="field-value">{s.timing || '—'}</div>
            </div>
          </div>

          {/* How did you know */}
          <div style={{ marginTop:12, marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:700, marginBottom:6 }}>
              How did you get to know about Global Computer Institute?
            </div>
            <div className="how-grid">
              {['By Advertising', "By Global's Student", 'By Friend', 'Other'].map(opt => {
                const checked = (s.howKnew || '').includes(opt);
                return (
                  <div key={opt} className="how-item">
                    <div className={`checkbox ${checked ? 'checked' : ''}`}>
                      {checked && <span className="checkmark">✓</span>}
                    </div>
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Choose the Course */}
          <div className="section-title">CHOOSE THE COURSE</div>
          <div className="course-grid">
            <div className="course-col">
              {ALL_COURSES_LEFT.map(course => {
                const checked = coursesArr.some(c => c.toLowerCase().includes(course.toLowerCase().slice(0, 10)));
                return (
                  <div key={course} className="course-item">
                    <div className={`checkbox ${checked ? 'checked' : ''}`}>
                      {checked && <span className="checkmark">✓</span>}
                    </div>
                    {course}
                  </div>
                );
              })}
            </div>
            <div className="course-col">
              {ALL_COURSES_RIGHT.map(course => {
                const checked = coursesArr.some(c => c.toLowerCase().includes(course.toLowerCase().slice(0, 10)));
                return (
                  <div key={course} className="course-item">
                    <div className={`checkbox ${checked ? 'checked' : ''}`}>
                      {checked && <span className="checkmark">✓</span>}
                    </div>
                    {course}
                  </div>
                );
              })}
              <div className="course-item">
                <div className="checkbox" />
                Others: <span style={{ color:'#333', marginLeft:4 }}>{coursesArr.filter(c => c.toLowerCase().startsWith('others')).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Fee table */}
          <table className="fee-table">
            <tbody>
              <tr>
                <td className="label">Date of Admission:</td>
                <td className="value">{s.dateOfAdmission || s.submittedAt?.slice(0,10) || submittedDate}</td>
                <td className="label">Admission Fee:</td>
                <td className="value">{s.admissionFee || '—'}</td>
              </tr>
              <tr>
                <td className="label">Monthly Fee:</td>
                <td className="value">{s.monthlyFee || '—'}</td>
                <td className="label">Total Fee:</td>
                <td className="value">{s.totalFee || '—'}</td>
              </tr>
            </tbody>
          </table>

          {/* Terms */}
          <div className="terms">
            <p><span>1.</span> Admission, Monthly &amp; SBTE fee once paid are <strong>non-refundable</strong>.</p>
            <p><span>2.</span> Monthly Fee must be paid on/before 5th of every month, otherwise late fee Rs. 25/- per day will be charged.</p>
            <p><span>3.</span> Examination fee for SBTE should be paid at the time of registration which is not included in course training fee.</p>
          </div>

          {/* Signatures */}
          <div className="sig-row">
            <div className="sig-box">
              <div style={{ height:38 }} />
              <div className="sig-label">Administrator</div>
            </div>
            <div className="sig-box">
              <div style={{ height:38 }} />
              <div className="sig-label">Signature of Applicant</div>
              <div style={{ fontSize:10, color:'#bbb', marginTop:2 }}>{s.fullName}</div>
            </div>
          </div>
        </div>

        {/* Campus info */}
        <div className="campus-section">
          {[
            { num:'1', name:'Campus 1', addr:'Saudabad Malir Indus Mehran Society A-22, Near 1st P.S.O Petrol Pump, Karachi-75080', contact:'0213-4504816, 0333-3580212 | gcisbte11@gmail.com' },
            { num:'2', name:'Campus 2', addr:'Model Colony Near Railway Crossing Rabbani Masjid, Karachi', contact:'0322-2511944, 0318-2511944' },
            { num:'3', name:'Campus 3', addr:'Shahfaisal Colony-2 Behind Fauji Foundation Hospital Big Plots A-7, Karachi', contact:'0317-4740335' },
          ].map(c => (
            <div key={c.num} className="campus-row">
              <div className="campus-dot">{c.num}</div>
              <div className="campus-info">
                <strong>{c.name}</strong> — {c.addr} | Contact: {c.contact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function PrintPage() {
  return (
    <Suspense fallback={
      <div style={{ fontFamily:'Arial', padding:40, textAlign:'center' }}>
        <div style={{ width:36, height:36, border:'3px solid #D4A017', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <PrintPageClient />
    </Suspense>
  );
}
