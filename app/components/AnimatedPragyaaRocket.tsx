'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useState, useCallback } from 'react';

const AnimatedPragyaaRocket: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      {/* Particle effects - Positioned behind the rocket */}
      <div className="absolute -bottom-[10%] left-[20%] -translate-x-1/2 w-160 h-192 z-0">
        {/* Main exhaust glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-150 bg-gradient-to-t from-purple-500/40 via-coral-400/30 to-transparent"></div>
        
        {/* White exhaust circles - these are the main visible exhaust effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white rounded-full shadow-glow animate-particle-1"></div>
        <div className="absolute bottom-3 left-[46%] w-42 h-42 bg-white rounded-full shadow-glow animate-particle-2 delay-100"></div>
        <div className="absolute bottom-2 left-[54%] w-45 h-45 bg-white rounded-full shadow-glow animate-particle-3 delay-200"></div>
        <div className="absolute bottom-5 left-[49%] w-38 h-38 bg-white/90 rounded-full shadow-glow animate-particle-1 delay-300"></div>
        <div className="absolute bottom-1 left-[51%] w-36 h-36 bg-white/90 rounded-full shadow-glow animate-particle-2 delay-150"></div>
        
        {/* Colored particles for additional effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-coral-400/40 rounded-full blur-lg animate-particle-1"></div>
        <div className="absolute bottom-4 left-[45%] w-50 h-50 bg-purple-400/40 rounded-full blur-md animate-particle-2"></div>
        <div className="absolute bottom-2 left-[55%] w-50 h-50 bg-coral-300/40 rounded-full blur-md animate-particle-3"></div>
      </div>

      {/* Main rocket image with floating animation */}
      <div className="relative w-full h-full animate-float z-10">
        {!imageError ? (
          <Image
            src="/images/rocket.png"
            alt="Pragyaa Rocket"
            width={600}
            height={588}
            className="object-contain relative z-10"
            priority
            loading="eager"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white">Loading rocket...</div>
          </div>
        )}
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-400/5 via-coral-400/5 to-transparent rounded-full filter blur-3xl -z-10"></div>
    </div>
  );
};

export default AnimatedPragyaaRocket; 