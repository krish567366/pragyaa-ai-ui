'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function RealTimeInsightsPage() {
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
                Real-Time Insights
              </h1>
              <p className="text-xl text-gray-300">
                Make data-driven decisions faster with instant predictions and analytics
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
                { number: '0.5s', label: 'Average Response Time' },
                { number: '99.9%', label: 'System Uptime' },
                { number: '24/7', label: 'Monitoring & Alerts' }
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
                <h2 className="text-3xl font-bold text-white mb-6">Instant Analytics</h2>
                <div className="bg-gray-800 rounded-xl p-8">
                  <p className="text-gray-300 mb-6">
                    Get immediate insights into your operations with real-time data processing:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Live Monitoring</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Current appointment status</li>
                        <li>• Resource utilization</li>
                        <li>• Patient flow metrics</li>
                        <li>• Staff performance</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Predictive Analytics</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Upcoming no-show risks</li>
                        <li>• Revenue forecasts</li>
                        <li>• Resource needs</li>
                        <li>• Capacity alerts</li>
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
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Interactive Dashboards</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Customizable views</li>
                      <li>• Real-time updates</li>
                      <li>• Data visualization</li>
                      <li>• Performance metrics</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Alert System</h3>
                    <ul className="text-gray-300 space-y-3">
                      <li>• Custom alert thresholds</li>
                      <li>• Multi-channel notifications</li>
                      <li>• Priority-based routing</li>
                      <li>• Automated responses</li>
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
                <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Access real-time insights in four easy steps:
                  </p>
                  <ol className="list-decimal text-gray-300 pl-6 space-y-4">
                    <li>Set up data integration</li>
                    <li>Configure dashboard preferences</li>
                    <li>Customize alert settings</li>
                    <li>Start monitoring in real-time</li>
                  </ol>
                  <div className="mt-8">
                    <Link 
                      href="/contact"
                      className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Request Demo
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