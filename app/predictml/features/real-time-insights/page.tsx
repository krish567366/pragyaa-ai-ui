'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function RealTimeInsightsPage() {
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
                  Real-Time Insights
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Make data-driven decisions faster with instant predictions and analytics
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl"
            >
              {[
                { number: "100ms", label: "Response Time" },
                { number: "99.9%", label: "Uptime" },
                { number: "1M+", label: "Daily Predictions" }
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

      {/* Features Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Live Analytics",
                description: "Monitor and analyze data in real-time with sub-second latency",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Instant Alerts",
                description: "Get immediate notifications when key metrics change",
                icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              },
              {
                title: "Dashboard Views",
                description: "Customizable dashboards for your specific needs",
                icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            ].map((feature, index) => (
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-black/50 rounded-xl p-8 border border-purple-500/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Live Performance Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: "API Response Time", value: "89ms", change: "+2%" },
                      { label: "Prediction Accuracy", value: "98.5%", change: "+0.5%" },
                      { label: "Active Users", value: "1,234", change: "+12%" }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">{metric.label}</span>
                        <div className="flex items-center">
                          <span className="text-white font-medium mr-2">{metric.value}</span>
                          <span className="text-green-400 text-sm">{metric.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden">
                  {/* Placeholder for live chart/visualization */}
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready for Real-Time Decision Making?
            </h2>
            <p className="text-gray-400 mb-8">
              Join companies making faster, data-driven decisions with our real-time analytics.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}