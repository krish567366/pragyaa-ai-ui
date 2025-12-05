'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function IntegrationPage() {
  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-purple-900/20">
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] -top-20 -left-20 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-20 -right-20 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Plug-and-Play Integration
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Seamlessly connect PredictML with your existing systems in minutes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl"
            >
              {[
                { number: "5min", label: "Setup Time" },
                { number: "50+", label: "Integrations" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Multiple Integration Options
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "REST API",
                description: "Simple REST API with comprehensive documentation",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              },
              {
                title: "SDK Support",
                description: "Native SDKs for major programming languages",
                icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              },
              {
                title: "Webhooks",
                description: "Real-time event notifications via webhooks",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gray-900 p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{option.title}</h3>
                <p className="text-gray-400">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">Quick Start Example</h3>
            <div className="bg-black rounded-xl p-6 font-mono text-sm">
              <pre className="text-gray-300">
{`// Initialize PredictML client
const predictML = new PredictML({
  apiKey: 'your-api-key'
});

// Make a prediction
const result = await predictML.predict({
  model: 'revenue-forecast',
  data: {
    historical_data: [...],
    parameters: {...}
  }
});

console.log(result.prediction);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Integration Steps</h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Get API Keys",
                  description: "Sign up and get your API keys from the dashboard"
                },
                {
                  step: "2",
                  title: "Choose Integration Method",
                  description: "Select from REST API, SDK, or Webhooks"
                },
                {
                  step: "3",
                  title: "Configure Settings",
                  description: "Set up your integration parameters"
                },
                {
                  step: "4",
                  title: "Test Integration",
                  description: "Verify connection with test endpoints"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-gray-900 p-6 rounded-xl"
                >
                  <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Integrate?
            </h2>
            <p className="text-gray-400 mb-8">
              Start integrating PredictML into your applications in minutes.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}