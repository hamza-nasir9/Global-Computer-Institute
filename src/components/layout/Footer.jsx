'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const FOOTER_LINKS = {
  Programs: ['Web Development','AI & Machine Learning','Graphic Design','Mobile Development','Cybersecurity','Data Science','Cloud Computing','Video Production'],
  Institute: ['About GCI','Faculty','Campuses','Accreditations','Career Services','News & Events','Gallery','Testimonials'],
  Students: ['Admissions','Fee Structure','Scholarships','Student Portal','Library','Internships','Alumni Network','FAQs'],
};

// Updated Campus Addresses
const CAMPUSES_INFO = [
  { name: 'Saudabad Campus', addr: 'Plot# A-22 Indus Mehran Society, Near 1st P.S.O Petrol Pump, Saudabad Malir, Karachi-75080', phone: '0333-3580212, 0313-2246517' },
  { name: 'Model Colony Campus', addr: 'Near Railway Crossing, Rabbani Masjid, Model Colony, Karachi', phone: '0322-2511944, 0318-2511944' },
  { name: 'Shahfaisal Campus', addr: 'Near Fauji Foundation Hospital, Plot# 3/147, Shahfaisal Colony-3, Karachi-75230', phone: '0317-4740335, 0347-2763587' },
];

const SOCIALS = [
  { Icon: Facebook, href: '#' }, { Icon: Twitter, href: '#' },
  { Icon: Instagram, href: '#' }, { Icon: Linkedin, href: '#' }, { Icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-gold)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pt-12 md:pt-16 pb-6 md:pb-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 mb-8 md:mb-14">
          
          {/* Logo & Info Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 md:mb-5">
              <img
                src="/images/logo-light.png"
                alt="Global Computer Institute"
                className="h-10 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Karachi's premier technology institute, shaping the next generation of digital professionals since 2005. Three campuses, 50+ programs, 15,000+ alumni.
            </p>
            
            {/* Contact Info with Icons - No Emojis */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-start gap-2 text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin size={14} className="text-[#D4A017] mt-0.5 flex-shrink-0" />
                <span>Plot# A-22 Indus Mehran Society, Near 1st P.S.O Petrol Pump, Saudabad Malir, Karachi-75080</span>
              </div>
              <div className="flex items-start gap-2 text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Phone size={14} className="text-[#D4A017] mt-0.5 flex-shrink-0" />
                <span>0333-3580212, 0313-2246517</span>
              </div>
              <div className="flex items-start gap-2 text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={14} className="text-[#D4A017] mt-0.5 flex-shrink-0" />
                <span>gcisbte11@gmail.com</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5C842'; e.currentTarget.style.borderColor = 'rgba(212,160,23,0.40)'; e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.backgroundColor = 'var(--bg-card)'; }}>
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-3 md:mb-4 relative pb-2 md:pb-3" style={{ color: 'var(--text-primary)' }}>
                {heading}
                <span className="absolute bottom-0 left-0 w-6 md:w-8 h-0.5 bg-[#D4A017] rounded-full" />
              </h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-xs md:text-sm flex items-center gap-1.5 group transition-colors duration-300"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F5C842'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(212,160,23,0.35)' }} />{link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Campus Cards - Icons only, no emojis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
          {CAMPUSES_INFO.map(c => (
            <div key={c.name} className="glass rounded-xl p-3 md:p-4 flex flex-col gap-2" style={{ borderColor: 'var(--border-medium)' }}>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A017] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                  <p className="text-[10px] md:text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.addr}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone size={10} className="text-[#D4A017]" />
                    <p className="text-[9px] md:text-[10px] text-[#D4A017]">{c.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Global Computer Institute (GCI). All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-5">
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <Link key={l} href="#" className="text-[10px] md:text-xs transition-colors duration-300 hover:text-[#D4A017]" style={{ color: 'var(--text-muted)' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}