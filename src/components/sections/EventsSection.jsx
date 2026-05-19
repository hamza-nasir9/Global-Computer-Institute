'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { EVENTS } from '@/lib/data';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function EventsSection() {
  const gridRef = useRef(null);
  const ctaRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          {y: 40 },
          { opacity: 1, y: 0, stagger: 0.13, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true } }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, {y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <SectionHeader label="Latest Updates" title="Events &" highlight="News"
            subtitle="Stay in the loop with GCI's latest events, workshops, and announcements." className="mb-0" />
          <a href="#" className="flex-shrink-0 flex items-center gap-2 text-[#D4A017] hover:text-[#F5C842] text-sm font-semibold transition-colors">
            View All Events <ArrowRight size={16} />
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div key={event.id} className="group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-400 hover:-translate-y-2"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)'}}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-gold)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="relative h-44 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.06]">
                  <Image src={event.image} alt={event.title} fill quality={75} className="object-cover object-center" sizes="(max-width:768px) 100vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="absolute top-4 right-4 bg-gold-gradient text-black rounded-xl px-3 py-2 text-center" style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
                  <div className="font-display font-black text-xl leading-none">{event.date}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider">{event.month}</div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[#F5C842] text-xs font-bold uppercase tracking-wider"
                  style={{ background: 'var(--glass-gold-bg)', border: '1px solid var(--glass-gold-border)', backdropFilter: 'blur(12px)' }}>
                  {event.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-sm leading-snug mb-3 group-hover:text-[#F5C842] transition-colors duration-300 line-clamp-2" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Clock size={12} className="text-[#D4A017]/70 flex-shrink-0" /><span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <MapPin size={12} className="text-[#D4A017]/70 flex-shrink-0" /><span>{event.venue}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 flex items-center justify-between border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Free Registration</span>
                  <a href="#" className="flex items-center gap-1 text-[#D4A017] hover:text-[#F5C842] text-xs font-semibold transition-colors">
                    Register <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-12 rounded-2xl border p-7 flex flex-col md:flex-row items-center justify-between gap-5"
          style={{ background: 'linear-gradient(135deg,var(--bg-card),var(--bg-card-hover))', borderColor: 'var(--border-gold)'}}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Send size={16} className="text-[#D4A017]" />
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Never miss an event</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Subscribe for updates on new events, courses, and announcements.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 md:w-64 rounded-full px-5 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.45)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
            />
            <button className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-full text-sm whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95" style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
