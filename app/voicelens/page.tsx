import Image from 'next/image';
import Link from 'next/link';
import ProductNav from '../components/ProductNav';
import AnimatedVoiceLensBanner from '../components/AnimatedVoiceLensBanner';

export default function VoiceLens() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <ProductNav />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Unlock the Superpower of Your Enterprise Voice Data
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Boost key business outcomes by up to 30% with VoiceLens—groundbreaking AI-powered voice analytics customised specifically for your key metrics.
              </p>
              <Link href="#variants-section" className="bg-gradient-to-r from-purple-500 to-coral-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-coral-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] border border-purple-400/20">
                Tell Me More
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-coral-400/20 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <AnimatedVoiceLensBanner />
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-0 right-0 w-40 h-40 grid grid-cols-7 gap-2">
                {Array(49).fill(null).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-gray-600/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background gradient effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-500/10 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Variants Section */}
      <section id="variants-section" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-300">
            3 variants
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-purple-900/30 p-8 rounded-xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">VoiceLens OneView</h3>
              <p className="text-gray-300">Comprehensive single-view analytics dashboard for quick insights and overview of all metrics.</p>
            </div>
            <div className="bg-purple-900/30 p-8 rounded-xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">VoiceLens Live</h3>
              <p className="text-gray-300">Real-time analytics and monitoring for ongoing calls with instant feedback.</p>
            </div>
            <div className="bg-purple-900/30 p-8 rounded-xl backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">VoiceLens Post Call</h3>
              <p className="text-gray-300">Detailed post-call analysis with AI-powered insights and comprehensive reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-300">
              Voice Analytics that work for you
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Features List */}
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    01
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Customer Interaction Metrics</h3>
                    <p className="text-gray-300">
                      Evaluate for your specific set of metrics for customer interaction
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    02
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Customer Profile Analysis</h3>
                    <p className="text-gray-300">
                      Evaluate for Product offered vs customer profile data points like Salary, Corporate, Age
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    03
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Feature Compliance</h3>
                    <p className="text-gray-300">
                      Evaluate for documented product features vs features offered
                    </p>
                  </div>
                </div>
              </div>

              {/* Features 4-6 */}
              <div className="space-y-8">
                {/* Feature 4 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    04
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Disposition Tracking</h3>
                    <p className="text-gray-300">
                      Evaluate for Disposition: Next action for customer as per the call vs Agent entry in CRM
                    </p>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    05
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Soft Skills Assessment</h3>
                    <p className="text-gray-300">
                      Evaluate for your set of Soft Skills: Empathy, Politeness, Listening to customer and more
                    </p>
                  </div>
                </div>

                {/* Feature 6 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    06
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Custom Metrics</h3>
                    <p className="text-gray-300">
                      Build and deploy any other custom metrics on the fly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-300">
              Uses Generative AI for call summarization, identify reasons, sentiments, custom entities
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* AI Features */}
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    01
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Smart Call Summarization</h3>
                    <p className="text-gray-300 mb-6">
                      Automatically generate concise, actionable call summaries
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <Image
                        src="/images/voicelens/call-summary.svg"
                        alt="Call Summary Example"
                        width={400}
                        height={200}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    02
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Sentiment Analysis</h3>
                    <p className="text-gray-300 mb-6">
                      Track emotional context and customer satisfaction throughout calls
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <Image
                        src="/images/voicelens/sentiment.svg"
                        alt="Sentiment Analysis Graph"
                        width={400}
                        height={200}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Features Continued */}
              <div className="space-y-8">
                {/* Feature 3 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    03
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Custom Entity Recognition</h3>
                    <p className="text-gray-300 mb-6">
                      Identify and extract business-specific information and metrics
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <Image
                        src="/images/voicelens/entity.svg"
                        alt="Entity Recognition Example"
                        width={400}
                        height={200}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <div className="text-[80px] font-bold text-purple-500/20 absolute -mt-12 -ml-4">
                    04
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Compliance Monitoring</h3>
                    <p className="text-gray-300 mb-6">
                      Ensure adherence to scripts and regulatory requirements
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <Image
                        src="/images/voicelens/compliance.svg"
                        alt="Compliance Dashboard"
                        width={400}
                        height={200}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include core VoiceLens features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-[#0f172a] rounded-2xl p-8 border border-purple-500/30">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
                <p className="text-gray-400">Perfect for individuals and small projects</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">1,000 minutes/month</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">4 AI Metrics</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">Basic support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-[#0f172a] rounded-2xl p-8 relative border-2 border-purple-500">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Business</h3>
                <p className="text-gray-400">Ideal for growing businesses</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">5,000 minutes/month</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">All AI Metrics</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">Custom metrics training</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#0f172a] rounded-2xl p-8 border border-purple-500/30">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                <p className="text-gray-400">For large-scale deployments</p>
              </div>
              <div className="mb-8">
                <span className="text-2xl font-bold text-white">Custom pricing</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">Unlimited minutes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">Custom AI Metrics</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">SLA guarantee</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white">On-premises deployment</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-[#1e293b] hover:bg-[#334155] rounded-lg font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 