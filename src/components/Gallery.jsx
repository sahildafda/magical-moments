import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Gallery = ({ photos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-4">
            Our Beautiful Moments
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-rose-600">
            Memories We'll Treasure Forever
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring"
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl romantic-shadow"
              onClick={() => setSelectedImage(photo)}
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={photo}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-pink-500/40 to-transparent flex items-end justify-center pb-6"
              >
                <span className="text-white font-semibold text-lg flex items-center gap-2">
                  <span>View</span>
                  <span className="text-2xl">💕</span>
                </span>
              </motion.div>

              {/* Decorative corner */}
              <div className="absolute top-3 right-3 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ❤️
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected memory"
                className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              >
                ×
              </motion.button>

              {/* Decorative hearts */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-5xl"
              >
                💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
