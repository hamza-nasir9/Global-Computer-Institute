'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { FACULTY } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';
import { gsap } from '@/lib/gsap';

/* Show only teaching staff (not admin) on the homepage */
const TEACHERS = FACULTY.filter(f => f.role !== 'Admin');

export default function FacultySection() {
  const rowRef    = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrance: stagger slide-in */
      if (rowRef.current) {
        gsap.fromTo(
          rowRef.current.children,
          { y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: rowRef.current, start: 'top 85%', once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="faculty" className="py-12 md:py-24 px-4 sm:px-6 md:px-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="GCI Expert Instructors"
          title="Meet Our"
          highlight="Faculty"
          subtitle="Every instructor at GCI brings real-world expertise and a passion for teaching that prepares students for career success."
        />

        {/* Scrollable row */}
        <div ref={scrollRef} className="mt-12 flex gap-5 overflow-x-auto no-scrollbar pb-4">
          <div ref={rowRef} className="flex gap-5">
            {TEACHERS.map((member) => (
              <Link
                key={member.id}
                href={`/faculty/${member.id}`}
                className="group flex-shrink-0 w-[200px] rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 gsap-hidden"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                  e.currentTarget.style.boxShadow   = 'var(--shadow-card)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow   = 'none';
                }}
              >
                {/* Photo header */}
                <div className={`relative h-36 bg-gradient-to-br ${member.bg} overflow-hidden`}>
                  {member.image && (
                    <Image
                      src={member.image} alt={member.name} fill quality={75}
                      className="object-cover object-top opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                      sizes="200px"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Initials badge */}
                  <div className="absolute bottom-3 left-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm text-[#F5C842] border-2"
                      style={{
                        borderColor:       'rgba(212,160,23,0.45)',
                        backgroundColor:   'rgba(0,0,0,0.40)',
                        backdropFilter:    'blur(4px)',
                      }}
                    >
                      {member.initials}
                    </div>
                  </div>
                </div>

                {/* Text body */}
                <div className="p-4">
                  <h4 className="font-display font-bold text-sm mb-0.5 group-hover:text-[#F5C842] transition-colors duration-200 line-clamp-1"
                    style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h4>
                  <p className="text-[#D4A017] text-xs font-medium mb-1 line-clamp-1">{member.role}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{member.exp}</p>

                  {/* View profile chip */}
                  <div className="flex items-center gap-1 text-[10px] font-semibold transition-colors"
                    style={{ color: 'var(--text-muted)' }}>
                    <span className="group-hover:text-[#D4A017] transition-colors">View Profile</span>
                    <ChevronRight size={10} className="group-hover:text-[#D4A017] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-[#D4A017] hover:text-[#F5C842] text-sm font-semibold transition-colors duration-200"
          >
            View All Faculty Members <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
