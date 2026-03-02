import { motion } from "framer-motion";
import { pageTransition } from "../animations/pageTransition";
import AboutSection from "../components/about";
import SkillsSection from "../components/skills";
import ExperienceSection from "../components/experience";
import ContactSection from "../components/contact";
import { ProjectSection } from "../components/project";
import { CertificateSection } from "../components/certificate";
import HeroSection from "../components/hero";

function Home() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* HERO */}
      <HeroSection />
      {/* ABOUT */}
      <AboutSection />

      {/* SKILLS */}
      <SkillsSection />

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* PROJECT */}
      <ProjectSection />

      {/* CERTIFICATE */}
      <CertificateSection />

      {/* CONTACT */}
      <ContactSection />
    </motion.main>
  );
}

export default Home;
