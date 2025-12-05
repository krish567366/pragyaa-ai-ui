'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function ResourceAllocationPage() {
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
                Smarter Resource Allocation
              </h1>
              <p className="text-xl text-gray-300">
                Optimize staff scheduling and resource management with predictive analytics
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
                { number: '35%', label: 'Staff Utilization Improvement' },
                { number: '42%', label: 'Cost Reduction' },
                { number: '98%', label: 'Resource Optimization' }
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
                <h2 className="text-3xl font-bold text-white mb-6">Intelligent Resource Management</h2>
                <div className="bg-gray-800 rounded-xl p-8">
                  <p className="text-gray-300 mb-6">
                    Our AI-powered system optimizes resource allocation through:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Workload Analysis</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Peak hour identification</li>
                        <li>• Staff capacity planning</li>
                        <li>• Demand forecasting</li>
                        <li>• Schedule optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Resource Tracking</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Equipment utilization</li>
                        <li>• Room occupancy rates</li>
                        <li>• Staff availability</li>
                        <li>• Resource distribution</li>
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
                <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Smart Scheduling</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Automated staff rostering</li>
                      <li>• Dynamic schedule adjustments</li>
                      <li>• Skill-based assignment</li>
                      <li>• Leave management</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Resource Planning</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Capacity planning</li>
                      <li>• Resource forecasting</li>
                      <li>• Cost optimization</li>
                      <li>• Performance tracking</li>
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
                <h2 className="text-3xl font-bold text-white mb-6">Implementation Process</h2>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Get started with optimized resource management in four simple steps:
                  </p>
                  <ol className="list-decimal text-gray-300 pl-6 space-y-4">
                    <li>Connect your resource management systems</li>
                    <li>Define resource constraints and rules</li>
                    <li>Set optimization preferences</li>
                    <li>Monitor and adjust based on insights</li>
                  </ol>
                  <div className="mt-8">
                    <Link 
                      href="/contact"
                      className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Get Started Today
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