'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function IntegrationPage() {
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
                Plug-and-Play Integration
              </h1>
              <p className="text-xl text-gray-300">
                Seamlessly connect PredictML with your existing systems
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
                { number: '<1hr', label: 'Average Setup Time' },
                { number: '50+', label: 'Supported Platforms' },
                { number: '100%', label: 'API Coverage' }
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
                <h2 className="text-3xl font-bold text-white mb-6">Integration Features</h2>
                <div className="bg-gray-800 rounded-xl p-8">
                  <p className="text-gray-300 mb-6">
                    Our flexible integration options make it easy to connect with your systems:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">API Integration</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• RESTful API endpoints</li>
                        <li>• Webhook support</li>
                        <li>• Real-time data sync</li>
                        <li>• Secure authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Data Connectors</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Pre-built connectors</li>
                        <li>• Custom adapters</li>
                        <li>• Batch processing</li>
                        <li>• Data transformation</li>
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
                <h2 className="text-3xl font-bold text-white mb-6">Supported Systems</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Healthcare Systems</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Electronic Health Records</li>
                      <li>• Practice Management</li>
                      <li>• Scheduling Systems</li>
                      <li>• Billing Solutions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Business Tools</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• CRM Platforms</li>
                      <li>• Analytics Tools</li>
                      <li>• Communication Systems</li>
                      <li>• Payment Processors</li>
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
                <h2 className="text-3xl font-bold text-white mb-6">Integration Process</h2>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Get started with our simple integration process:
                  </p>
                  <ol className="list-decimal text-gray-300 pl-6 space-y-4">
                    <li>Choose your integration method</li>
                    <li>Configure data mapping</li>
                    <li>Test the connection</li>
                    <li>Go live with support</li>
                  </ol>
                  <div className="mt-8">
                    <Link 
                      href="/contact"
                      className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Start Integration
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