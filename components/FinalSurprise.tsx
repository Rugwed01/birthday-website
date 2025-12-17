"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { content } from "@/content";

export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
    });
  };

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      triggerConfetti();
    }
  };

  return (
    <section id="surprise" className="section bg-gradient-to-b from-romantic-cream-50/30 to-romantic-pink-50/30 relative overflow-hidden">
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
            <Sparkles className="text-romantic-pink-300" size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-script text-5xl md:text-6xl text-romantic-pink-600 mb-8">
            {content.finalSurprise.title}
          </h2>

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <motion.button
              onClick={handleReveal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-romantic-pink-500 to-romantic-lavender-500 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-romantic-pink-300/50 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <Gift
                className="group-hover:rotate-12 transition-transform duration-300"
                size={28}
              />
              {content.finalSurprise.buttonText}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl mx-auto"
              >
                <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-romantic-pink-300 rounded-full blur-3xl opacity-40" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-romantic-lavender-300 rounded-full blur-3xl opacity-40" />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                  >
                    <Heart
                      className="text-romantic-pink-500 fill-romantic-pink-500 mx-auto animate-pulse-slow"
                      size={64}
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl md:text-3xl font-script text-romantic-pink-600 leading-relaxed relative z-10"
                  >
                    {content.finalSurprise.revealMessage}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 flex justify-center gap-3"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Heart
                          className="text-romantic-pink-500 fill-romantic-pink-500"
                          size={24}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
