import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingHeart = ({ delay, duration, x }) => (
  <motion.div
    className="particle text-pink-500 opacity-70"
    style={{
      left: `${x}%`,
      fontSize: `${Math.random() * 20 + 15}px`,
    }}
    initial={{ y: '100vh', opacity: 0 }}
    animate={{ 
      y: '-100vh', 
      opacity: [0, 1, 1, 0],
      x: [0, Math.random() * 100 - 50]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    ❤️
  </motion.div>
);

const Hero = ({ boyName, girlName, onOpenSurprise }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      x: Math.random() * 100
    }));
    setHearts(heartArray);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-40"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-40"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} {...heart} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">💕</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold mb-4"
        >
          <span className="gradient-text">{boyName}</span>
          <span className="text-pink-500 mx-4 font-script text-6xl sm:text-8xl">×</span>
          <span className="gradient-text">{girlName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-script text-2xl sm:text-4xl text-rose-600 mb-12"
        >
          A Love Story Worth Celebrating
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.button
            onClick={onOpenSurprise}
            className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-semibold text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Open My Surprise
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💌
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Decorative hearts */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">💝</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute top-1/3 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>💗</div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
