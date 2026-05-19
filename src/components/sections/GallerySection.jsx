'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { ZoomIn } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { GALLERY_ITEMS } from '@/lib/data';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function GallerySection() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.querySelectorAll('[data-gallery-item]'),
        {scale:0.93 },
        { opacity:1, scale:1, stagger:0.08, duration:0.55, ease:'power3.out',
          scrollTrigger:{ trigger:gridRef.current, start:'top 85%', once:true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Campus Life" title="Student Life &" highlight="Gallery"
          subtitle="A glimpse into the vibrant, innovative, and inspiring world of GCI campus life." center />
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3">
          {GALLERY_ITEMS.map(item => (
            <div key={item.id} data-gallery-item className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span} gsap-hidden`}>
              <div className="relative w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.07]">
                <Image src={item.image} alt={item.label} fill quality={75} className="object-cover object-center" sizes="(max-width:768px) 50vw,25vw" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-[#D4A017]/12 transition-all duration-400" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full glass border border-white/25 flex items-center justify-center text-white backdrop-blur-sm">
                  <ZoomIn size={17} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-medium drop-shadow">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-sm transition-all duration-300 border px-6 py-3 rounded-full hover:text-[#F5C842] hover:border-[#D4A017]/40"
            style={{ color:'var(--text-secondary)', borderColor:'var(--border-medium)' }}>View Full Gallery</a>
        </div>
      </div>
    </section>
  );
}
