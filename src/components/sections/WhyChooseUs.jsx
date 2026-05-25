'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { WHY_FEATURES } from '@/lib/data';
import { getIcon } from '@/lib/icons';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function WhyChooseUs() {
  const gridRef = useRef(null);
  const ctaRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          {y:50, opacity:0},
          { opacity:1, y:0, stagger:0.1, duration:0.65, ease:'power3.out',
            scrollTrigger:{ trigger:gridRef.current, start:'top 85%', once:true } }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, {y:30, opacity:0},
          { opacity:1, y:0, duration:0.6, ease:'power3.out',
            scrollTrigger:{ trigger:ctaRef.current, start:'top 90%', once:true } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <SectionHeader label="Why GCI" title="Why Students Choose" highlight="Us Over Others"
          subtitle="We don't just teach technology — we shape careers, build confidence, and create the next generation of Pakistan's tech leaders." center />

        {/* Features Grid - Responsive Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {WHY_FEATURES.map((feature, i) => {
            const Icon = getIcon(feature.iconName);
            return (
              <div key={i} className="group relative rounded-2xl p-6 md:p-8 text-center overflow-hidden border cursor-default transition-all duration-400 hover:-translate-y-2.5"
                style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)'}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.boxShadow='var(--shadow-card)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4A017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gold-gradient rounded-full group-hover:w-4/5 transition-all duration-400" />
                
                {/* Icon - Responsive Size */}
                <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full border-2 flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-300 group-hover:border-[#D4A017]/50 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background:'linear-gradient(135deg,rgba(212,160,23,0.15),rgba(212,160,23,0.04))', borderColor:'rgba(212,160,23,0.20)' }}>
                  <Icon size={22} className="text-[#D4A017] group-hover:text-[#F5C842] transition-colors duration-300" />
                </div>
                
                <h3 className="font-display font-bold text-base md:text-lg mb-2 md:mb-3 transition-colors duration-300 group-hover:text-[#F5C842]" style={{ color:'var(--text-primary)' }}>{feature.title}</h3>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Using Next.js Link for client-side navigation */}
        <div ref={ctaRef} className="mt-10 md:mt-14 rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6"
          style={{ background:'linear-gradient(135deg,var(--bg-card),var(--bg-card-hover))', borderColor:'var(--border-gold)'}}>
          
          {/* Text Section - Responsive */}
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-xl md:text-2xl mb-1" style={{ color:'var(--text-primary)' }}>Ready to start your tech journey?</h3>
            <p className="text-xs md:text-sm" style={{ color:'var(--text-secondary)' }}>Admissions are open. Limited seats available for Spring 2025 batch.</p>
          </div>
          
          {/* Buttons Section - Using Link instead of a tag */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link href="/admission-form" 
              className="bg-gold-gradient text-black font-bold px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-center w-full sm:w-auto" 
              style={{ boxShadow:'var(--shadow-gold-sm)' }}>
              Apply Now
            </Link>
            <Link href="/contact" 
              className="inline-flex items-center justify-center gap-2 border font-semibold px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm transition-all duration-300 hover:border-[#D4A017]/50 w-full sm:w-auto"
              style={{ borderColor:'var(--border-medium)', color:'var(--text-primary)' }}>
              <Phone size={14} />Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}