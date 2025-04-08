import type { FC } from 'react';
import Image from 'next/image';
import ProductNav from '../components/ProductNav';
import AnimatedPragyaaRocket from '../components/AnimatedPragyaaRocket';

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
              <div className="text-coral-400 mb-4 font-medium">Imagine the possibilities</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Transform voice data into{' '}
                <span className="bg-gradient-to-r from-purple-400 to-coral-400 bg-clip-text text-transparent">
                  actionable insights
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                VoiceLens uses advanced AI to analyze voice conversations, providing deep insights and metrics that drive business decisions.
              </p>
              <button className="bg-gradient-to-r from-purple-400 to-coral-400 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-purple-500 hover:to-coral-500 transition-all duration-300 shadow-lg">
                Try VoiceLens
              </button>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-coral-400/20 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <AnimatedPragyaaRocket />
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
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            3 variants
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">VoiceLens OneView</h3>
              <p className="text-gray-300">Comprehensive single-view analytics dashboard for quick insights and overview of all metrics.</p>
            </div>
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">VoiceLens Live</h3>
              <p className="text-gray-300">Real-time analytics and monitoring for ongoing calls with instant feedback.</p>
            </div>
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Voice Analytics that work for you
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Features List */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Evaluate for your specific set of metrics for customer interaction</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Evaluate for Product offered vs customer profile data points like Salary, Corporate, Age</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Evaluate for documented product features vs features offered</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Evaluate for Disposition: Next action for customer as per the call vs Agent entry in CRM</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Evaluate for your set of Soft Skills: Empathy, Politeness, Listening to customer and more</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <p className="text-gray-300">Build and deploy any other custom metrics on the fly</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Metrics Visualization */}
              <div className="grid gap-6">
                <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <Image
                    src="/images/voicelens/metrics-1.png"
                    alt="Call Metrics Visualization"
                    width={500}
                    height={300}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <Image
                    src="/images/voicelens/metrics-2.png"
                    alt="Performance Metrics"
                    width={500}
                    height={300}
                    className="w-full rounded-lg"
                  />
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Uses Generative AI for call summarization, identify reasons, sentiments, custom entities
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* AI Features */}
              <div className="space-y-6">
                <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <h3 className="text-2xl font-bold mb-6 text-purple-300">Key AI Capabilities</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <div>
                        <h4 className="font-semibold mb-1 text-purple-200">Smart Call Summarization</h4>
                        <p className="text-gray-300">Automatically generate concise, actionable call summaries</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <div>
                        <h4 className="font-semibold mb-1 text-purple-200">Sentiment Analysis</h4>
                        <p className="text-gray-300">Track emotional context and customer satisfaction throughout calls</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <div>
                        <h4 className="font-semibold mb-1 text-purple-200">Custom Entity Recognition</h4>
                        <p className="text-gray-300">Identify and extract business-specific information and metrics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400">→</span>
                      <div>
                        <h4 className="font-semibold mb-1 text-purple-200">Compliance Monitoring</h4>
                        <p className="text-gray-300">Ensure adherence to scripts and regulatory requirements</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* AI Visualizations */}
              <div className="grid gap-6">
                <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <Image
                    src="/images/voicelens/ai-analysis.png"
                    alt="AI Analysis Dashboard"
                    width={500}
                    height={300}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <Image
                    src="/images/voicelens/sentiment-analysis.png"
                    alt="Sentiment Analysis"
                    width={500}
                    height={300}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 