'use client';

import React from 'react';
import ProductNav from '../../components/ProductNav';
import BenefitCard from '../../components/BenefitCard';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Reduce No-Show Rates',
    description: 'Cut down on missed appointments by up to 45% with our advanced prediction algorithms.',
    icon: '/images/predictml/benefits/no-show.svg',
    link: '/predictml/benefits/reduce-no-shows'
  },
  {
    title: 'Increase Revenue Predictability',
    description: 'Achieve more accurate revenue forecasting with ML-powered insights.',
    icon: '/images/predictml/benefits/revenue.svg',
    link: '/predictml/benefits/revenue-predictability'
  },
  {
    title: 'Smarter Resource Allocation',
    description: 'Optimize staff scheduling and resource management with predictive analytics.',
    icon: '/images/predictml/benefits/resource.svg',
    link: '/predictml/benefits/resource-allocation'
  },
  {
    title: 'Real-Time Insights',
    description: 'Get instant predictions and analytics to make informed decisions faster.',
    icon: '/images/predictml/benefits/insights.svg',
    link: '/predictml/benefits/real-time-insights'
  },
  {
    title: 'Plug-and-Play Integration',
    description: 'Seamlessly integrate with your existing systems with minimal setup time.',
    icon: '/images/predictml/benefits/integration.svg',
    link: '/predictml/benefits/integration'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PredictMLBenefits() {
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
              PredictML Benefits
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Discover how PredictML can transform your business with powerful machine learning capabilities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ML Flow Diagram */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            How PredictML Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
            {['Data Collection', 'Model Training', 'Prediction API', 'Dashboard Insights'].map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-purple-400">{index + 1}</span>
                  </div>
                  <p className="text-white text-center">{step}</p>
                </motion.div>
                {index < 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="hidden md:block w-12 h-0.5 bg-purple-600/40"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}