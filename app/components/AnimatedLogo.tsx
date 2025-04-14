import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-64 h-64 mb-8">
        {/* Blue Circle - enters from top left */}
        <motion.div
          className="absolute w-48 h-48 left-0 top-4"
          initial={{ x: -200, y: -200, opacity: 1 }}
          animate={{ x: 0, y: 0, rotate: 360 }}
          transition={{ 
            x: { duration: 1, ease: "easeOut" },
            y: { duration: 1, ease: "easeOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="w-full h-full border-2 border-[#00B4D8] rounded-full" />
        </motion.div>

        {/* Yellow Circle - enters from top right */}
        <motion.div
          className="absolute w-48 h-48 right-0 top-4"
          initial={{ x: 200, y: -200, opacity: 1 }}
          animate={{ x: 0, y: 0, rotate: -360 }}
          transition={{ 
            x: { duration: 1, ease: "easeOut" },
            y: { duration: 1, ease: "easeOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="w-full h-full border-2 border-[#FFB930] rounded-full" />
        </motion.div>

        {/* Pink Circle - enters from bottom */}
        <motion.div
          className="absolute w-48 h-48 left-8 bottom-0"
          initial={{ y: 200, opacity: 1 }}
          animate={{ y: 0, rotate: 360 }}
          transition={{ 
            y: { duration: 1, ease: "easeOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="w-full h-full border-2 border-[#FF69B4] rounded-full" />
        </motion.div>
      </div>

      {/* Logo Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h1 className="text-2xl text-white">
          Enterprise AI, <span className="italic">simplified</span>
        </h1>
      </motion.div>
    </div>
  );
} 