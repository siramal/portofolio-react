import useWibTime from "../hooks/useWibTime";
import useDarkMode from "../hooks/useDarkMode";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Navbar() {
  const time = useWibTime();
  const [dark, setDark] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about"); 

  // Track active section on scroll
  useEffect(() => {
    const sections = ["about", "project", "certificate", "contact"];
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.querySelector(`#${section}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const menuItemHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 transition-colors duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 md:px-16 lg:px-32 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.button 
          onClick={() => handleScroll("#about")}
          className="font-bold text-lg md:text-xl text-teal-600 dark:text-teal-400 hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          SK
        </motion.button>

        {/* Desktop Menu */}
        <motion.ul 
          className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {["About", "Skills", "Experience", "Project", "Certificate", "Contact"].map((item, i) => {
            const idMap = {
              About: "#about",
              Skills: "#skills",
              Experience: "#experience",
              Project: "#project",
              Certificate: "#certificate",
              Contact: "#contact",
            };
            const sectionKey = item.toLowerCase().replace("certificate", "certificate");
            const isActive = activeSection === sectionKey;
            
            return (
              <motion.li key={i} custom={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <motion.button 
                  onClick={() => handleScroll(idMap[item])} 
                  className={`relative px-3 py-2 rounded-md transition ${
                    isActive 
                      ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30" 
                      : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 40 }}
                    />
                  )}
                </motion.button>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Right Side */}
        <motion.div 
          className="flex items-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >

          {/* Dark Toggle */}
          <motion.button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-lg"
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.9 }}
          >
            {dark ? "☀️" : "🌙"}
          </motion.button>

          {/* Time (hidden on small screens) */}
          <motion.span
            className="hidden sm:inline text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {time} WIB
          </motion.span>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"} />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700"
      >
        <ul className="px-6 py-4 space-y-2 text-sm font-medium">
          {["About", "Skills", "Experience", "Project", "Certificate", "Contact"].map((item, i) => {
            const idMap = {
              About: "#about",
              Skills: "#skills",
              Experience: "#experience",
              Project: "#project",
              Certificate: "#certificate",
              Contact: "#contact",
            };
            const sectionKey = item.toLowerCase().replace("certificate", "certificate");
            const isActive = activeSection === sectionKey;
            
            return (
              <motion.li key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <motion.button
                  onClick={() => handleScroll(idMap[item])}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
