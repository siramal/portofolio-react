import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import BaseCard from "./baseCard";
import PdfModal from "./pdfModal";
import { projects } from "../data/projects";
import { sectionTransition } from "../animations/variants";

// 1. Tambahkan Container Variants untuk efek Stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda antar item 0.1 detik
      delayChildren: 0.2,
    },
  },
};

// 2. Tambahkan Item Variants untuk transisi masuk per kartu
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function ProjectCard({ title , year, file, github, live }) {
  const [open, setOpen] = useState(false);
  
  const getSafePath = (path) => {
    if (!path) return "";
    return path.startsWith('/') ? path : `/projects/${path}`;
  };

  const safeFileUrl = encodeURI(getSafePath(file));

  return (
    <>
      <BaseCard 
        title={title}
        subtitle={year} 
         
        thumbnail={file} 
        type="project"
        onView={() => setOpen(true)}
        actions={
          <div className="flex gap-3">
            {github && (
              <motion.a 
                whileHover={{ scale: 1.2, color: "#14b8a6" }}
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 transition-colors"
              >
                <FaGithub size={18} />
              </motion.a>
            )}
            {live && (
              <motion.a 
                whileHover={{ scale: 1.2, color: "#14b8a6" }}
                href={live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 transition-colors"
              >
                <FaExternalLinkAlt size={16} />
              </motion.a>
            )}
          </div>
        }
      />
      <AnimatePresence>
        {open && (
          <PdfModal 
            isOpen={open} 
            onClose={() => setOpen(false)} 
            file={safeFileUrl} 
            title={title} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function ProjectSection() {
  return (
    <motion.section 
      id="project" 
      className="relative py-24 bg-white dark:bg-[#030712] overflow-hidden"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black dark:text-white uppercase tracking-tight"
          >
            My Projects<span className="text-teal-500">.</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-teal-500 mx-auto mt-4 rounded-full" 
          />
        </div>

        {/* Menerapkan containerVariants pada grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {projects.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants} // Item muncul bergantian
              layout
            >
              <ProjectCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}