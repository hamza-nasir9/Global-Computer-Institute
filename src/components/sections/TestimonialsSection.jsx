'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/data';
import { gsap } from '@/lib/gsap';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef(null);

  const animateIn = useCallback((dir = 1) => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, {x: dir > 0 ? 80 : -80, opacity: 0}, { opacity:1, x:0, duration:0.55, ease:'power3.out' });
  }, []);

  const next = useCallback(() => { setCurrent(p => (p+1)%TESTIMONIALS.length); animateIn(1); }, [animateIn]);
  const prev = useCallback(() => { setCurrent(p => (p-1+TESTIMONIALS.length)%TESTIMONIALS.length); animateIn(-1); }, [animateIn]);

  useEffect(() => { animateIn(1); }, []);
  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16 relative overflow-hidden" style={{ backgroundColor:'var(--bg-primary)' }}>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center, rgba(212,160,23,0.05) 0%, transparent 65%)' }} />
      
      <div className="relative max-w-4xl mx-auto">
        
        {/* Heading - Responsive */}
        <SectionHeader label="Student Success" title="What Our" highlight="Graduates Say"
          subtitle="Real stories from real students who transformed their lives at GCI." center />
        
        {/* Card Container */}
        <div className="relative min-h-[320px] sm:min-h-[300px] flex items-center">
          <div ref={cardRef} className="absolute inset-0 rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 border overflow-y-auto"
            style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)' }}>
            
            {/* Quote Icon - Responsive */}
            <div className="absolute top-3 left-4 sm:top-4 sm:left-5 md:top-5 md:left-6 pointer-events-none select-none" style={{ color:'rgba(212,160,23,0.10)' }}>
              <Quote size={48} strokeWidth={1} />
            </div>
            
            {/* Stars */}
            <div className="flex gap-1 mb-3 sm:mb-4 md:mb-5 relative z-10">
              {Array.from({length:t.stars}).map((_,i) => <Star key={i} size={14} className="fill-[#D4A017] text-[#D4A017]" />)}
            </div>
            
            {/* Testimonial Text - Responsive */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed italic mb-5 sm:mb-6 md:mb-7 relative z-10 line-clamp-6 sm:line-clamp-none" style={{ color:'var(--text-secondary)' }}>
              &ldquo;{t.text}&rdquo;
            </p>
            
            {/* User Info - Responsive Flex Wrap */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 relative z-10">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-display font-bold text-[#F5C842] text-xs md:text-sm flex-shrink-0"
                  style={{ background:'linear-gradient(135deg,rgba(212,160,23,0.28),rgba(212,160,23,0.08))', borderColor:'rgba(212,160,23,0.30)' }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base" style={{ color:'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-[#D4A017] text-xs">{t.role}</p>
                </div>
              </div>
              
              {/* Batch Badge */}
              <div className="sm:ml-auto">
                <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium inline-block" style={{ background:'var(--glass-gold-bg)', border:'1px solid var(--glass-gold-border)', color:'#F5C842' }}>
                  {t.batch}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination Buttons - Responsive */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button onClick={prev} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background:'var(--glass-bg)', borderColor:'var(--border-medium)', color:'var(--text-secondary)' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,160,23,0.45)';e.currentTarget.style.color='#F5C842';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-medium)';e.currentTarget.style.color='var(--text-secondary)';}}>
            <ChevronLeft size={16} />
          </button>
          
          {/* Dots - Responsive */}
          <div className="flex gap-1.5 sm:gap-2">
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={()=>{setCurrent(i);animateIn(i>current?1:-1);}}
                className="rounded-full transition-all duration-400"
                style={{ width:i===current?24:6, height:6, backgroundColor:i===current?'#D4A017':'var(--border-medium)' }} />
            ))}
          </div>
          
          <button onClick={next} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background:'var(--glass-bg)', borderColor:'var(--border-medium)', color:'var(--text-secondary)' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,160,23,0.45)';e.currentTarget.style.color='#F5C842';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-medium)';e.currentTarget.style.color='var(--text-secondary)';}}>
            <ChevronRight size={16} />
          </button>
        </div>
        
      </div>
    </section>
  );
}