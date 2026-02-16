import { motion } from "framer-motion";

function TimelineItem({ period, role, company, details, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      className="mb-8 relative"
    >
      <div className="absolute -left-8 top-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08 + 0.05, type: "spring", stiffness: 300, damping: 20 }}
          className="w-3 h-3 rounded-full bg-teal-600 border-2 border-white dark:border-gray-900"
        />

        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 48 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08 + 0.08, duration: 0.45 }}
          className="w-[2px] bg-gray-200 dark:bg-gray-700 mt-1 rounded"
        />
      </div>

      <div className="ml-6">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {role} <span className="text-xs text-gray-500 dark:text-gray-400">@ {company}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{period}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{details}</div>
      </div>
    </motion.div>
  );
}

export default TimelineItem;
