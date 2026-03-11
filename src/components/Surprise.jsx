import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Confetti = ({ id, delay }) => {
  const colors = ['#ec4899', '#f43f5e', '#fb7185', '#f472b6', '#be123c'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * window.innerWidth;
  const randomRotation = Math.random() * 720;
  const randomDelay = delay + Math.random() * 0.5;

  return (
    <motion.div
      className="confetti"
      style={{
        left: randomX,
        backgroundColor: randomColor,
        borderRadius: Math.random() > 0.5 ? '50%' : '0',
      }}
      initial={{ y: -100, opacity: 1, rotate: 0 }}
      animate={{
        y: window.innerHeight + 100,
        opacity: 0,
        rotate: randomRotation
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: randomDelay,
        ease: "linear"
      }}
    />
  );
};

const HeartExplosion = ({ id, delay }) => {
  const randomAngle = (Math.random() * 360) * (Math.PI / 180);
  const randomDistance = 100 + Math.random() * 200;
  const randomX = Math.cos(randomAngle) * randomDistance;
  const randomY = Math.sin(randomAngle) * randomDistance;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute text-4xl"
      style={{ left: '50%', top: '50%' }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: 0,
        scale: 1.5,
        rotate: randomRotation
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {['❤️', '💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 6)]}
    </motion.div>
  );
};

const Surprise = ({ boyName, girlName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSurprise, setShowSurprise] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);

  const triggerSurprise = () => {
    setShowSurprise(true);

    // Create confetti
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.5
    }));
    setConfetti(newConfetti);

    // Create heart explosion
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: i * 0.02
    }));
    setHearts(newHearts);

    // Clear after animation
    setTimeout(() => {
      setConfetti([]);
      setHearts([]);
    }, 5000);
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
      {/* Background hearts */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 text-9xl"
        >
          💕
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-1/4 text-9xl"
        >
          💖
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-8">
            One More Thing...
          </h2>
          <p className="font-body text-xl sm:text-2xl text-gray-700 mb-12">
            Are you ready for the final surprise?
          </p>

          <motion.button
            onClick={triggerSurprise}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-16 py-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold text-2xl rounded-full shadow-2xl relative overflow-hidden"
            disabled={showSurprise}
          >
            <span className="relative z-10 flex items-center gap-3">
              Click for a Surprise
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                🎁
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

        {/* Surprise reveal */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
              className="mt-16 relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="glass-effect rounded-3xl p-12 romantic-shadow"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
                  className="text-8xl mb-6"
                >
                  💝
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-6"
                >
                  I Love You!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="font-script text-3xl sm:text-4xl text-rose-600 mb-4"
                >
                  {girlName}, you mean the world to me
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="font-body text-xl text-gray-700"
                >
                  Forever and Always ❤️
                </motion.p>

                {/* Signature */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="font-script text-2xl text-rose-600 mt-8"
                >
                  - {boyName}
                </motion.p>
              </motion.div>

              {/* Heart explosion container */}
              <div className="absolute inset-0 pointer-events-none">
                {hearts.map((heart) => (
                  <HeartExplosion key={heart.id} {...heart} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((item) => (
          <Confetti key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default Surprise;
