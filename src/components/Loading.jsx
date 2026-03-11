import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="loading-heart text-8xl mb-8"
        >
          💕
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-script text-3xl sm:text-4xl text-rose-600 mb-4"
        >
          Preparing Your Surprise...
        </motion.h2>

        <motion.div
          className="flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-pink-500 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
