'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function ReduceNoShowsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <ProductNav />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Reduce No-Show Rates
              </h1>
              <p className="text-xl text-gray-300">
                Maximize appointment attendance and minimize revenue loss with predictive analytics
              </p>
            </motion.div>

            {/* Key Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                { number: '45%', label: 'Average Reduction in No-Shows' },
                { number: '32%', label: 'Revenue Increase' },
                { number: '89%', label: 'Prediction Accuracy' }
              ].map((stat, index) => (
                <div key={index} className="bg-black p-6 rounded-xl text-center">
                  <h3 className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* How It Works */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
                <div className="space-y-4 text-gray-300">
                  <p>PredictML analyzes historical appointment data along with multiple factors including:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Patient demographics and history</li>
                    <li>Appointment time and day of week</li>
                    <li>Weather conditions</li>
                    <li>Travel distance</li>
                    <li>Previous cancellation patterns</li>
                  </ul>
                </div>
              </motion.section>

              {/* Key Benefits */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Proactive Intervention',
                      description: 'Identify high-risk appointments and take preventive action'
                    },
                    {
                      title: 'Resource Optimization',
                      description: 'Better staff scheduling and resource allocation'
                    },
                    {
                      title: 'Revenue Protection',
                      description: 'Minimize losses from missed appointments'
                    },
                    {
                      title: 'Patient Experience',
                      description: 'Improved scheduling and reminder systems'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Implementation Steps */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-black p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Implementation Process</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: '1',
                      title: 'Data Integration',
                      description: 'Connect your appointment system with PredictML'
                    },
                    {
                      step: '2',
                      title: 'Model Training',
                      description: 'AI learns from your historical data patterns'
                    },
                    {
                      step: '3',
                      title: 'Prediction Setup',
                      description: 'Configure real-time prediction triggers'
                    },
                    {
                      step: '4',
                      title: 'Action Integration',
                      description: 'Implement automated interventions based on predictions'
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-purple-400">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-center"
            >
              <Link 
                href="/predictml/trial"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Reducing No-Shows Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}