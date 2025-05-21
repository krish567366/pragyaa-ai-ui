"use client";

import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

// Removed particle generation logic

const AnimatedVoiceLensBanner: React.FC = () => {
  const uspText = 
    "VoiceLens is the only Voice Analytics product that allows you to <br /> Build Your Own AI Voice Metrics";

  return (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      // Add subtle pulse animation to the container/image
      animate={{
        scale: [1, 1.03, 1], // Scale slightly up and back down
      }}
      transition={{
        duration: 4, // Duration of one pulse cycle
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Removed central orb and particles */}
      
      {/* Add the static image */}
      <Image
        src="/images/voicelens/VoiceLens Voice AI.png" // Use the provided image path
        alt="VoiceLens Voice AI Banner"
        width={600} // Set appropriate width (adjust if needed)
        height={350} // Set appropriate height (adjust if needed)
        className="object-contain" // Ensure the image scales correctly within its container
        priority // Prioritize loading this image as it's likely important for LCP
      />

      <motion.div
        key={uspText} // Key for AnimatePresence if we were swapping texts, good practice for single animated item too
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0, 0] }} // Sequence: fade in, stay, stay, fade out, stay out
        transition={{
          duration: 9, // Total duration: e.g., 1s in, 5s stay, 1s out, 2s pause
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.11, 0.66, 0.77, 0.88, 1] // 0(out) -> 1(in) -> 1(stay) -> 1(stay) -> 0(out) -> 0(pause)
        }}
        className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 text-center text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-4 w-[90%] max-w-xl md:max-w-2xl font-medium"
        style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }} // Subtle shadow for readability
        dangerouslySetInnerHTML={{ __html: uspText }}
      />
    </motion.div>
  );
};

export default AnimatedVoiceLensBanner; 