import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && musicUrl) {
      audioRef.current.volume = 0.3;
    }
  }, [musicUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback prevented:", err));
      }
      setIsPlaying(!isPlaying);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-play attempt (may be blocked by browser)
  useEffect(() => {
    if (audioRef.current && musicUrl) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // Auto-play blocked - user needs to interact
            setIsPlaying(false);
            setIsMuted(true);
          });
      }
    }
  }, [musicUrl]);

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
        className="fixed bottom-8 right-8 z-40 flex gap-3"
      >
        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.span
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                ⏸️
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                ▶️
              </motion.span>
            )}
          </AnimatePresence>

          {/* Ripple effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 bg-pink-300 rounded-full"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </motion.button>

        {/* Mute/Unmute Button */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl"
        >
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.span
                key="muted"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                🔇
              </motion.span>
            ) : (
              <motion.span
                key="unmuted"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                🔊
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Music note animation when playing */}
      <AnimatePresence>
        {isPlaying && !isMuted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-28 right-12 z-30"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                animate={{
                  y: [-20, -80],
                  x: [0, (i - 1) * 30],
                  opacity: [1, 0],
                  scale: [1, 1.5]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                🎵
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
