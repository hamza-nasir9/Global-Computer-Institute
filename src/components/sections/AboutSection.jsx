'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { CheckCircle, ArrowRight, Target, FlaskConical, Globe, Heart, Award, GraduationCap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ABOUT_IMAGE } from '@/lib/data';

const PILLARS = [
  { icon:Target,       title:'Mission-Driven',  desc:'Bridging the digital skills gap in Pakistan' },
  { icon:FlaskConical, title:'Research-Backed',  desc:'Curriculum updated with latest industry trends' },
  { icon:Globe,        title:'Global Standards', desc:'Internationally affiliated certifications' },
  { icon:Heart,        title:'Student-First',    desc:'Personalized learning journeys for every student' },
];
const ACHIEVEMENTS = [
  'ISO 9001:2015 Certified Institute','Microsoft Authorized Learning Center',
  'Google Digital Garage Partner','AWS Educate Institution Member',
  'Adobe Education Partner','Best IT Institute Award — Karachi 2023',
];

export default function AboutSection() {
  const imgRef  = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, {x:-50 },
        { opacity:1, x:0, duration:0.75, ease:'power3.out',
          scrollTrigger:{ trigger:imgRef.current, start:'top 85%', once:true } });
      gsap.fromTo(textRef.current, {x:50 },
        { opacity:1, x:0, duration:0.75, ease:'power3.out',
          scrollTrigger:{ trigger:textRef.current, start:'top 85%', once:true } });
      const staggerEls = textRef.current.querySelectorAll('[data-stagger]');
      gsap.fromTo(staggerEls, {x:20 },
        { opacity:1, x:0, stagger:0.07, duration:0.45, ease:'power2.out',
          scrollTrigger:{ trigger:textRef.current, start:'top 80%', once:true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={imgRef} className="relative gsap-hidden">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="relative w-full h-[500px]">
                <Image src={ABOUT_IMAGE} alt="GCI students in classroom" fill quality={85} className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-white/55 text-xs tracking-widest uppercase">Est. 2005</p>
                <p className="text-[#F5C842] font-display font-bold text-xl mt-0.5">20 Years of Excellence</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-6 glass-gold rounded-2xl p-5 min-w-[190px]" style={{ boxShadow:'var(--shadow-gold)' }}>
              <div className="font-display text-3xl font-black text-[#F5C842]">15,000+</div>
              <div className="text-sm font-medium mt-1" style={{ color:'var(--text-primary)' }}>Graduates Worldwide</div>
              <div className="flex gap-1.5 mt-3">
                {[GraduationCap, Award, Globe].map((Icon, i) => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background:'rgba(212,160,23,0.20)', border:'1px solid rgba(212,160,23,0.35)' }}>
                    <Icon size={13} className="text-[#F5C842]" />
                  </div>
                ))}
                <span className="text-[#D4A017] text-xs ml-1 self-center font-semibold">+more</span>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[#D4A017]" />
                <p className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>Ranked #1</p>
              </div>
              <p className="text-xs mt-0.5" style={{ color:'var(--text-secondary)' }}>Computer Institute in Karachi</p>
            </div>
          </div>

          <div ref={textRef} className="gsap-hidden">
            <SectionHeader label="About The Institute" title="Two Decades of" highlight="Transforming Lives" className="mb-6" />
            <p className="text-base leading-relaxed mb-4" style={{ color:'var(--text-secondary)' }}>
              Founded in 2005, Global Computer Institute (GCI) was born from a singular vision: to make world-class technology education accessible to every aspiring student in Karachi and across Pakistan.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color:'var(--text-muted)' }}>
              From a single campus with 200 students, we have grown into a premier institution with 3 state-of-the-art campuses, 50+ programs, and a powerful alumni network of over 15,000 graduates worldwide.
            </p>
            <div className="grid grid-cols-1 gap-2.5 mb-8">
              {ACHIEVEMENTS.map((item, i) => (
                <div key={i} data-stagger className="flex items-center gap-3 gsap-hidden">
                  <CheckCircle size={15} className="text-[#D4A017] flex-shrink-0" />
                  <span className="text-sm" style={{ color:'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {PILLARS.map((p, i) => (
                <div key={i} data-stagger className="flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 hover:border-[#D4A017]/28 group"
                  style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)'}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4A017]/20 transition-colors duration-300"
                    style={{ background:'rgba(212,160,23,0.10)', border:'1px solid rgba(212,160,23,0.18)' }}>
                    <p.icon size={15} className="text-[#D4A017]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color:'var(--text-primary)' }}>{p.title}</h4>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color:'var(--text-muted)' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/about" className="inline-flex items-center gap-2 text-[#F5C842] font-semibold text-sm hover:gap-3 transition-all duration-300">
              Discover Our Full Story <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
