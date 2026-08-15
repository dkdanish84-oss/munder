import HeroSection from "../components/guest/HeroSection";
import WhyChooseSection from "../components/guest/WhyChooseSection";
import ProjectsSection from "../components/guest/ProjectsSection";
import TestimonialsSection from "../components/guest/TestimonialsSection";
import FaqSection from "../components/guest/FaqSection";
import ContactSection from "../components/guest/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
