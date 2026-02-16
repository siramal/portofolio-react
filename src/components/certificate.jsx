import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileDownload, FaEye, FaAward } from "react-icons/fa";
import PdfModal from "./pdfModal";
import { sectionTransition } from "../animations/variants";
import { certificates } from "../data/certificates";

function CertificateCard({ title, issuer, year, file }) {
  const [open, setOpen] = useState(false);
  const isPdf = typeof file === "string" && file.toLowerCase().endsWith(".pdf");

  const cardVariants = {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    // Try to download without navigating away from the SPA.
    // Open in new tab as first attempt; if blocked or not downloadable, fetch blob as fallback.
    const link = document.createElement("a");
    link.href = file;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    try {
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // Fallback: fetch blob and force download
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        })
        .catch(() => {
          // as last resort, navigate in new tab
          window.open(file, "_blank", "noopener noreferrer");
        });
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="h-full relative"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition flex flex-col h-full overflow-hidden relative">

          {/* BADGE */}
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg whitespace-nowrap"
            >
              <FaAward size={12} /> Certificate
            </motion.div>
          </div>

          {/* PREVIEW (TINGGI SAMA) */}
          <div className="h-48 border-b bg-gray-100 dark:bg-gray-700 relative overflow-hidden group">
            {isPdf ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800">
                <div className="text-center">
                  <FaFileDownload className="text-4xl text-teal-600 dark:text-teal-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">PDF Document</p>
                </div>
              </div>
            ) : (
              (file && typeof file === "string") ? (
                <img
                  src={file}
                  alt={title || "Project preview"}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No preview available</div>
              )
            )}

            {/* Overlay dengan action buttons */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(true)}
                className="bg-white text-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition"
                title="View Certificate"
              >
                <FaEye size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="bg-white text-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition"
                title="Download Certificate"
              >
                <FaFileDownload size={16} />
              </motion.button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-semibold text-base line-clamp-2 dark:text-white mb-2">
              {title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {issuer ? String(issuer).charAt(0) : "?"}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{issuer || "Unknown issuer"}</p>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full w-fit mb-3 font-semibold"
            >
              {year}
            </motion.span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="mt-auto bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition font-medium"
            >
              View Certificate
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <PdfModal
        isOpen={open}
        onClose={() => setOpen(false)}
        file={file}
        title={title}
      />
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

function CertificateSection() {
  const [filterIssuer, setFilterIssuer] = useState("All");
  const [certLimit, setCertLimit] = useState(12);

  // Get unique issuers for filter
  const issuers = ["All", ...new Set(certificates.map(cert => cert.issuer))];

  // Filter certificates
  const filteredCertificates = filterIssuer === "All"
    ? certificates
    : certificates.filter(cert => cert.issuer === filterIssuer);

  return (
    <motion.section
      id="certificate"
      className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full px-6 md:px-16 lg:px-32 text-gray-800 dark:text-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 dark:text-white">
            Certificates
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold"
          >
            {filteredCertificates.length} {filteredCertificates.length === 1 ? "Certificate" : "Certificates"}
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {issuers.map((issuer) => (
            <motion.button
              key={issuer}
              onClick={() => setFilterIssuer(issuer)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition ${filterIssuer === issuer
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {issuer}
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          key={filterIssuer}
        >
          {filteredCertificates.slice(0, certLimit).map((item, index) => (
            <motion.div key={index} variants={fadeCard}>
              <CertificateCard {...item} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCertificates.length > certLimit && (
          <div className="text-center mt-8">
            <button
              onClick={() => setCertLimit((c) => c + 12)}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Show more
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400">
              Tidak ada sertifikat untuk filter ini
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default CertificateCard;
export { CertificateSection };
