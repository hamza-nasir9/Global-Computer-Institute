'use client';
import { useRef, useEffect } from 'react';
import { GraduationCap, Phone, CheckCircle } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const TRUST = ['No Hidden Fees', 'Flexible Batch Timings', 'Installment Plans Available', 'Scholarship Options'];

export default function CtaSection() {
  const sectionRef = useRef(null);
  const glowRef    = useRef(null);
  const ringsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulsing glow
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0.18, scale: 1.05, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
      // Rotating orbital rings
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return;
        gsap.to(ring, { rotation: i % 2 === 0 ? 360 : -360, duration: 22 + i * 6, ease: 'none', repeat: -1 });
      });
      // Content entrance on scroll
      if (sectionRef.current) {
        const els = sectionRef.current.querySelectorAll('[data-cta-el]');
        gsap.fromTo(els, {y: 25 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-28 px-4 sm:px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#1a0d00] to-[#2d1a00]" />
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(212,160,23,0.20) 0%,transparent 65%)', opacity: 0.08 }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `repeating-linear-gradient(0deg,rgba(212,160,23,0.6) 0px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,rgba(212,160,23,0.6) 0px,transparent 1px,transparent 50px)` }} />
      {[80, 160, 240, 320, 400].map((size, i) => (
        <div key={i} ref={el => ringsRef.current[i] = el}
          className="absolute rounded-full border border-[#D4A017]/8 pointer-events-none"
          style={{ width: size, height: size, top: `${12 + i * 10}%`, ...(i % 2 === 0 ? { left: `${4 + i * 6}%` } : { right: `${4 + i * 6}%` }) }} />
      ))}

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div data-cta-el className="inline-flex items-center gap-2 glass-gold px-4 py-2 rounded-full text-[#F5C842] text-xs font-semibold tracking-widest uppercase mb-6 gsap-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] animate-pulse" />Limited Seats Available
        </div>
        <h2 data-cta-el className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 gsap-hidden">
          Your Tech Career Starts<span className="block text-gold-gradient">Right Here, Right Now</span>
        </h2>
        <p data-cta-el className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 gsap-hidden">
          Join thousands of students who chose GCI and transformed their futures. Spring 2025 admissions are now open — don&apos;t miss your opportunity.
        </p>
        <div data-cta-el className="flex flex-col sm:flex-row gap-4 justify-center items-center gsap-hidden">
          <a href="/admissions" className="inline-flex items-center gap-2.5 bg-gold-gradient text-black font-black px-10 py-4 rounded-full text-base transition-transform duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95"
            style={{ boxShadow: '0 20px 50px rgba(212,160,23,0.45)' }}>
            <GraduationCap size={20} />Apply Now — Free Consultation
          </a>
          <a href="tel:+922111524786" className="inline-flex items-center gap-2.5 border-2 border-white/30 text-white hover:border-[#D4A017]/60 hover:text-[#F5C842] font-semibold px-10 py-4 rounded-full text-base transition-all duration-300">
            <Phone size={18} />+92-21-111-524-786
          </a>
        </div>
        <div data-cta-el className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-12 gsap-hidden">
          {TRUST.map(b => (
            <span key={b} className="flex items-center gap-1.5 text-white/45 text-sm">
              <CheckCircle size={13} className="text-[#D4A017]/60" />{b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
