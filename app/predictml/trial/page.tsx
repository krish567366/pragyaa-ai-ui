'use client';

import React from 'react';
import Link from 'next/link';
import ProductNav from '../../components/ProductNav';
import { motion } from 'framer-motion';

export default function PredictMLTrial() {
  return (
    <main className="min-h-screen bg-gray-900">
      <ProductNav />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Try PredictML
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Experience the power of machine learning predictions with our interactive demo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trial Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Start Your Free Trial</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-400 mb-2">
                  Primary Use Case
                </label>
                <select
                  id="useCase"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select a use case</option>
                  <option value="appointments">Appointments & Bookings</option>
                  <option value="retail">Retail Analytics</option>
                  <option value="finance">Financial Predictions</option>
                  <option value="inventory">Inventory Management</option>
                </select>
              </div>
              <div>
                <label htmlFor="dataSize" className="block text-sm font-medium text-gray-400 mb-2">
                  Estimated Monthly Predictions
                </label>
                <input
                  type="number"
                  id="dataSize"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., 1000"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Free Trial
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            What You'll Get in the Trial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-900 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Full API Access</h3>
              <p className="text-gray-400">Test our prediction API with your own data</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Dashboard Access</h3>
              <p className="text-gray-400">Monitor predictions and analytics in real-time</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Technical Support</h3>
              <p className="text-gray-400">Get help from our ML experts during setup</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}