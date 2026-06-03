'use client';
import Link from 'next/link';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { COURSE_DETAILS } from '@/lib/data';
import { getIcon } from '@/lib/icons';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const BADGE_STYLES = {
  gold:   'bg-[#D4A017]/15 text-[#F5C842] border-[#D4A017]/25',
  blue:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  green:  'bg-green-500/15 text-green-400 border-green-500/25',
  red:    'bg-red-500/15 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  teal:   'bg-teal-500/15 text-teal-400 border-teal-500/25',
  pink:   'bg-pink-500/15 text-pink-400 border-pink-500/25',
};

/* How many cards are visible at each breakpoint */
function getVisible() {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  if (window.innerWidth < 1280) return 3;
  return 4;
}

const GAP = 20; // px — kept in sync with CSS gap-5 (20px)

export default function CoursesSection() {
  const HOME_COURSES = COURSE_DETAILS.slice(0, 8);
  const total        = HOME_COURSES.length;

  const [current,    setCurrent]    = useState(0);
  const [visible,    setVisible]    = useState(4);
  const [isAnimating,setIsAnimating]= useState(false);
  const trackRef  = useRef(null);
  const sectionRef= useRef(null);
  const autoRef   = useRef(null);

  /* — Recalculate visible count on resize — */
  useEffect(() => {
    function onResize() { setVisible(getVisible()); }
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* — Translate the track — */
  const moveTo = useCallback((idx, instant = false) => {
    if (!trackRef.current) return;
    const cardW = (trackRef.current.parentElement.offsetWidth - GAP * (visible - 1)) / visible;
    const x = -idx * (cardW + GAP);
    gsap.to(trackRef.current, {
      x,
      duration: instant ? 0 : 0.55,
      ease: 'power3.out',
    });
  }, [visible]);

  /* — Reposition on resize or visible change — */
  useEffect(() => { moveTo(current, true); }, [visible, moveTo, current]);

  /* — Navigate — */
  const canPrev = current > 0;
  const canNext = current < total - visible;

  const prev = useCallback(() => {
    if (isAnimating || !canPrev) return;
    setIsAnimating(true);
    const next = current - 1;
    setCurrent(next);
    moveTo(next);
    setTimeout(() => setIsAnimating(false), 560);
    resetAutoplay();
  }, [isAnimating, canPrev, current, moveTo]);

  const next = useCallback(() => {
    if (isAnimating || !canNext) return;
    setIsAnimating(true);
    const n = current + 1;
    setCurrent(n);
    moveTo(n);
    setTimeout(() => setIsAnimating(false), 560);
    resetAutoplay();
  }, [isAnimating, canNext, current, moveTo]);

  /* — Autoplay — */
  function resetAutoplay() {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => {
        const n = c < total - visible ? c + 1 : 0;
        moveTo(n);
        return n;
      });
    }, 4000);
  }

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(autoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, total]);

  /* — Touch / swipe — */
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    clearInterval(autoRef.current);
  }
  function onTouchMove(e) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (!trackRef.current) return;
    const cardW = (trackRef.current.parentElement.offsetWidth - GAP * (visible - 1)) / visible;
    const base  = -current * (cardW + GAP);
    gsap.set(trackRef.current, { x: base + touchDeltaX.current * 0.5 });
  }
  function onTouchEnd() {
    const threshold = 50;
    if      (touchDeltaX.current < -threshold && canNext) next();
    else if (touchDeltaX.current >  threshold && canPrev) prev();
    else moveTo(current);
    touchDeltaX.current = 0;
    resetAutoplay();
  }

  /* — Entrance animation — */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  /* — Dot jump — */
  function goTo(idx) {
    if (isAnimating) return;
    const clamped = Math.min(idx, total - visible);
    setIsAnimating(true);
    setCurrent(clamped);
    moveTo(clamped);
    setTimeout(() => setIsAnimating(false), 560);
    resetAutoplay();
  }

  /* — Card width as CSS calc — */
  const cardWidthStyle = {
    width:     `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
    flexShrink: 0,
  };

  return (
    <section ref={sectionRef} id="courses"
      className="py-14 md:py-20 px-4 sm:px-6 md:px-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
          <SectionHeader
            label="Academic Programs"
            title="Courses &"
            highlight="Certifications"
            subtitle="Industry-aligned programs crafted for the future of technology."
            className="mb-0"
          />
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={!canPrev}
                aria-label="Previous"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor:     canPrev ? 'var(--border-gold)' : 'var(--border-subtle)',
                  color:           canPrev ? '#D4A017' : 'var(--text-muted)',
                }}>
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={!canNext}
                aria-label="Next"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: canNext ? 'var(--border-gold)' : 'var(--bg-card)',
                  borderColor:     canNext ? 'transparent'          : 'var(--border-subtle)',
                  color:           canNext ? '#000'                  : 'var(--text-muted)',
                }}>
                <ChevronRight size={16} />
              </button>
            </div>
            <Link href="/courses"
              className="hidden sm:flex items-center gap-1.5 text-[#D4A017] hover:text-[#F5C842] text-sm font-semibold transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Slider viewport */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          {/* Track */}
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP, willChange: 'transform' }}>
            {HOME_COURSES.map((course) => {
              const Icon = getIcon(course.iconName);
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group relative block rounded-2xl p-5 md:p-6 cursor-pointer overflow-hidden border transition-all duration-300 hover:-translate-y-2"
                  style={{ ...cardWidthStyle, backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-gold)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-gradient rounded-full group-hover:w-4/5 transition-all duration-300" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border transition-colors duration-300 group-hover:bg-[#D4A017]/20"
                    style={{ background: 'rgba(212,160,23,0.10)', borderColor: 'rgba(212,160,23,0.20)' }}>
                    <Icon size={20} className="text-[#D4A017] group-hover:text-[#F5C842] transition-colors duration-300" />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1.5 block" style={{ color: '#D4A017' }}>
                    {course.category}
                  </span>
                  <h3 className="font-display font-bold text-sm md:text-base leading-tight mb-2 group-hover:text-[#F5C842] transition-colors duration-300 line-clamp-2"
                    style={{ color: 'var(--text-primary)' }}>
                    {course.name}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={11} />{course.duration}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${BADGE_STYLES[course.badgeColor] || BADGE_STYLES.gold}`}>
                      {course.badge}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dots + progress */}
        <div className="flex items-center justify-between mt-6 md:mt-8">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: total - visible + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-400"
                style={{
                  height: 4,
                  width:  current === i ? 28 : 10,
                  background: current === i
                    ? 'linear-gradient(90deg,#D4A017,#F5C842)'
                    : 'var(--border-medium)',
                  opacity: current === i ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* Counter + View All (mobile) */}
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span style={{ color: '#D4A017', fontWeight: 700 }}>{current + 1}</span>
              {' / '}{total - visible + 1}
            </span>
            <Link href="/courses"
              className="sm:hidden flex items-center gap-1 text-[#D4A017] text-xs font-semibold">
              All Courses <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center mt-8 md:mt-10">
          <Link href="/courses"
            className="inline-flex items-center gap-2 bg-gold-gradient text-black font-bold px-8 md:px-10 py-3 md:py-3.5 rounded-full text-sm transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
            Browse All 50+ Programs <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
