import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const TimelineItem = ({ item, index, isInView }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={`
        flex items-start gap-6 mb-12
        flex-col md:flex-row
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Content */}
      <div
        className={`flex-1 text-left md:${isEven ? "text-right" : "text-left"
          }`}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-effect rounded-2xl p-5 md:p-6 romantic-shadow w-full md:max-w-md"
        >
          <motion.h3 className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-2">
            {item.title}
          </motion.h3>

          <p className="font-script text-lg text-rose-600 mb-3">
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-body text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div
        className="hidden md:flex relative flex-shrink-0 md:mx-0 mx-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            delay: index * 0.2 + 0.3,
            type: "spring",
            bounce: 0.5,
          }}
          className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-4 border-white shadow-lg z-10 relative"
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          className="absolute inset-0 bg-pink-400 rounded-full"
        />
      </div>

      {/* Empty space (desktop only) */}
      <div className="hidden md:block flex-1"></div>
    </motion.div>
  );
};

const Timeline = ({ timeline }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 text-9xl">💕</div>
        <div className="absolute bottom-0 right-1/4 text-9xl">💖</div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-4">
            Our Journey Together
          </h2>

          <p className="font-script text-xl sm:text-3xl text-rose-600">
            Every Chapter of Our Love Story
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div
          className="
          absolute 
          left-4 md:left-1/2 
          md:-translate-x-1/2 
          top-32 bottom-0 
          w-1 
          bg-gradient-to-b 
          from-pink-300 via-rose-400 to-pink-300
        "
        ></div>

        {/* Timeline Items */}
        <div className="relative pl-10 md:pl-0">
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* End Heart */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={isInView ? { scale: 1, rotate: 360 } : {}}
          transition={{
            delay: timeline.length * 0.2,
            duration: 1,
            type: "spring",
          }}
          className="flex justify-center mt-8"
        >
          <div className="text-6xl">💝</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;