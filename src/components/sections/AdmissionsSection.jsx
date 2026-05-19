'use client';
import { useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { ADMISSION_STEPS } from '@/lib/data';
import { getIcon } from '@/lib/icons';
import { gsap, ScrollTrigger } from '@/lib/gsap';

function StepCard({ step, iconName, title, description, align = 'left' }) {
  const Icon = getIcon(iconName);
  return (
    <div className="group rounded-2xl p-5 md:p-6 border w-full transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)', textAlign:align === 'right' ? 'right' : 'left' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.boxShadow='var(--shadow-card)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.boxShadow='none'; }}>
      <div className={`flex mb-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:'rgba(212,160,23,0.12)', border:'1px solid rgba(212,160,23,0.20)' }}>
          <Icon size={18} className="text-[#D4A017]" />
        </div>
      </div>
      <h3 className="font-semibold text-sm md:text-base mb-2 group-hover:text-[#F5C842] transition-colors" style={{ color:'var(--text-primary)' }}>{title}</h3>
      <p className="text-xs md:text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{description}</p>
    </div>
  );
}

export default function AdmissionsSection() {
  const timelineRef = useRef(null);
  
  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      ADMISSION_STEPS.forEach((_, i) => {
        const step = timelineRef.current.querySelectorAll('[data-step]')[i];
        if (!step) return;
        const isLeft = i % 2 === 0;
        gsap.fromTo(step, {x: isLeft ? -50 : 50 },
          { opacity:1, x:0, duration:0.65, ease:'power3.out',
            scrollTrigger:{ trigger:step, start:'top 88%', once:true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="admissions" className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Enrollment Process" title="How To" highlight="Join GCI"
          subtitle="Getting started is simple. Follow these five easy steps and begin your transformation today." center />

        {/* Desktop & Tablet (768px and up) - Alternating timeline */}
        <div ref={timelineRef} className="hidden md:block relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background:'linear-gradient(to bottom,transparent,rgba(212,160,23,0.35),transparent)' }} />
          {ADMISSION_STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={step.step} data-step className="grid grid-cols-[1fr_60px_1fr] mb-12 items-center gsap-hidden">
                <div className={isLeft ? 'pr-6 md:pr-8 flex justify-end' : ''}>
                  {isLeft && <StepCard {...step} align="right" />}
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black text-xs md:text-sm mx-auto z-10" style={{ boxShadow:'var(--shadow-gold-sm)' }}>
                  {step.step}
                </div>
                <div className={!isLeft ? 'pl-6 md:pl-8' : ''}>
                  {!isLeft && <StepCard {...step} align="left" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile (below 768px) - Vertical list with left line */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background:'linear-gradient(to bottom,transparent,rgba(212,160,23,0.35),transparent)' }} />
          {ADMISSION_STEPS.map((step, i) => {
            const Icon = getIcon(step.iconName);
            return (
              <div key={step.step} className="relative mb-6 last:mb-0">
                <div className="absolute -left-7 top-4 w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black text-[10px] z-10" style={{ boxShadow:'var(--shadow-gold-sm)' }}>{step.step}</div>
                <div className="group rounded-2xl p-4 border transition-all duration-300 ml-2"
                  style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border-subtle)'}>
                  <Icon size={18} className="text-[#D4A017] mb-2" />
                  <h3 className="font-semibold text-sm mb-1.5 group-hover:text-[#F5C842] transition-colors" style={{ color:'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:'var(--text-secondary)' }}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-14">
          <p className="text-xs md:text-sm mb-4 md:mb-5" style={{ color:'var(--text-muted)' }}>Ready to take the first step? Applications are reviewed within 24 hours.</p>
          <a href="/admissions" className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95" style={{ boxShadow:'var(--shadow-gold)' }}>
            <GraduationCap size={16} />Start Your Application
          </a>
        </div>
      </div>
    </section>
  );
}