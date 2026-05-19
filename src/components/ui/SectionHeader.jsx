'use client';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SectionHeader({ label, title, highlight, subtitle, center = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        {y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className} gsap-hidden`}>
      <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color:'#D4A017' }}>
        {label}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color:'var(--text-primary)' }}>
        {title}{' '}
        {highlight && <span className="text-gold-gradient">{highlight}</span>}
      </h2>
      <div className={`section-divider mt-4 mb-5 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''}`} style={{ color:'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
