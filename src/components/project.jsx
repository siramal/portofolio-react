import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaEye } from "react-icons/fa"; // icons
import { motion } from "framer-motion";
import PdfModal from "./pdfModal";
import { sectionTransition } from "../animations/variants";
import { projects } from "../data/projects";

function ProjectCard({ title, description, year, file, github, tags = [], live }) {
  const [open, setOpen] = useState(false);
  const isPdf = typeof file === "string" && file.endsWith(".pdf");

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = file;
    link.download = `${title}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardHover = { hover: { y: -8, boxShadow: "0 18px 40px rgba(2,6,23,0.12)" } };

  return (
    <>
      <motion.div variants={cardHover} whileHover="hover" className="h-full relative">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition flex flex-col h-full overflow-hidden relative">
          {/* Media */}
          <div className="h-48 border-b relative group overflow-hidden bg-gray-50 dark:bg-gray-700">
            {isPdf ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800">
                <div className="text-center">
                  <FaDownload className="text-4xl text-teal-600 dark:text-teal-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">PDF Project</p>
                </div>
              </div>
            ) : (
              <img src={file} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            )}

            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setOpen(true)}
                className="bg-white text-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition"
                title="View"
              >
                <FaEye />
              </motion.button>

              {file && (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleDownload}
                  className="bg-white text-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition"
                  title="Download"
                >
                  <FaDownload />
                </motion.button>
              )}

              {live && (
                <motion.a
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition"
                  title="Open live demo"
                >
                  <FaExternalLinkAlt />
                </motion.a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg line-clamp-2 dark:text-white">{title}</h3>
              <span className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full w-fit font-semibold">{year}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{description}</p>

            {/* Tags */}
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((t, i) => (
                  <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center gap-3 pt-4">
              <button onClick={() => setOpen(true)} className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition">
                View
              </button>

              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition text-xl" title="View on GitHub">
                  <FaGithub />
                </a>
              )}

              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="ml-auto text-teal-600 hover:text-teal-800 transition font-medium flex items-center gap-2">
                  Live <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <PdfModal isOpen={open} onClose={() => setOpen(false)} file={file} title={title} />
    </>
  );
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeCard = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

function ProjectSection() {
  return (
    <motion.section
      id="project"
      className="py-24 bg-white dark:bg-black transition-colors duration-300"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full px-6 md:px-16 lg:px-32 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 dark:text-white">
          My Projects
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {projects.map((item, index) => (
            <motion.div key={index} variants={fadeCard}>
              <ProjectCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProjectCard;
export { ProjectSection };
