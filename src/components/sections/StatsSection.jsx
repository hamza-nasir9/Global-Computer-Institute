'use client';
import { useCounter } from '@/hooks/useCounter';
import { getIcon } from '@/lib/icons';
import { STATS } from '@/lib/data';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

function StatItem({ value, suffix, label, iconName, index }) {
  const { count, ref } = useCounter(value, 2200);
  const Icon = getIcon(iconName);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, { y: -5, duration: 4 + index * 0.5, ease:'sine.inOut', yoyo:true, repeat:-1 });
  }, [index]);

  return (
    <div ref={ref} className="group text-center px-4 sm:px-6 py-6 sm:py-8 relative">
      {index < 5 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#D4A017]/15" />}
      
      <div ref={iconRef} className="flex justify-center mb-2 sm:mb-3">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#D4A017]/12 border border-[#D4A017]/20 flex items-center justify-center group-hover:bg-[#D4A017]/20 transition-colors duration-300">
          <Icon size={18} className="text-[#D4A017]" />
        </div>
      </div>
      
      {/* Responsive Font Size - Critical Fix */}
      <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#F5C842] leading-none mb-1 sm:mb-2">
        {count.toLocaleString()}<span className="text-[#D4A017]">{suffix}</span>
      </div>
      
      {/* Label - Responsive */}
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.12em] font-medium max-w-[80px] sm:max-w-none mx-auto" style={{ color:'var(--text-muted)' }}>
        {label}
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-[#D4A017]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden" style={{ borderTop:'1px solid var(--stat-divider)', borderBottom:'1px solid var(--stat-divider)' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0a0a0a] to-[#1a0d00]" />
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center, rgba(212,160,23,0.09) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:`repeating-linear-gradient(0deg,rgba(212,160,23,0.5) 0px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(212,160,23,0.5) 0px,transparent 1px,transparent 60px)` }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-3 sm:py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x-0 lg:divide-x divide-[#D4A017]/10">
          {STATS.map((stat, i) => <StatItem key={i} {...stat} index={i} />)}
        </div>
      </div>
    </section>
  );
}