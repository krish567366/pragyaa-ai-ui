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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How It Works
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Get started with VoiceAgent in just five simple steps
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xl font-bold">01</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quick Sign-Up</h3>
                <p className="text-gray-400">Create your account in seconds and access the VoiceAgent dashboard instantly.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xl font-bold">02</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose Your Voice</h3>
                <p className="text-gray-400">Select from our range of natural-sounding AI voices to personalize your experience.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xl font-bold">03</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Configure Settings</h3>
                <p className="text-gray-400">Customize your interaction preferences and adjust voice parameters to your needs.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xl font-bold">04</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Start Conversation</h3>
                <p className="text-gray-400">Click the orb to begin speaking with your AI assistant - it's that simple!</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-xl font-bold">05</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Enjoy Smart Responses</h3>
                <p className="text-gray-400">Experience fluid conversations with context-aware AI that understands and responds naturally.</p>
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
    </div>
  );
};

export default LandingSections; 