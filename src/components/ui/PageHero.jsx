'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function PageHero({ title, highlight, subtitle, image, badge, height = 'h-[480px] md:h-[540px]' }) {
  const contentRef = useRef(null);
  const glowRef    = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('[data-hero]');
    gsap.fromTo(els,
      {y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.page-hero-line', { width: 0 }, { width: 80, duration: 0.7, ease: 'power3.out', delay: 0.7 });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0.16, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }
  }, []);

  return (
    <section className={`relative ${height} flex items-center overflow-hidden`}>
      <Image src={image} alt={title} fill priority quality={85} className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div ref={glowRef} className="absolute bottom-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{ background:'radial-gradient(ellipse, rgba(212,160,23,0.20) 0%, transparent 65%)', opacity:0.08 }} />
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 w-full">
        {badge && (
          <div data-hero className="inline-flex items-center gap-2 glass-gold px-4 py-2 rounded-full text-[#F5C842] text-xs font-semibold tracking-wider uppercase mb-5 gsap-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] animate-pulse" />{badge}
          </div>
        )}
        <h1 data-hero className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 gsap-hidden">
          {title}
          {highlight && <span className="block text-gold-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p data-hero className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl gsap-hidden">
            {subtitle}
          </p>
        )}
        <div className="page-hero-line h-1 bg-gold-gradient rounded-full mt-7" style={{ width:0 }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}
