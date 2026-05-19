'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { CAMPUSES } from '@/lib/data';

export default function CampusesSection() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.children, {y:50 },
        { opacity:1, y:0, stagger:0.15, duration:0.65, ease:'power3.out',
          scrollTrigger:{ trigger:gridRef.current, start:'top 85%', once:true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="campuses" className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Our Locations" title="Three Campuses," highlight="One Vision"
          subtitle="Strategically located across Karachi, each campus delivers the same world-class facilities and educational excellence." center />
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {CAMPUSES.map((campus) => (
            <div key={campus.id} className="group rounded-3xl overflow-hidden border cursor-pointer transition-all duration-400 hover:-translate-y-3"
              style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)'}}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.boxShadow='var(--shadow-card-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <div className="relative overflow-hidden h-56">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.07]">
                  <Image src={campus.image} alt={campus.name} fill quality={80} className="object-cover object-center" sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute top-4 left-4 glass-gold px-3 py-1.5 rounded-full text-[#F5C842] text-xs font-bold tracking-wider uppercase">{campus.established}</div>
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5"><Users size={11} />{campus.students}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-[#F5C842] transition-colors duration-300" style={{ color:'var(--text-primary)' }}>{campus.name}</h3>
                <div className="flex items-center gap-1.5 text-[#D4A017] text-sm mb-4"><MapPin size={14} className="flex-shrink-0" /><span>{campus.area}</span></div>
                <p className="text-sm leading-relaxed mb-5" style={{ color:'var(--text-secondary)' }}>{campus.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {campus.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium border" style={{ background:'rgba(212,160,23,0.08)', color:'#D4A017', borderColor:'rgba(212,160,23,0.20)' }}>{tag}</span>
                  ))}
                </div>
                <Link href="/campuses" className="flex items-center gap-2 text-[#F5C842] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Visit Campus <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/campuses" className="inline-flex items-center gap-2 text-sm transition-all duration-300 border px-6 py-3 rounded-full hover:text-[#F5C842] hover:border-[#D4A017]/40"
            style={{ color:'var(--text-secondary)', borderColor:'var(--border-medium)' }}>
            <MapPin size={15} />View All Campuses
          </Link>
        </div>
      </div>
    </section>
  );
}
