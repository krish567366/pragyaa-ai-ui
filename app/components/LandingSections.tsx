import type { FC } from 'react';

const LandingSections: FC = () => {
  return (
    <div className="w-full bg-black text-white">
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Experience Next-Gen<br />Voice Interaction
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Natural Conversations</h3>
              <p className="text-gray-400">Engage in fluid, context-aware conversations with advanced AI understanding.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Multiple Voices</h3>
              <p className="text-gray-400">Choose from a variety of natural-sounding voices to personalize your experience.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Real-time Response</h3>
              <p className="text-gray-400">Experience lightning-fast responses with minimal latency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm mb-4">
              How It Works
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Built For Voice<br />Interaction
            </h2>
            <p className="text-gray-400 text-lg">
              VoiceAgent makes voice interaction easy with a simple, streamlined process that takes you from setup to conversation in just a few steps.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    01
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Quick Setup</h3>
                    <p className="text-gray-400">
                      Get started instantly - no account required. Just click the orb and start speaking with your AI assistant.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    02
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Choose Your Voice</h3>
                    <p className="text-gray-400">
                      Select from our range of natural-sounding AI voices to personalize your experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🎤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    03
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Start Speaking</h3>
                    <p className="text-gray-400">
                      Simply speak naturally - our AI understands context and nuance, making conversations feel effortless.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">💬</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    04
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Get Smart Responses</h3>
                    <p className="text-gray-400">
                      Receive intelligent, contextual responses in real-time with our advanced AI processing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🤖</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    05
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Customize & Extend</h3>
                    <p className="text-gray-400">
                      Adjust settings, customize prompts, and extend functionality to match your specific needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">⚙️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include core VoiceAgent features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-purple-600 transition-colors">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-gray-400">Perfect for individuals and small projects</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>1,000 minutes/month</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>4 AI voices</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Basic support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-gray-900 rounded-2xl p-8 border-2 border-purple-600 relative transform scale-105">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-600 text-sm py-1 px-3 rounded-full">
                Popular
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-gray-400">Ideal for growing businesses</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>5,000 minutes/month</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>All AI voices</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom voice training</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-purple-600 transition-colors">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400">For large-scale deployments</p>
              </div>
              <div className="mb-8">
                <span className="text-2xl font-bold">Custom pricing</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Unlimited minutes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom AI voices</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>SLA guarantee</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>On-premises deployment</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">What is VoiceAgent?</h3>
              <p className="text-gray-400">VoiceAgent is an advanced AI-powered voice interface that enables natural conversations with a computer system.</p>
            </div>
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">How do I start using VoiceAgent?</h3>
              <p className="text-gray-400">Simply click the orb in the center of the screen and start speaking. VoiceAgent will listen and respond naturally.</p>
            </div>
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Can I change the voice?</h3>
              <p className="text-gray-400">Yes! You can choose from multiple voice options including Asteria, Orion, Luna, and Arcas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/pragyaa_transparent_hor.png" 
                alt="VoiceAgent Logo" 
                className="h-8 object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#signup" className="hover:text-white transition-colors">
                Sign up
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center">
              ©2025 VoiceAgent. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingSections; 