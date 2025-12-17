"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { content } from "@/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LoveLetter() {
  return (
    <section id="letter" className="section bg-gradient-to-b from-romantic-peach-50/30 to-romantic-cream-50/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Heart className="inline-block text-romantic-pink-500 fill-romantic-pink-500 mb-4" size={48} />
          <h2 className="font-script text-5xl md:text-6xl text-romantic-pink-600 mb-4">
            {content.loveLetter.title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-romantic-pink-200 rounded-full blur-3xl opacity-30 -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-romantic-lavender-200 rounded-full blur-3xl opacity-30 -z-10" />

            <div className="space-y-6 text-gray-800 leading-relaxed">
              {content.loveLetter.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={paragraphVariants}
                  className={`text-lg md:text-xl ${
                    index === 0 || index === content.loveLetter.paragraphs.length - 1
                      ? "font-script text-2xl text-romantic-pink-600"
                      : ""
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex justify-center mt-8"
            >
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className="text-romantic-pink-500 fill-romantic-pink-500 animate-pulse-slow"
                    size={24}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
