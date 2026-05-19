'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const FOOTER_LINKS = {
  Programs: ['Web Development','AI & Machine Learning','Graphic Design','Mobile Development','Cybersecurity','Data Science','Cloud Computing','Video Production'],
  Institute: ['About GCI','Faculty','Campuses','Accreditations','Career Services','News & Events','Gallery','Testimonials'],
  Students: ['Admissions','Fee Structure','Scholarships','Student Portal','Library','Internships','Alumni Network','FAQs'],
};
const CAMPUSES_INFO = [
  { name:'Main Campus',  addr:'Block 13-D, Gulshan-e-Iqbal, Karachi 75300' },
  { name:'North Campus', addr:'Block H, North Nazimabad, Karachi 74700' },
  { name:'South Campus', addr:'Saddar Town, M.A. Jinnah Road, Karachi 74400' },
];
const SOCIALS = [
  { Icon: Facebook, href:'#' },{ Icon: Twitter, href:'#' },
  { Icon: Instagram, href:'#' },{ Icon: Linkedin, href:'#' },{ Icon: Youtube, href:'#' },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor:'var(--bg-primary)', borderTop:'1px solid var(--border-gold)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 mb-8 md:mb-14">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center font-display font-black text-black text-lg" style={{ boxShadow:'var(--shadow-gold-sm)' }}>G</div>
              <div>
                <span className="font-display font-bold text-xl" style={{ color:'var(--text-primary)' }}>GCI<span className="text-[#F5C842]"> Institute</span></span>
                <p className="text-[10px] tracking-widest uppercase -mt-0.5" style={{ color:'var(--text-muted)' }}>Global Computer Institute</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color:'var(--text-secondary)' }}>
              Karachi&apos;s premier technology institute, shaping the next generation of digital professionals since 2005. Three campuses, 50+ programs, 15,000+ alumni.
            </p>
            <div className="space-y-3 mb-6">
              {[
                { Icon:MapPin, text:'Main Campus: Plot 42, Block 13-D, Gulshan-e-Iqbal, Karachi' },
                { Icon:Phone,  text:'+92-21-111-GCI-786 (111-424-786)' },
                { Icon:Mail,   text:'admissions@gci.edu.pk' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color:'var(--text-secondary)' }}>
                  <Icon size={15} className="text-[#D4A017] mt-0.5 flex-shrink-0" /><span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  style={{ backgroundColor:'var(--bg-card)', borderColor:'var(--border-medium)', color:'var(--text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#F5C842'; e.currentTarget.style.borderColor='rgba(212,160,23,0.40)'; e.currentTarget.style.backgroundColor='rgba(212,160,23,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.borderColor='var(--border-medium)'; e.currentTarget.style.backgroundColor='var(--bg-card)'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-4 relative pb-3" style={{ color:'var(--text-primary)' }}>
                {heading}
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#D4A017] rounded-full" />
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-sm flex items-center gap-1.5 group transition-colors duration-300"
                      style={{ color:'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color='#F5C842'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--text-secondary)'}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor:'rgba(212,160,23,0.35)' }} />{link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {CAMPUSES_INFO.map(c => (
            <div key={c.name} className="glass rounded-xl p-4 flex items-start gap-3" style={{ borderColor:'var(--border-medium)' }}>
              <MapPin size={16} className="text-[#D4A017] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium" style={{ color:'var(--text-primary)' }}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color:'var(--text-muted)' }}>{c.addr}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop:'1px solid var(--border-subtle)' }}>
          <p className="text-xs" style={{ color:'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Global Computer Institute (GCI). All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy','Terms of Use','Sitemap'].map(l => (
              <Link key={l} href="#" className="text-xs transition-colors duration-300 hover:text-[#D4A017]" style={{ color:'var(--text-muted)' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
