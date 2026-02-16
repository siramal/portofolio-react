import { motion } from "framer-motion";
import { sectionTransition } from "../animations/variants";
import { FaReact, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiBootstrap, SiLaravel, SiJavascript, SiPostman, SiFlutter, SiPhp } from "react-icons/si";

const skills = [
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Laravel",
  "PHP",
  "JavaScript",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "Postman",
  "Flutter",
  "Microsoft Office",
];

const skillIcons = {
  "React": FaReact,
  "Tailwind CSS": SiTailwindcss,
  "Bootstrap": SiBootstrap,
  "Laravel": SiLaravel,
  "PHP": SiPhp,
  "JavaScript": SiJavascript,
  "Git": FaGitAlt,
  "GitHub": FaGitAlt,
  "Postman": SiPostman,
  "Flutter": SiFlutter,
  "HTML": null,
  "CSS": null,
  "Microsoft Office": null,
};

function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="py-32 bg-white dark:bg-black transition-colors duration-300"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full px-6 md:px-20 lg:px-40 text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Technical Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, i) => {
            const Icon = skillIcons[skill];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition"
              >
                {Icon ? (
                  <Icon className="text-3xl text-teal-600 dark:text-teal-400" />
                ) : (
                  <div className="w-8 h-8 bg-teal-600 dark:bg-teal-400 rounded"></div>
                )}
                <p className="text-xs md:text-sm font-medium text-center">{skill}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default SkillsSection;
