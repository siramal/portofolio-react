import { motion } from "framer-motion";
import { FaAward, FaCode, FaArrowRight } from "react-icons/fa";

export default function BaseCard({ title, subtitle, year, thumbnail, onView, actions, type = "certificate" }) {
  const isPdf = thumbnail?.toLowerCase().endsWith('.pdf');

  return (
    <motion.div
      layout
      whileHover={{ y: -12, scale: 1.02 }}
      className="relative h-full group"
    >
      {/* Dynamic Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
        
        {/* MEDIA PREVIEW */}
        <div className="h-48 relative bg-gray-50 dark:bg-black/40 overflow-hidden flex items-center justify-center">
          {thumbnail ? (
            isPdf ? (
              /* CONTAINER DENGAN SCROLLBAR DISEMBUNYIKAN */
              <div 
                className="w-full h-full overflow-y-auto pointer-events-none bg-white"
                style={{
                  msOverflowStyle: 'none',  /* IE and Edge */
                  scrollbarWidth: 'none',   /* Firefox */
                }}
              >
                {/* Style tag internal untuk Chrome/Safari */}
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}</style>
                <iframe 
                  src={`${thumbnail}#toolbar=0&navpanes=0&view=FitH`} 
                  className="w-full h-[600px] border-none block opacity-80 group-hover:opacity-100 transition-opacity hide-scrollbar" 
                  title="preview"
                />
              </div>
            ) : (
              <img src={thumbnail} alt={title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center">
              {type === "certificate" ? <FaAward className="text-5xl text-teal-500/40" /> : <FaCode className="text-5xl text-teal-500/40" />}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-6 bg-teal-500 rounded-full" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              {subtitle}
            </p>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-snug mb-4 group-hover:text-teal-500 transition-colors">
            {title}
          </h3>

          <div className="mt-auto pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 font-mono tracking-tighter">{year}</span>
            
            <div className="flex items-center gap-4">
              <motion.button 
                onClick={onView}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn relative flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-teal-600 dark:hover:bg-teal-500 hover:text-white dark:hover:text-white shadow-lg shadow-teal-500/10"
              >
                <span className="relative z-10">View</span>
                <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </motion.button>

              <div className="flex items-center gap-3 border-l border-gray-100 dark:border-white/10 pl-4">
                {actions}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}