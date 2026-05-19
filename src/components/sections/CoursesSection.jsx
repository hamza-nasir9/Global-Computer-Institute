'use client';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { COURSE_DETAILS } from '@/lib/data';
import { getIcon } from '@/lib/icons';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const BADGE_STYLES = {
  gold:'bg-[#D4A017]/15 text-[#F5C842] border-[#D4A017]/25',
  blue:'bg-blue-500/15 text-blue-400 border-blue-500/25',
  purple:'bg-purple-500/15 text-purple-400 border-purple-500/25',
  green:'bg-green-500/15 text-green-400 border-green-500/25',
  red:'bg-red-500/15 text-red-400 border-red-500/25',
  orange:'bg-orange-500/15 text-orange-400 border-orange-500/25',
  teal:'bg-teal-500/15 text-teal-400 border-teal-500/25',
  pink:'bg-pink-500/15 text-pink-400 border-pink-500/25',
};

export default function CoursesSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('[data-course-card]');
      gsap.fromTo(cards,
        {y: 40 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  const HOME_COURSES = COURSE_DETAILS.slice(0, 8);

  return (
    <section id="courses" className="py-12 md:py-24 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <SectionHeader label="Academic Programs" title="Courses &" highlight="Certifications"
            subtitle="Industry-aligned programs crafted by professionals for the future of technology." className="mb-0" />
          <Link href="/courses" className="flex-shrink-0 flex items-center gap-2 text-[#D4A017] hover:text-[#F5C842] text-sm font-semibold transition-colors">
            View All Programs <ArrowRight size={16} />
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOME_COURSES.map((course) => {
            const Icon = getIcon(course.iconName);
            return (
              <Link key={course.id} href={`/courses/${course.slug}`} data-course-card
                className="group relative block rounded-2xl p-6 cursor-pointer overflow-hidden border transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-subtle)'}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.boxShadow='var(--shadow-card)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-gradient rounded-full group-hover:w-4/5 transition-all duration-400" />
                <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-5 border transition-colors duration-300 group-hover:bg-[#D4A017]/20"
                  style={{ background:'rgba(212,160,23,0.10)', borderColor:'rgba(212,160,23,0.20)' }}>
                  <Icon size={22} className="text-[#D4A017] group-hover:text-[#F5C842] transition-colors duration-300" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2 block" style={{ color:'#D4A017' }}>{course.category}</span>
                <h3 className="font-display font-bold text-base leading-tight mb-2 group-hover:text-[#F5C842] transition-colors duration-300" style={{ color:'var(--text-primary)' }}>{course.name}</h3>
                <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color:'var(--text-secondary)' }}>{course.description}</p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor:'var(--border-subtle)' }}>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color:'var(--text-muted)' }}>
                    <Clock size={12} />{course.duration}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${BADGE_STYLES[course.badgeColor]||BADGE_STYLES.gold}`}>{course.badge}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses" className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-9 py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            style={{ boxShadow:'var(--shadow-gold-sm)' }}>
            Browse All 50+ Programs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
