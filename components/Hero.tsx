"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { content } from "@/content";
import InteractiveCake from "./InteractiveCake";
import { useState } from "react";

export default function Hero() {
  const [cakeCompleted, setCakeCompleted] = useState(false);

  const handleCakeComplete = () => {
    setCakeCompleted(true);
  };
  return (
    <section
      id="home"
      className="section bg-gradient-to-b from-romantic-cream-50/30 to-romantic-pink-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="text-romantic-pink-300" size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
        <div className="my-12">
          <InteractiveCake onComplete={handleCakeComplete} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: cakeCompleted ? 1 : 0, y: cakeCompleted ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
          style={{ display: cakeCompleted ? 'block' : 'none' }}
        >
          <Heart className="inline-block text-romantic-pink-500 fill-romantic-pink-500 mb-4 animate-pulse-slow" size={64} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: cakeCompleted ? 1 : 0, y: cakeCompleted ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-romantic-pink-600 mb-6 leading-tight"
          style={{ display: cakeCompleted ? 'block' : 'none' }}
        >
          {content.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: cakeCompleted ? 1 : 0, y: cakeCompleted ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 font-light"
          style={{ display: cakeCompleted ? 'block' : 'none' }}
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: cakeCompleted ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="inline-block"
          style={{ display: cakeCompleted ? 'block' : 'none' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="text-romantic-pink-500" size={48} />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-romantic-pink-50/50 to-transparent pointer-events-none" />
    </section>
  );
}