'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function RevenuePredictabilityPage() {
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
                Increase Revenue Predictability
              </h1>
              <p className="text-xl text-gray-300">
                Enhance financial planning with ML-powered revenue forecasting
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
                { number: '95%', label: 'Forecast Accuracy' },
                { number: '28%', label: 'Revenue Growth' },
                { number: '60%', label: 'Planning Time Saved' }
              ].map((stat, index) => (
                <div key={index} className="bg-black p-6 rounded-xl text-center">
                  <h3 className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Main Content */}
            <div className="space-y-12">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Advanced Forecasting</h2>
                <div className="bg-gray-800 rounded-xl p-8">
                  <p className="text-gray-300 mb-6">
                    Our machine learning models analyze multiple data points to provide accurate revenue predictions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Historical Data Analysis</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Past appointment patterns</li>
                        <li>• Seasonal variations</li>
                        <li>• Payment trends</li>
                        <li>• Service utilization rates</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Real-time Factors</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Current booking rates</li>
                        <li>• Patient demographics</li>
                        <li>• Market conditions</li>
                        <li>• Service pricing updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Financial Planning</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Accurate cash flow predictions</li>
                      <li>• Better budgeting decisions</li>
                      <li>• Investment planning</li>
                      <li>• Risk management</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Business Growth</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Identify growth opportunities</li>
                      <li>• Optimize service pricing</li>
                      <li>• Resource allocation</li>
                      <li>• Market expansion planning</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Implementation</h2>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Getting started with revenue prediction is simple:
                  </p>
                  <ol className="list-decimal text-gray-300 pl-6 space-y-4">
                    <li>Connect your financial and appointment data</li>
                    <li>Configure your reporting preferences</li>
                    <li>Start receiving revenue forecasts</li>
                    <li>Access detailed analytics and insights</li>
                  </ol>
                  <div className="mt-8">
                    <Link 
                      href="/contact"
                      className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Schedule a Demo
                    </Link>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}