"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { content } from "@/content";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="memories" className="section bg-gradient-to-b from-romantic-lavender-50/30 to-romantic-peach-50/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl md:text-6xl text-romantic-pink-600 mb-4">
            Our Memories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of moments that made my heart smile
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {content.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group glass shadow-lg"
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink-200 via-romantic-lavender-200 to-romantic-peach-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <Heart className="text-romantic-pink-500 fill-romantic-pink-400 mx-auto mb-4" size={48} />
                  <p className="text-romantic-pink-700 font-medium text-sm">
                    {item.placeholder}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white font-medium text-lg">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="text-gray-800" size={24} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full aspect-square rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink-200 via-romantic-lavender-200 to-romantic-peach-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="text-romantic-pink-500 fill-romantic-pink-400 mx-auto mb-6" size={80} />
                    <p className="text-romantic-pink-700 font-medium text-xl mb-2">
                      {content.gallery[selectedImage].placeholder}
                    </p>
                    <p className="text-romantic-pink-600 text-lg">
                      {content.gallery[selectedImage].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
