import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Maximize, Minimize, Copy, Check, Printer, RotateCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function PdfModal({ isOpen, onClose, file, title }) {
  const modalRef = useRef(null);
  const iframeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isOpen && !isFullscreen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, isFullscreen, onClose]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch(() => {
        console.log("Fullscreen request failed");
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + file);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePrint = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.print();
      } catch (e) {
        console.log("Print failed, opening download instead");
        const link = document.createElement("a");
        link.href = file;
        link.download = `${title}.pdf`;
        link.click();
      }
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `${file}#toolbar=0`;
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 25,
              },
            }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Press ESC to close • {file.split("/").pop()}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                {/* COPY LINK */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Copy link"
                >
                  {copySuccess ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <Copy size={20} className="text-gray-700 dark:text-gray-300" />
                  )}
                </motion.button>

                {/* PRINT */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handlePrint}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Print document"
                >
                  <Printer size={20} className="text-gray-700 dark:text-gray-300" />
                </motion.button>

                {/* REFRESH */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleRefresh}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Refresh document"
                >
                  <RotateCw size={20} className="text-gray-700 dark:text-gray-300" />
                </motion.button>

                {/* FULLSCREEN */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Toggle fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize size={20} className="text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Maximize size={20} className="text-gray-700 dark:text-gray-300" />
                  )}
                </motion.button>

                {/* DOWNLOAD */}
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={file}
                  download={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium"
                  title="Download file"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </motion.a>

                {/* CLOSE */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Close (ESC)"
                >
                  <X size={22} className="text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            </motion.div>

            {/* PDF VIEWER */}
            <div className="flex-1 relative bg-gray-100 dark:bg-gray-800">
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
                  </motion.div>
                </motion.div>
              )}
              <iframe
                ref={iframeRef}
                src={`${file}#toolbar=0`}
                title={title}
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>

            {/* SUCCESS NOTIFICATION */}
            <AnimatePresence>
              {copySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg text-sm"
                >
                  ✓ Link copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PdfModal;
