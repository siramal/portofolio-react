import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  const socialLinks = [
    {
      icon: FaGithub,
      url: "https://github.com/siramal",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/sirojulkamal",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/sirojul_kamal",
      label: "Instagram",
    },
    {
      icon: FaEnvelope,
      url: "mailto:sirojulkamal13@gmail.com",
      label: "Email",
    },
  ];

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="w-full px-6 md:px-16 lg:px-32">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="p-3 rounded-full bg-gray-800 hover:bg-teal-600 transition-colors duration-300 text-lg"
                variants={iconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            © 2024 Sirojul Kamal. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
