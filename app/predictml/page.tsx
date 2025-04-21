'use client';

import React from 'react';
import ProductNav from '../components/ProductNav';
import AnimatedHospitalAppointments from '../components/AnimatedHospitalAppointments';

export default function PredictMLPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <ProductNav />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              PredictML
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
              Build highly accurate ML-based prediction models for various enterprise use cases
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Get Started
              </button>
              <button className="border border-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-600/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
        <AnimatedHospitalAppointments />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Powerful ML Prediction Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/predictml/accuracy.svg" alt="Accuracy" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">High Accuracy</h3>
              <p className="text-gray-400">
                Achieve up to 89.526% accuracy in predictions across various use cases
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/predictml/usecase.svg" alt="Use Cases" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Multiple Use Cases</h3>
              <p className="text-gray-400">
                From appointment show/no-show to fraud detection and inventory optimization
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <img src="/images/predictml/config.svg" alt="Configuration" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Plug & Play</h3>
              <p className="text-gray-400">
                Highly configurable solution that integrates seamlessly with your existing systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Enterprise Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Appointments & Bookings</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• Predict show/no-show for appointments</li>
                <li>• Optimize booking schedules</li>
                <li>• Reduce revenue loss from no-shows</li>
              </ul>
            </div>
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Customer Analytics</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• Identify high-value customers</li>
                <li>• Predict purchase propensity</li>
                <li>• Churn prediction and prevention</li>
              </ul>
            </div>
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Financial Metrics</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• Sales forecasting</li>
                <li>• Revenue prediction</li>
                <li>• Fraud detection</li>
              </ul>
            </div>
            <div className="bg-black p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Inventory Management</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• Optimize stock levels</li>
                <li>• Predict demand patterns</li>
                <li>• Reduce carrying costs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/pragyaa_transparent_hor.png" 
                alt="PredictML Logo" 
                className="h-8 object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#privacy" className="hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center">
              ©2025 Voxot Solutions Pvt Ltd. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 