'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import DashLayout from '@/components/dashboard/DashLayout';
import { useAuth } from '@/context/AuthContext';
import { getAllStudents } from '@/lib/studentStore';
import Link from 'next/link';
import {
  GraduationCap, UserCircle, FileText, CheckCircle, Clock,
  XCircle, Mail, Phone, ArrowRight, Calendar, BookOpen,
} from 'lucide-react';

const STATUS_COLOR = { Pending: '#FB923C', Approved: '#4ADE80', Rejected: '#F87171' };
const STATUS_ICON  = { Pending: Clock, Approved: CheckCircle, Rejected: XCircle };

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl p-4 md:p-5 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={15} style={{ color }} />
        </div>
        <span className="font-display font-black text-xl md:text-2xl" style={{ color }}>{value}</span>
      </div>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
}

export default function StudentDashboardClient() {
  const { user }     = useAuth();
  const searchParams = useSearchParams();
  const tab          = searchParams.get('tab') || 'overview';

  const [allStudents, setAllStudents] = useState([]);

  // Load admissions — localStorage always, API also if user has email
  const load = useCallback(async () => {
    const local = getAllStudents();

    if (!user?.id) {
      // Not logged in or no ID — show localStorage only
      setAllStudents(local);
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-user-id':   String(user.id),
        'x-user-role': String(user.role || 'student'),
      };
      if (user?.email) headers['x-user-email'] = user.email;

      const res = await fetch('/api/admission/my', { headers });

      if (res.ok) {
        const data = await res.json();
        const apiRecords = (data.admissions || []).map(a => ({
          ...a,
          id:          String(a._id || a.id),
          submittedAt: a.submittedAt || a.createdAt || new Date().toISOString(),
        }));

        // Merge API records with localStorage — prefer API data (more up-to-date)
        const localIds   = new Set(apiRecords.map(r => r.id));
        const localOnly  = local.filter(r => !localIds.has(String(r.id)));
        setAllStudents([...apiRecords, ...localOnly]);
        return;
      }
    } catch {
      // Network error — fall through to localStorage
    }

    setAllStudents(local);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const myAdmissions = useMemo(() =>
    allStudents.filter(s =>
      s.email?.toLowerCase() === user?.email?.toLowerCase() ||
      s.userEmail?.toLowerCase() === user?.email?.toLowerCase()
    ),
    [allStudents, user]
  );

  const latest = myAdmissions[myAdmissions.length - 1];

  return (
    <DashLayout activeTab={tab === 'overview' ? null : tab}>

      {/* ── OVERVIEW ── */}
      {tab === 'overview' && (
        <div className="space-y-5 md:space-y-6 max-w-4xl w-full">
          {/* Welcome */}
          <div className="rounded-2xl p-4 md:p-6 border"
            style={{ background: 'linear-gradient(135deg,var(--bg-card),var(--bg-card-hover))', borderColor: 'var(--border-gold)' }}>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold-gradient flex items-center justify-center font-display font-black text-black text-lg md:text-xl flex-shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="font-display font-bold text-xl md:text-2xl mb-1 truncate" style={{ color: 'var(--text-primary)' }}>
                  Welcome, {user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {latest
                    ? `Your admission for "${latest.course}" is ${latest.status}.`
                    : "You haven't submitted an admission form yet."}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard icon={FileText}    label="Submitted"  value={myAdmissions.length}                                    color="#D4A017" />
            <StatCard icon={Clock}       label="Pending"    value={myAdmissions.filter(s => s.status === 'Pending').length}    color="#FB923C" />
            <StatCard icon={CheckCircle} label="Approved"   value={myAdmissions.filter(s => s.status === 'Approved').length}   color="#4ADE80" />
            <StatCard icon={XCircle}     label="Rejected"   value={myAdmissions.filter(s => s.status === 'Rejected').length}   color="#F87171" />
          </div>

          {/* Latest */}
          {latest ? (
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <h2 className="font-display font-bold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>Latest Application</h2>
                <Link href="/dashboard/student?tab=admission"
                  className="text-xs text-[#D4A017] hover:text-[#F5C842] flex items-center gap-1 transition-colors">
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <div className="p-4 md:p-5 flex items-start gap-3 md:gap-4">
                <div className="w-12 h-16 md:w-16 md:h-20 rounded-xl overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--border-gold)' }}>
                  {latest.image
                    ? <img src={latest.image} alt={latest.fullName} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: 'var(--bg-input)', color: '#D4A017' }}>{latest.fullName?.[0]}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-base md:text-lg truncate" style={{ color: 'var(--text-primary)' }}>{latest.fullName}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0"
                      style={{ background: `${STATUS_COLOR[latest.status]}18`, color: STATUS_COLOR[latest.status], borderColor: `${STATUS_COLOR[latest.status]}40` }}>
                      {latest.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#D4A017]">{latest.course}</p>
                  <p className="text-xs mt-1 md:mt-2 truncate" style={{ color: 'var(--text-muted)' }}>
                    {new Date(latest.submittedAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })} · ID: GCI-{latest.id?.slice(-8)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border p-8 md:p-10 text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', borderStyle: 'dashed' }}>
              <GraduationCap size={36} className="mx-auto mb-3 text-[#D4A017]/40" />
              <h3 className="font-display font-bold text-base md:text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No application yet</h3>
              <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>Submit your admission form to get started.</p>
              <Link href="/admission-form"
                className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-full text-sm"
                style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
                <GraduationCap size={14} />Apply Now
              </Link>
            </div>
          )}

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: FileText,   label: 'Submit Admission', href: '/admission-form',               color: '#D4A017' },
              { icon: BookOpen,   label: 'Browse Courses',   href: '/courses',                      color: '#60A5FA' },
              { icon: UserCircle, label: 'My Profile',       href: '/dashboard/student?tab=profile', color: '#A78BFA' },
            ].map(({ icon: Icon, label, href, color }) => (
              <Link key={label} href={href}
                className="flex items-center gap-3 p-3 md:p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 group"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <span className="text-sm font-medium group-hover:text-[#F5C842] transition-colors truncate" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#D4A017] flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── PROFILE ── */}
      {tab === 'profile' && (
        <div className="max-w-2xl w-full space-y-4 md:space-y-5">
          <h1 className="font-display font-bold text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>My Profile</h1>
          <div className="rounded-2xl border p-4 md:p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-gold)' }}>
            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold-gradient flex items-center justify-center font-display font-black text-xl md:text-2xl text-black flex-shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-lg md:text-xl mb-1 truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(212,160,23,0.15)', color: '#F5C842', border: '1px solid rgba(212,160,23,0.30)' }}>
                  {user?.role === 'admin' ? 'Administrator' : 'Student'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: UserCircle, label: 'Full Name',    value: user?.name },
                { icon: Mail,       label: 'Email',        value: user?.email },
                { icon: Phone,      label: 'Phone',        value: user?.phone || 'Not set' },
                { icon: Calendar,   label: 'Member Since', value: user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })
                    : 'N/A' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-subtle)' }}>
                  <Icon size={14} className="text-[#D4A017] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-4 md:p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="font-display font-bold text-sm md:text-base mb-3" style={{ color: 'var(--text-primary)' }}>Application Summary</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total',    value: myAdmissions.length,                                    color: '#D4A017' },
                { label: 'Approved', value: myAdmissions.filter(s => s.status === 'Approved').length, color: '#4ADE80' },
                { label: 'Pending',  value: myAdmissions.filter(s => s.status === 'Pending').length,  color: '#FB923C' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-input)' }}>
                  <div className="font-display font-black text-xl md:text-2xl" style={{ color }}>{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MY ADMISSIONS ── */}
      {tab === 'admission' && (
        <div className="max-w-3xl w-full space-y-4 md:space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="font-display font-bold text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>My Admissions</h1>
            <Link href="/admission-form"
              className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm flex-shrink-0"
              style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
              <GraduationCap size={13} />New Application
            </Link>
          </div>

          {myAdmissions.length === 0 ? (
            <div className="rounded-2xl border p-8 md:p-10 text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', borderStyle: 'dashed' }}>
              <FileText size={36} className="mx-auto mb-3 text-[#D4A017]/40" />
              <h3 className="font-display font-bold text-base md:text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No applications found</h3>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>You haven&apos;t submitted any admission forms yet.</p>
              <Link href="/admission-form"
                className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-full text-sm"
                style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
                Submit Application
              </Link>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {myAdmissions.slice().reverse().map(s => {
                const SIcon = STATUS_ICON[s.status] || Clock;
                const sc    = STATUS_COLOR[s.status] || '#FB923C';
                return (
                  <div key={s.id} className="rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>
                    <div className="flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3 border-b"
                      style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-input)' }}>
                      <p className="text-xs font-mono truncate" style={{ color: 'var(--text-muted)' }}>GCI-{s.id?.slice(-8)}</p>
                      <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0"
                        style={{ background: `${sc}18`, color: sc, borderColor: `${sc}40` }}>
                        <SIcon size={10} />{s.status}
                      </span>
                    </div>
                    <div className="p-4 md:p-5 flex items-start gap-3 md:gap-4">
                      <div className="w-11 h-14 md:w-14 md:h-16 rounded-xl overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--border-gold)' }}>
                        {s.image
                          ? <img src={s.image} alt={s.fullName} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center font-bold text-lg"
                            style={{ backgroundColor: 'var(--bg-input)', color: '#D4A017' }}>{s.fullName?.[0]}</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base truncate" style={{ color: 'var(--text-primary)' }}>{s.fullName}</h3>
                        <p className="text-sm text-[#D4A017] mt-0.5 truncate">{s.course}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                          {[{ Icon: Phone, v: s.phone }, { Icon: Mail, v: s.email }].filter(x => x.v).map(({ Icon, v }) => (
                            <p key={v} className="flex items-center gap-1 text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                              <Icon size={10} className="text-[#D4A017]/60 flex-shrink-0" />{v}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                          {new Date(s.submittedAt).toLocaleDateString('en-PK', { dateStyle: 'long' })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </DashLayout>
  );
}
