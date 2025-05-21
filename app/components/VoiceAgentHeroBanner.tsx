import React from 'react';

interface VoiceAgentHeroBannerProps {
  // Define props here, e.g., children for the App component
  appComponent: React.ReactNode;
}

const VoiceAgentHeroBanner: React.FC<VoiceAgentHeroBannerProps> = ({ appComponent }) => {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content: Title, Subtitle, Buttons */}
        <div className="md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="text-sky-400">Voice AI</span> platform for <br />
            enterprise use cases
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Easy to deploy super-customisable, multi-lingual and ever-present AI VoiceAgent for your enterprise use-case
          </p>
          <div className="flex space-x-4">
            <a 
              href="/#book-a-demo-section" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Book a Demo
            </a>
            <a 
              href="#voiceagent-pricing-plans" 
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* Right Content: Orb (App Component) */}
        <div className="flex justify-center items-center mt-8 md:mt-0">
          {/* The App component (orb) will be rendered here */}
          {appComponent}
          {/* Placeholder for "Click to talk to me" if not part of appComponent */}
          {/* <p className="mt-4 text-center text-gray-400">Click to talk to me</p> */}
        </div>
      </div>
    </section>
  );
};

export default VoiceAgentHeroBanner; 