import { motion } from "framer-motion";
import { sectionTransition } from "../animations/variants";
import fotobg from "../assets/kamalpose.png";
import CV from "../assets/CV Sirojul Kamal (3).pdf";
import { FaDownload } from "react-icons/fa";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

function AboutSection() {
  return (
    <motion.section
      id="about"
      className="relative py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
      variants={sectionTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full px-6 md:px-20 lg:px-40 relative z-10 text-gray-800 dark:text-gray-200">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image / visual */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-500 blur-3xl opacity-20 rounded-full -z-10"></div>
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={fotobg}
                alt="About Me"
                className="relative w-48 md:w-64 drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">About Me</h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
             I am a student at SMKS Wikrama Bogor in the Software and Game Development Expertise Program (PPLG). I am passionate about web and mobile application development. I understand the fundamentals of data management and have extensive work experience in the industry. I am able to work both independently and in a team, and I am highly motivated to continue learning and developing.
            </p>

            {/* Stats & Actions */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{projects.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{certificates.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Certificates</div>
                </div>
              </div>

              <div className="ml-auto flex gap-3">
                <a href={CV} download className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow hover:bg-teal-50 dark:hover:bg-gray-700 transition">
                  <FaDownload /> Download CV
                </a>

                <a href="#contact" className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection;
