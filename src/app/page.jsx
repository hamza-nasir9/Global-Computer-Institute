import Navbar           from '@/components/layout/Navbar';
import Footer           from '@/components/layout/Footer';
import HeroSection      from '@/components/sections/HeroSection';
import CoursesSection   from '@/components/sections/CoursesSection';
import AboutSection     from '@/components/sections/AboutSection';
import WhyChooseUs      from '@/components/sections/WhyChooseUs';
import StatsSection     from '@/components/sections/StatsSection';
import GallerySection   from '@/components/sections/GallerySection';
import AdmissionsSection from '@/components/sections/AdmissionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import EventsSection    from '@/components/sections/EventsSection';
import CtaSection       from '@/components/sections/CtaSection';
import PartnersSection  from '@/components/sections/PartnersSection';

export default function HomePage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CoursesSection />
      <AboutSection />
      <WhyChooseUs />
      <StatsSection />
      <GallerySection />
      <AdmissionsSection />
      <TestimonialsSection />
      <EventsSection />
      <CtaSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
