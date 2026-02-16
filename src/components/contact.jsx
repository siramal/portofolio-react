import { motion } from "framer-motion";
import { sectionTransition } from "../animations/variants";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const contactMethods = [
    {
        icon: FaWhatsapp,
        title: "WhatsApp",
        value: "+62 896 1009 8833",
        action: "Chat",
        link: "https://wa.me/6289610098833",
        color: "bg-green-500",
    },
    {
        icon: FaEnvelope,
        title: "Email",
        value: "sirojulkamal13@gmail.com",
        action: "Send Email",
        link: "mailto:sirojulkamal13@gmail.com",
        color: "bg-blue-500",
    },
    {
        icon: FaPhone,
        title: "Phone",
        value: "+62 896 1009 8833",
        action: "Call",
        link: "tel:+6289610098833",
        color: "bg-purple-500",
    },
    {
        icon: FaMapMarkerAlt,
        title: "Location",
        value: "Indonesia",
        action: "View",
        link: "https://maps.app.goo.gl/gkWooT2oChV9MUvu5",
        color: "bg-red-500",
    },
];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
        },
    },
};

function ContactSection() {
    const [formStatus, setFormStatus] = useState({ submitted: false, message: "" });

    return (
        <motion.section
            id="contact"
            className="py-24 bg-white dark:bg-black transition-colors duration-300"
            variants={sectionTransition}
            initial="hidden"
            whileInView="visible"
        >
            <div className="w-full px-6 md:px-16 lg:px-32 max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 dark:text-white">
                    Contact Me
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
                    Contact me through various channels or fill out the form below.
                </p>

                {/* Contact Methods Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.a
                                key={index}
                                href={method.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={item}
                                whileHover={{ translateY: -8 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center group hover:shadow-lg transition"
                            >
                                <div className={`${method.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 group-hover:scale-110 transition`}>
                                    <Icon />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{method.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{method.value}</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-teal-600 dark:text-teal-400 text-sm font-semibold hover:text-teal-700 dark:hover:text-teal-300"
                                >
                                    {method.action} →
                                </motion.button>
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <motion.form
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const name = e.target.name.value;
                            const email = e.target.email.value;
                            const message = e.target.message.value;
                            const phoneNumber = "6289610098833";
                            const text = `Halo, nama saya ${name}.%0AEmail: ${email}%0A%0A${message}`;

                            window.open(
                                `https://wa.me/${phoneNumber}?text=${text}`,
                                "_blank"
                            );

                            // Reset form
                            e.target.reset();
                            setFormStatus({ submitted: true, message: "Pesan akan dikirim ke WhatsApp!" });
                            setTimeout(() => setFormStatus({ submitted: false, message: "" }), 3000);
                        }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 transition-colors duration-300"
                    >
                        {/* Success Message */}
                        {formStatus.submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg text-sm"
                            >
                                ✓ {formStatus.message}
                            </motion.div>
                        )}

                        {/* Name Input */}
                        <motion.div variants={item}>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your name"
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200 transition"
                            />
                        </motion.div>

                        {/* Email Input */}
                        <motion.div variants={item}>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your email"
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200 transition"
                            />
                        </motion.div>

                        {/* Message Textarea */}
                        <motion.div variants={item}>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200 transition resize-none"
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={item}
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
                        >
                            Send via WhatsApp ✓
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
}

export default ContactSection;
