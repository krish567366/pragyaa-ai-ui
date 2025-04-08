import type { FC } from 'react';

const AnimatedRocket: FC = () => {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full transform -rotate-45 animate-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 16.5L3 15l3-3m13.5 4.5L21 15l-3-3m-6-6L12 3l-3 3m3 15l-.75 3h1.5L12 21"
          className="stroke-purple-400"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15a3 3 0 100-6 3 3 0 000 6z"
          className="fill-coral-400"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12l-2-2m2 2l2-2m-2 2l2 2m-2-2l-2 2"
          className="stroke-white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Particle effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-32">
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-coral-400 rounded-full animate-particle-1"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-particle-2"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-coral-300 rounded-full animate-particle-3"></div>
      </div>
    </div>
  );
};

export default AnimatedRocket; 