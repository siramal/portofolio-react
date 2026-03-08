import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import BaseCard from "./baseCard";
import PdfModal from "./pdfModal";
import { certificates } from "../data/certificates";
import { sectionTransition } from "../animations/variants";

// 1. Variasi Animasi untuk Stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda antar kartu 0.1 detik
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function CertificateCard({ title, issuer, year, file, thumbnail }) {
  const [open, setOpen] = useState(false);
  
  const getSafePath = (path) => {
    if (!path) return "";
    return path.startsWith('/') ? path : `/certificates/${path}`;
  };

  const safeFileUrl = encodeURI(getSafePath(file));

  return (
    <>
      <BaseCard 
        title={title}
        subtitle={issuer}
        year={year}
        thumbnail={thumbnail}
        type="certificate"
        onView={() => setOpen(true)}
        actions={
          <motion.a 
            whileHover={{ scale: 1.2, color: "#14b8a6" }}
            href={safeFileUrl} 
            download 
            className="text-gray-400 transition-colors"
          >
            <FaFileDownload size={16} />
          </motion.a>
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

export function CertificateSection() {
  const [filterIssuer, setFilterIssuer] = useState("All");
  // 1. Tambahkan state untuk kontrol "See More"
  const [showAll, setShowAll] = useState(false);

  const data = Array.isArray(certificates) ? certificates : [];
  const issuers = ["All", ...new Set(data.map(cert => cert.issuer.trim()))];
  
  const filteredCertificates = filterIssuer === "All"
    ? data
    : data.filter(cert => cert.issuer.trim() === filterIssuer);

  // 2. Tentukan batas item (3 baris x 4 kolom = 12 item)
  // Anda bisa menyesuaikan angka ini (misal: 6 untuk layar mobile agar pas 3 baris)
  const itemsLimit = 12;
  const displayedCertificates = showAll 
    ? filteredCertificates 
    : filteredCertificates.slice(0, itemsLimit);

  return (
    <motion.section 
      id="certificate" 
      className="relative py-32 bg-[#fafafa] dark:bg-[#030712] overflow-hidden"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black dark:text-white uppercase tracking-tight"
          >
            Certifications<span className="text-teal-500">.</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-teal-500 mx-auto mt-4 rounded-full" 
          />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {issuers.map((issuer) => (
            <motion.button
              key={issuer}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFilterIssuer(issuer);
                setShowAll(false); // Reset ke limit saat ganti filter
              }}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filterIssuer === issuer 
                ? "text-white bg-teal-600 shadow-lg shadow-teal-500/20" 
                : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {issuer}
            </motion.button>
          ))}
        </div>

        {/* Grid Area - Menggunakan displayedCertificates */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedCertificates.map((item) => (
              <motion.div 
                layout 
                key={item.title}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <CertificateCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3. Tombol See More / Show Less */}
        {filteredCertificates.length > itemsLimit && (
          <div className="mt-20 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-teal-600 dark:hover:bg-teal-500 hover:text-white dark:hover:text-white transition-all duration-300"
            >
              {showAll ? "Show Less" : `See More (${filteredCertificates.length - itemsLimit}+)`}
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}s