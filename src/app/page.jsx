import Navbar             from '@/components/layout/Navbar';
import Footer             from '@/components/layout/Footer';
import HeroSection        from '@/components/sections/HeroSection';
import CoursesSection     from '@/components/sections/CoursesSection';
import AboutSection       from '@/components/sections/AboutSection';
import WhyChooseUs        from '@/components/sections/WhyChooseUs';
import StatsSection       from '@/components/sections/StatsSection';
import AdmissionsSection  from '@/components/sections/AdmissionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection         from '@/components/sections/CtaSection';
import PartnersSection    from '@/components/sections/PartnersSection';

/**
 * Homepage section order (optimised for minimum scroll + max impact):
 *   1. Hero          — full-screen, instant impact
 *   2. Courses       — slider, what we offer (primary intent)
 *   3. Stats         — credibility bar
 *   4. About         — who we are
 *   5. WhyChooseUs   — key differentiators
 *   6. Admissions    — how to join (CTA funnel step)
 *   7. Testimonials  — social proof
 *   8. CTA           — final conversion push
 *   9. Partners      — trust logos
 *
 * EventsSection removed from homepage (kept on /events if needed) to reduce scroll.
 */
export default function HomePage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CoursesSection />
      <AboutSection />
      <WhyChooseUs />
      <AdmissionsSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
