import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Maximize, Minimize, Copy, Check, Printer, RotateCw, ExternalLink, AlertCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function PdfModal({ isOpen, onClose, file, title }) {
  const modalRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Tutup modal dengan ESC
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isOpen && !isFullscreen) onClose();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, isFullscreen, onClose]);

  // Reset state saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadError(false);
    }
  }, [file, isOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch(() => console.error("FS Failed"));
    } else {
      document.exitFullscreen();
    }
  };

  const getPdfUrl = () => {
    if (!file) return "";
    // Jika mobile dan sudah dideploy, Google Viewer adalah pilihan terbaik
    const isLocal = window.location.hostname === "localhost" || window.location.hostname.startsWith("192.168");
    const absoluteUrl = file.startsWith("http") ? file : `${window.location.origin}${file}`;
    
    if (isMobile && !isLocal) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
    }
    return `${file}#toolbar=0&navpanes=0&view=FitH`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center px-0 py-0 md:px-4 md:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 w-full max-w-5xl h-full md:h-[90vh] md:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-base truncate dark:text-white uppercase tracking-tight">{title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* VIEWER CONTENT */}
            <div className="flex-1 relative bg-gray-100 dark:bg-black flex flex-col">
              {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
                  <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs text-gray-500 font-medium">Memuat Dokumen...</p>
                </div>
              )}

              {/* MENGGUNAKAN OBJECT TAG UNTUK KOMPATIBILITAS LEBIH TINGGI */}
              <object
                data={getPdfUrl()}
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setLoadError(true);
                  setIsLoading(false);
                }}
              >
                {/* FALLBACK JIKA OBJECT GAGAL (BIASANYA DI HP) */}
                <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                  <AlertCircle size={48} className="text-gray-400 mb-4" />
                  <h4 className="text-lg font-bold dark:text-white mb-2">Preview Tidak Tersedia</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
                    Browser Anda tidak mendukung preview PDF langsung. Silakan unduh atau buka di tab baru.
                  </p>
                  <div className="flex flex-col w-full gap-3">
                    <a 
                      href={file} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                    >
                      <ExternalLink size={18} /> Buka di Tab Baru
                    </a>
                  </div>
                </div>
              </object>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
              <div className="hidden md:block">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Digital Certificate © {new Date().getFullYear()}</p>
              </div>
              <div className="flex w-full md:w-auto gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + file);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-semibold transition hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {copySuccess ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  <span>{copySuccess ? "Tersalin" : "Salin Link"}</span>
                </button>
                <a 
                  href={file} 
                  download 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-bold hover:bg-teal-700 transition shadow-md shadow-teal-600/10"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PdfModal;