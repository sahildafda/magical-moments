import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const GRID = 3;

const Gallery = ({ photos, puzzlePhoto }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [solved, setSolved] = useState(false);

  const [tiles, setTiles] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [moves, setMoves] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [tileSize, setTileSize] = useState(0);
  const puzzleRef = useRef(null);

  useEffect(() => {
    const isUnlocked = localStorage.getItem("galleryUnlocked") === "true";
    if (isUnlocked) {
      setUnlocked(true);
      setSolved(true);
    }
  }, []);

  useEffect(() => {
    const ordered = Array.from({ length: GRID * GRID }, (_, i) => i);
    const shuffled = [...ordered].sort(() => Math.random() - 0.5);
    if (shuffled.join() === ordered.join()) shuffled.reverse();
    setTiles(shuffled);
  }, [puzzlePhoto]);

  useEffect(() => {
    if (!puzzleRef.current) return;
    const measure = () => {
      const size = puzzleRef.current?.offsetWidth;
      if (size) setTileSize(Math.floor(size / GRID));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isInView]);

  const checkSolved = useCallback((t) => t.every((v, i) => v === i), []);

  const handleDrop = (targetIdx) => {
    if (dragging === null || dragging === targetIdx) return;
    const next = [...tiles];
    [next[dragging], next[targetIdx]] = [next[targetIdx], next[dragging]];
    setTiles(next);
    setMoves((m) => m + 1);
    setDragging(null);

    if (checkSolved(next)) {
      setSolved(true);
      setCelebrating(true);

      // SAVE STATE
      localStorage.setItem("galleryUnlocked", "true");

      setTimeout(() => {
        setCelebrating(false);
        setUnlocked(true);
      }, 2200);
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
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
            {unlocked
              ? 'Memories We\'ll Treasure Forever'
              : 'Solve the puzzle to unlock our memories 🔐'}
          </p>
        </motion.div>

        {/* PUZZLE GATE */}
        <AnimatePresence>
          {!unlocked && puzzlePhoto && (
            <motion.div
              key="puzzle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-20"
            >
              {!solved && (
                <p className="font-body text-gray-600 mb-4 text-center">
                  Drag & drop the tiles to put the picture back together 💕
                </p>
              )}

              {celebrating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 text-center"
                >
                  <p className="font-display text-3xl font-bold gradient-text">
                    You did it! 🎉 Unlocking memories…
                  </p>
                </motion.div>
              )}

              {/* Puzzle grid */}
              <div
                ref={puzzleRef}
                className="relative rounded-2xl overflow-hidden romantic-shadow"
                style={{
                  width: 'min(80vw, 360px)',
                  height: 'min(80vw, 360px)',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${GRID}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID}, 1fr)`,
                  gap: solved ? 0 : 3,
                  background: '#f43f6e',
                  transition: 'gap 0.4s ease',
                }}
              >
                {tileSize > 0 && tiles.map((tileIdx, slotIdx) => {
                  const col = tileIdx % GRID;
                  const row = Math.floor(tileIdx / GRID);
                  const correct = tileIdx === slotIdx;

                  return (
                    <motion.div
                      key={tileIdx}
                      draggable
                      onDragStart={() => setDragging(slotIdx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(slotIdx)}
                      animate={celebrating && correct ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.4, repeat: celebrating ? 3 : 0 }}
                      className="cursor-grab active:cursor-grabbing overflow-hidden"
                      style={{
                        backgroundImage: `url(${encodeURI(puzzlePhoto)})`,
                        backgroundSize: `${tileSize * GRID}px ${tileSize * GRID}px`,
                        backgroundPosition: `${-col * tileSize}px ${-row * tileSize}px`,
                        backgroundRepeat: 'no-repeat',
                        outline: correct && !solved
                          ? '2px solid rgba(244,63,110,0.6)'
                          : 'none',
                        transition: 'outline 0.3s',
                      }}
                    />
                  );
                })}
              </div>

              {!solved && (
                <p className="mt-4 text-sm text-gray-500 font-body">
                  Moves: {moves}
                </p>
              )}

              {!solved && moves > 15 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setTiles(Array.from({ length: GRID * GRID }, (_, i) => i))
                  }
                  className="mt-4 px-6 py-2 bg-white border border-pink-300 text-pink-500 font-semibold rounded-full text-sm shadow"
                >
                  Give me a hint 👀
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blurred locked preview */}
        {!unlocked && photos.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pointer-events-none select-none">
            {photos.slice(0, 6).map((photo, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden relative romantic-shadow"
              >
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'blur(12px) brightness(0.6)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl">
                  🔒
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FULL GALLERY after unlock */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    type: 'spring',
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
                  <div className="absolute top-3 right-3 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ❤️
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL */}
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
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected memory"
                className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              >
                ×
              </motion.button>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
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