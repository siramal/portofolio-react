import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import foto from "../assets/fotome.png";
import CV from "../assets/CV Sirojul Kamal (3).pdf";

function HeroSection() {
  const roles = ["Frontend Developer", "Backend Developer", "Full-stack Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const rotate = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3200);
    const cursor = setInterval(() => setShowCursor(s => !s), 500);
    return () => { clearInterval(rotate); clearInterval(cursor); };
  }, []);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-600 to-teal-400 dark:from-gray-900 dark:to-black transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
    >
      <div className="w-full px-6 md:px-16 lg:px-32 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Visual */}
          <motion.div
            className="flex justify-center md:justify-start"
            variants={{ hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } } }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-white/10 blur-3xl rounded-full -z-10"></div>
              <motion.img
                src={foto}
                alt="Foto Profil"
                className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-white shadow-2xl"
                whileHover={{ scale: 1.03 }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="text-center md:text-left"
            variants={{ hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, delay: 0.06 } } }}
          >
            <motion.h1 className="text-4xl md:text-5xl font-bold" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              Sirojul Kamal
            </motion.h1>

            <motion.p className="mt-3 text-lg md:text-xl text-white/90" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              Frontend & Backend Developer
            </motion.p>

            {/* CTAs */}
            <motion.div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 justify-center md:justify-start">
              <a href="#project" className="inline-flex items-center justify-center px-5 py-3 bg-white text-teal-700 rounded-lg font-semibold shadow hover:bg-white/90 transition">
                See Projects
              </a>

              <a href={CV} download className="inline-flex items-center justify-center px-5 py-3 bg-white/20 text-white border border-white/20 rounded-lg hover:bg-white/10 transition">
                Download CV
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div className="mt-6 flex items-center gap-4 justify-center md:justify-start text-white/90">
              <a href="https://github.com/siramal" target="_blank" rel="noreferrer" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/sirojulkamal/" target="_blank" rel="noreferrer" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                <FaLinkedin />
              </a>
              <a href="#project" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                <FaCode />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Scroll down chevron */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/90 hover:bg-white/20 transition animate-bounce" aria-label="Scroll to about">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.section>
  );
}

export default HeroSection;
