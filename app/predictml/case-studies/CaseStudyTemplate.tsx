'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../../components/ProductNav';

type CaseStudyProps = {
  title: string;
  description: string;
  useCase: string;
  methodology: string;
  dataRequired: string[];
  timeline: string;
  goLive: string;
};

const CaseStudyTemplate: React.FC<CaseStudyProps> = ({
  title,
  description,
  useCase,
  methodology,
  dataRequired,
  timeline,
  goLive,
}) => {
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
            <Link href="/predictml" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
              ← Back to PredictML
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Use Case Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Prediction Use Case</h2>
              <div className="prose prose-invert max-w-none">
                {useCase}
              </div>
            </motion.div>

            {/* Methodology Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Methodology</h2>
              <div className="prose prose-invert max-w-none">
                {methodology}
              </div>
            </motion.div>

            {/* Data Required Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Data Required</h2>
              <ul className="space-y-4">
                {dataRequired.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Implementation Timeline</h2>
              <div className="prose prose-invert max-w-none">
                {timeline}
              </div>
            </motion.div>

            {/* Go Live Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Go Live Process</h2>
              <div className="prose prose-invert max-w-none">
                {goLive}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-12"
            >
              <Link 
                href="/contact"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Your Implementation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyTemplate;