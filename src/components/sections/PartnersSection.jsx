'use client';
import { PARTNERS } from '@/lib/data';
const ALL = [...PARTNERS, ...PARTNERS];

export default function PartnersSection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[0.20em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
          Trusted Partners &amp; Affiliations
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg,var(--bg-primary),transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg,var(--bg-primary),transparent)' }} />
          <div className="flex gap-4 w-max" style={{ animation: 'scroll-x 25s linear infinite' }}>
            {ALL.map((partner, i) => (
              <div key={i} className="flex-shrink-0 h-14 px-7 rounded-xl flex items-center justify-center text-sm font-semibold border cursor-pointer whitespace-nowrap min-w-[150px] transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-gold)'; e.currentTarget.style.color = '#F5C842'; e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'var(--bg-card)'; }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          GCI is an authorized learning partner of Microsoft, Google, AWS, Adobe and more.
        </p>
      </div>
    </section>
  );
}
