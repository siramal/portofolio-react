import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaEye, FaCode } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PdfModal from "./pdfModal";
import { projects } from "../data/projects";

// Variasi Animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

function ProjectCard({ title, description, year, file, github, tags = [], live }) {
  const [open, setOpen] = useState(false);

  const getCorrectPath = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/projects/${path}`;
  };

  const safeFileUrl = encodeURI(getCorrectPath(file));
  const isPdf = typeof file === "string" && file.toLowerCase().endsWith(".pdf");

  return (
    <div className="relative h-full">
      <motion.div
        variants={cardVariants}
        layout
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ y: -10, zIndex: 50, transition: { duration: 0.3 } }}
        className="relative h-full group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
        
        <div className="relative h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          
          {/* AREA PREVIEW: DIPERBAIKI UNTUK SATU SCROLLBAR */}
          <div className="h-44 relative bg-white dark:bg-gray-800 overflow-hidden flex items-center justify-center">
            {file ? (
              isPdf ? (
                /* PDF PREVIEW DENGAN SINGLE SCROLLBAR - Menghilangkan Scroll Ganda */
                <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-transparent">
                  <iframe 
                    src={`${safeFileUrl}#toolbar=0&navpanes=0&view=FitH`} 
                    className="w-full h-[600px] border-none block pointer-events-none" 
                    title="preview"
                  />
                </div>
              ) : (
                <img 
                  src={file} 
                  alt={title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              )
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <FaCode className="text-4xl text-teal-500 mb-3 opacity-60" />
                <div className="text-[10px] font-black text-teal-400/80 uppercase tracking-[0.2em]">Project Archive</div>
              </div>
            )}
            
            <div className="absolute inset-0 z-10 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Content Area */}
          <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-3 bg-teal-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {year}
              </p>
            </div>
            
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 leading-tight mb-2 line-clamp-2">
              {title}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] rounded-md border border-gray-200 dark:border-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors">
                    <FaGithub size={18} />
                  </a>
                )}
                {live && (
                  <a href={live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors">
                    <FaExternalLinkAlt size={16} />
                  </a>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setOpen(true)}
                  className="text-[10px] font-black text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors uppercase tracking-tighter"
                >
                  View
                </button>
                {file && (
                  <button onClick={(e) => { e.stopPropagation(); window.open(safeFileUrl); }} className="text-gray-400 hover:text-teal-500 transition-colors">
                    <FaDownload size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
    </div>
  );
}

export function ProjectSection() {
  return (
    <section id="project" className="relative py-24 bg-white dark:bg-[#030712] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-teal-500 font-bold tracking-[0.3em] uppercase text-xs"
          >
            Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mt-4 dark:text-white"
          >
            My Projects<span className="text-teal-500">.</span>
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {projects.map((item, index) => (
            <ProjectCard key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}