import { motion } from "framer-motion";
import { sectionTransition } from "../animations/variants";
import TimelineItem from "./timeline";

const timeline = [
  {
    period: "2025",
    role: "Programmer Intern",
    company: "PT Mede Media Softika",
  },
  {
    period: "2023 - 2026",
    role: "Student",
    company: "Wikrama Vocational High School",
  },
];

function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="relative py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full px-6 md:px-20 lg:px-40 relative z-10 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 dark:text-white">Experience</h2>
        <div className="relative">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-6">
            {timeline.map((t, idx) => (
              <TimelineItem key={idx} index={idx} {...t} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ExperienceSection;
