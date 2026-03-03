import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileDownload, FaEye, FaAward } from "react-icons/fa";
import PdfModal from "./pdfModal";
import { certificates } from "../data/certificates";

// 1. Konfigurasi Animasi & Warna
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

// 2. Definisi Komponen Anak (Harus di atas atau menggunakan function biasa agar tidak error 'not defined')
function CertificateCard({ title, issuer, year, file, thumbnail }) {
  const [open, setOpen] = useState(false);

  const getCorrectPath = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/certificates/${path}`;
  };

  const safeFileUrl = encodeURI(getCorrectPath(file));

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

          {/* AREA PREVIEW: Hanya satu scrollbar */}
          <div className="h-44 relative bg-white dark:bg-gray-800 overflow-hidden flex items-center justify-center">
            {thumbnail ? (
              thumbnail.toLowerCase().endsWith('.pdf') ? (
                /* PDF PREVIEW DENGAN SATU SCROLLBAR CUSTOM */
                <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-transparent">
                  <iframe
                    src={`${thumbnail}#toolbar=0&navpanes=0&view=FitH`}
                    className="w-full h-[600px] border-none block"
                    style={{ pointerEvents: 'none' }} // Mencegah scrollbar internal iframe aktif
                    title="preview"
                  />
                </div>
              ) : (
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              )
            ) : (
              /* Fallback */
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <FaAward className="text-4xl text-teal-500 mb-3 opacity-60" />
                <div className="text-[10px] font-black text-teal-400/80 uppercase tracking-[0.2em]">{issuer}</div>
              </div>
            )}
          </div>

          {/* Bagian Content */}
          <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-3 bg-teal-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {issuer}
              </p>
            </div>

            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight mb-4 line-clamp-2">
              {title}
            </h3>

            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">{year}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="text-[10px] font-black text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors uppercase"
                >
                  View
                </button>
                <a href={safeFileUrl} download className="text-gray-400 hover:text-teal-500 transition-colors">
                  <FaFileDownload size={16} />
                </a>
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
// 3. Komponen Utama (Exported)
export function CertificateSection() {
  const [filterIssuer, setFilterIssuer] = useState("All");

  const data = Array.isArray(certificates) ? certificates : [];
  const issuers = ["All", ...new Set(data.map(cert => cert.issuer.trim()))];

  const filteredCertificates = filterIssuer === "All"
    ? data
    : data.filter(cert => cert.issuer.trim() === filterIssuer);

  return (
    <section id="certificate" className="relative py-24 bg-white dark:bg-[#030712] overflow-hidden">
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
            Achievements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mt-4 dark:text-white"
          >
            Certifications<span className="text-teal-500">.</span>
          </motion.h2>
        </div>

        {/* Animated Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {issuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setFilterIssuer(issuer)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filterIssuer === issuer
                  ? "text-white"
                  : "text-gray-500 hover:text-teal-500 dark:text-gray-400"
                }`}
            >
              {filterIssuer === issuer && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-teal-600 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {issuer}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((item) => (
              // Sekarang CertificateCard sudah terdefinisi dengan benar di atas
              <CertificateCard key={item.title} {...item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 italic">No certificates found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}