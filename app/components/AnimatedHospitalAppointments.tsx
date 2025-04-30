'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

const AnimatedHospitalAppointments: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Set up animation frames
  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 3); // Cycle through 3 frames
    }, 2000); // Change frame every 2 seconds
    
    return () => {
      clearInterval(interval);
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-10">
      {/* Title */}
      <h3 className="text-2xl font-bold text-center text-white mb-8">
        Hospital Appointments Show/No-Show Prediction
      </h3>
      
      {/* Animation container */}
      <div className="relative w-full max-w-3xl mx-auto h-64 bg-gray-900 rounded-xl overflow-hidden border border-purple-500/30">
        <div className="relative w-full h-full">
          {/* Hospital & Calendar Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transition-opacity duration-500 ${currentFrame === 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-8">
                <div className="bg-purple-600/20 p-4 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-xl text-white">
                  Scheduled Appointments
                </div>
              </div>
            </div>
            
            <div className={`transition-opacity duration-500 ${currentFrame === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <div className="text-lg text-white">78% Show Rate</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <div className="text-lg text-white">22% No-Show Rate</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-opacity duration-500 ${currentFrame === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-8">
                <div className="bg-purple-600/20 p-4 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="text-xl text-white">
                  Optimize Scheduling with ML Predictions
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated purple gradient glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-600/30 to-transparent"></div>
        </div>
      </div>
      
      {/* Caption */}
      <p className="text-gray-400 text-center max-w-2xl mt-6">
        PredictML helps hospitals reduce no-shows by up to 30%, optimize staff scheduling, and increase revenue by predicting appointment attendance patterns.
      </p>
    </div>
  );
};

export default AnimatedHospitalAppointments; 