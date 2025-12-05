'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../../components/ProductNav';

export default function RevenuePredictabilityPage() {
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
                  Revenue Predictability
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your business with accurate revenue forecasting powered by machine learning
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl"
            >
              {[
                { number: "95%", label: "Forecast Accuracy" },
                { number: "30%", label: "Revenue Growth" },
                { number: "60%", label: "Time Saved" }
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

      {/* Benefits Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Key Benefits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Advanced Forecasting",
                description: "Leverage ML algorithms to predict revenue with up to 95% accuracy",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              },
              {
                title: "Pattern Recognition",
                description: "Identify revenue trends and patterns automatically",
                icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              },
              {
                title: "Real-time Updates",
                description: "Get instant updates as market conditions change",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              }
            ].map((benefit, index) => (
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-black/50 rounded-xl p-8 border border-purple-500/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Success Story: TechCorp</h3>
                <p className="text-gray-400 mb-6">
                  "PredictML's revenue forecasting has transformed our business planning. We've seen a 30% improvement in forecast accuracy and significant cost savings."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">95%</div>
                    <div className="text-gray-500">Forecast Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">$2.5M</div>
                    <div className="text-gray-500">Cost Savings</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <img 
                  src="/images/case-study-graph.png" 
                  alt="Results Graph" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Revenue Forecasting?
            </h2>
            <p className="text-gray-400 mb-8">
              Join leading companies using PredictML to achieve unprecedented accuracy in revenue predictions.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}