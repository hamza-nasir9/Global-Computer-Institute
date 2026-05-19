'use client';
import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseCard from '@/components/ui/CourseCard';
import { COURSE_DETAILS } from '@/lib/data';

const CATEGORIES = ['All','Development','Creative Design','Data Analytics','IT Fundamentals','Office Skills','Marketing','Accounting','Language','Kids Programs'];
const HERO_IMAGE = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85';

export default function CoursesPageClient() {
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => COURSE_DETAILS.filter(c => {
    const matchCat = activeCat === 'All' || c.category === activeCat;
    const q = query.toLowerCase();
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  }), [activeCat, query]);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor:'var(--bg-primary)' }}>
        <PageHero image={HERO_IMAGE} badge="50+ Industry-Aligned Programs" title="Find Your Perfect" highlight="Course at GCI"
          subtitle="From beginner to expert — every program is designed by industry professionals to make you job-ready from day one." />

        {/* Filter bar */}
        <section className="py-4 md:py-6 px-4 md:px-16 sticky top-16 z-30"
          style={{ backgroundColor:'var(--bg-primary)', borderBottom:'1px solid var(--border-subtle)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-72 flex-shrink-0">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input type="text" placeholder="Search courses..." value={query} onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm focus:outline-none"
                style={{ backgroundColor:'var(--bg-card)', border:'1px solid var(--border-medium)', color:'var(--text-primary)' }}
                onFocus={e => e.currentTarget.style.borderColor='rgba(212,160,23,0.5)'}
                onBlur={e => e.currentTarget.style.borderColor='var(--border-medium)'} />
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2 max-w-full">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCat(cat)}
                  className="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={activeCat===cat
                    ? { background:'linear-gradient(135deg,#D4A017,#F5C842)', color:'#000', borderColor:'transparent' }
                    : { backgroundColor:'var(--bg-card)', color:'var(--text-secondary)', borderColor:'var(--border-medium)' }}>
                  {cat}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs flex-shrink-0" style={{ color:'var(--text-muted)' }}>{filtered.length} course{filtered.length!==1?'s':''}</span>
          </div>
        </section>

        <section className="py-8 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filtered.map((course, i) => <CourseCard key={course.slug} course={course} index={i} />)}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="font-display text-xl mb-2" style={{ color:'var(--text-primary)' }}>No courses found</p>
                <p className="text-sm mb-5" style={{ color:'var(--text-muted)' }}>Try a different term or category.</p>
                <button onClick={() => { setActiveCat('All'); setQuery(''); }} className="text-[#D4A017] text-sm font-semibold hover:text-[#F5C842] transition-colors">Clear filters</button>
              </div>
            )}
          </div>
        </section>

        <section className="py-8 md:py-16 px-4 sm:px-6 md:px-16" style={{ backgroundColor:'var(--bg-section)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{value:'50+',label:'Programs Offered'},{value:'98%',label:'Placement Rate'},{value:'200+',label:'Hiring Partners'},{value:'20+',label:'Years Experience'}].map((s,i)=>(
                <div key={i} className="text-center py-6 px-4 rounded-2xl border" style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-gold)' }}>
                  <div className="font-display text-3xl font-black text-[#F5C842]">{s.value}</div>
                  <div className="text-xs mt-1.5 uppercase tracking-wider" style={{ color:'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-16 text-center" style={{ backgroundColor:'var(--bg-primary)' }}>
          <SectionHeader label="Get Started" title="Not Sure Which" highlight="Course to Pick?"
            subtitle="Talk to our academic counselors — free consultation, no obligation." center />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+922111424786" className="inline-flex items-center gap-2 bg-gold-gradient text-black font-black px-9 py-4 rounded-full text-sm transition-transform duration-200 hover:scale-105" style={{ boxShadow:'var(--shadow-gold)' }}>
              Free Counseling Call
            </a>
            <a href="/admissions" className="inline-flex items-center gap-2 border-2 font-semibold px-9 py-4 rounded-full text-sm transition-colors"
              style={{ borderColor:'var(--border-gold)', color:'var(--text-primary)' }}>Apply Now</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
