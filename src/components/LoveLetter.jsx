import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const LoveLetter = ({ title, message }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = message.split(' ');

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-9xl text-pink-500">❤</div>
        <div className="absolute bottom-20 right-10 text-9xl text-rose-500">💕</div>
        <div className="absolute top-1/2 left-1/4 text-7xl text-red-500">💖</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Letter container */}
        <div className="glass-effect rounded-3xl p-8 sm:p-12 lg:p-16 romantic-shadow">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-pink-400 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-400 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-pink-400 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-400 rounded-br-3xl"></div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 gradient-text"
          >
            {title}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-12"
          />

          {/* Message with animated words */}
          <div className="font-body text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed text-center space-y-4">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.7 + (index * 0.03),
                  duration: 0.3
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 text-right"
          >
            <p className="font-script text-3xl sm:text-4xl text-rose-600">
              With All My Love 💕
            </p>
          </motion.div>
        </div>

        {/* Floating hearts around the letter */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 -left-10 text-6xl opacity-60"
        >
          💌
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -bottom-10 -right-10 text-6xl opacity-60"
        >
          💝
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
