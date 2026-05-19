'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { HERO_IMAGES } from '@/lib/data';

const SLIDES = [
  { id:0, badge:'Admissions Open — Spring 2025', title:'Shape Your Future', highlight:'With Digital Excellence',
    description:"Karachi's premier computer institute — empowering the next generation of tech leaders with world-class education, industry partnerships, and 3 state-of-the-art campuses.",
    primaryBtn:{ label:'Apply Now', href:'/admissions', Icon:GraduationCap }, secondaryBtn:{ label:'Explore Courses', href:'/courses', Icon:BookOpen } },
  { id:1, badge:'Ranked #1 Computer Institute in Karachi', title:'Master In-Demand', highlight:'Tech Skills Today',
    description:"From AI and Machine Learning to Web Development and Graphic Design — our industry-aligned programs ensure you graduate job-ready with real-world expertise.",
    primaryBtn:{ label:'View Programs', href:'/courses', Icon:BookOpen }, secondaryBtn:{ label:'Meet Faculty', href:'/faculty', Icon:GraduationCap } },
  { id:2, badge:'3 Premium Campuses Across Karachi', title:'Join 15,000+', highlight:'Successful Alumni',
    description:"Our graduates work at Google, Microsoft, leading Pakistani tech firms, and run successful startups. Your transformation starts at GCI.",
    primaryBtn:{ label:'Our Campuses', href:'/campuses', Icon:MapPin }, secondaryBtn:{ label:'Our Story', href:'/about', Icon:ArrowRight } },
];
const HERO_STATS = [
  { value:'15,000+', label:'Alumni Placed' },
  { value:'50+',     label:'Programs' },
  { value:'98%',     label:'Placement Rate' },
  { value:'3',       label:'Campuses' },
];

export default function HeroSection() {
  const [current, setCurrent]   = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const contentRef = useRef(null);
  const imgRefs    = useRef([]);
  const statsRef   = useRef(null);
  const glowRef    = useRef(null);

  const animateContent = useCallback((idx) => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('[data-slide-el]');
    gsap.fromTo(els,
      {y: 35 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out' }
    );
  }, []);

  const animateImageIn = useCallback((idx) => {
    const el = imgRefs.current[idx];
    if (!el) return;
    gsap.fromTo(el, {scale: 1.07 }, { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' });
  }, []);

  // Initial load
  useEffect(() => {
    animateImageIn(0);
    animateContent(0);
    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll('[data-stat]');
      gsap.fromTo(items, {y:20 }, { opacity:1, y:0, stagger:0.1, duration:0.55, ease:'power3.out', delay:1 });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity:0.14, duration:3, ease:'sine.inOut', yoyo:true, repeat:-1 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback((idx) => {
    if (idx === current) return;
    const oldImg = imgRefs.current[current];
    if (oldImg) gsap.to(oldImg, {duration:0.6, ease:'power2.out' });
    setCurrent(idx);
    setTimeout(() => { animateImageIn(idx); animateContent(idx); }, 50);
  }, [current, animateImageIn, animateContent]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [autoPlay, next]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#0a0a0a]">

      {/* Background images — all mounted, GSAP controls opacity */}
      {SLIDES.map((slide, i) => (
        <div key={slide.id} ref={el => imgRefs.current[i] = el}
          className="absolute inset-0 gsap-hidden">
          <Image src={HERO_IMAGES[i]} alt={slide.title} fill priority={i === 0} quality={85}
            className="object-cover object-center" sizes="100vw" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 z-10" />

      <div ref={glowRef} className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full z-10 pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 65%)', opacity:0.06 }} />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
          <div ref={contentRef} className="max-w-3xl">
            {SLIDES.map((slide, i) => i === current ? (
              <div key={slide.id}>
                <div data-slide-el className="inline-flex items-center gap-2 glass-gold px-4 py-2 rounded-full text-[#F5C842] text-xs font-semibold tracking-wider uppercase mb-6 gsap-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] animate-pulse" />{slide.badge}
                </div>
                <h1 data-slide-el className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white mb-2 gsap-hidden">
                  {slide.title}
                </h1>
                <h1 data-slide-el className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-gold-gradient mb-5 gsap-hidden">
                  {slide.highlight}
                </h1>
                <p data-slide-el className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl mb-8 gsap-hidden">
                  {slide.description}
                </p>
                <div data-slide-el className="flex flex-wrap gap-3 gsap-hidden">
                  <a href={slide.primaryBtn.href} className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-8 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95" style={{ boxShadow:'var(--shadow-gold)' }}>
                    <slide.primaryBtn.Icon size={16} />{slide.primaryBtn.label}
                  </a>
                  <a href={slide.secondaryBtn.href} className="inline-flex items-center gap-2 border-2 border-white/35 text-white hover:border-[#F5C842] hover:text-[#F5C842] font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300">
                    <slide.secondaryBtn.Icon size={15} />{slide.secondaryBtn.label}
                  </a>
                </div>
              </div>
            ) : null)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-32 right-6 md:right-16 z-20 flex items-center gap-2">
        {[{ fn:()=>{prev();setAutoPlay(false);}, Icon:ChevronLeft }, { fn:()=>{next();setAutoPlay(false);}, Icon:ChevronRight }].map(({fn,Icon},i) => (
          <button key={i} onClick={fn}
            className="w-10 h-10 rounded-full glass border border-white/15 text-white hover:border-[#D4A017]/50 hover:text-[#F5C842] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90">
            <Icon size={18} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => { goTo(i); setAutoPlay(false); }}
            className={`h-0.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-[#D4A017]' : 'w-7 bg-white/30'}`} />
        ))}
      </div>

      <div className="hidden md:flex absolute bottom-6 right-16 z-20 items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
        <span className="w-10 h-px bg-white/30" />Scroll to Explore
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="absolute bottom-0 left-0 right-0 z-20 bg-black/65 backdrop-blur-xl border-t border-[#D4A017]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <div key={i} data-stat className={`px-8 py-4 text-center ${i < 3 ? 'border-r border-[#D4A017]/10' : ''} ${i === 1 ? 'border-b border-[#D4A017]/10 md:border-b-0' : ''} gsap-hidden`}>
              <div className="font-display text-2xl font-bold text-[#F5C842]">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
