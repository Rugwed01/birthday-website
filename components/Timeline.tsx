"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { content } from "@/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Timeline() {
  return (
    <section id="story" className="section bg-gradient-to-b from-transparent to-romantic-lavender-50/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-script text-5xl md:text-6xl text-romantic-pink-600 mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every moment with you is a chapter in our beautiful love story
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-romantic-pink-300 via-romantic-lavender-300 to-romantic-peach-300 hidden md:block transform -translate-x-1/2" />

          {content.timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="glass p-6 md:p-8 rounded-2xl shadow-lg glass-hover"
                >
                  <span className="inline-block px-4 py-1 bg-romantic-pink-100 text-romantic-pink-700 rounded-full text-sm font-medium mb-3">
                    {item.date}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-romantic-pink-600 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              <div className="hidden md:flex w-2/12 justify-center my-4 md:my-0 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-romantic-pink-400 to-romantic-lavender-400 flex items-center justify-center shadow-lg"
                >
                  <Heart className="text-white fill-white" size={24} />
                </motion.div>
              </div>

              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
