"use client";

import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

// Removed particle generation logic

const AnimatedVoiceLensBanner: React.FC = () => {
  // Removed particle state

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
    </motion.div>
  );
};

export default AnimatedVoiceLensBanner; 