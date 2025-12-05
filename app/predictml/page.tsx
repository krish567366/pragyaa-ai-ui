'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductNav from '../components/ProductNav';
import AnimatedHospitalAppointments from '../components/AnimatedHospitalAppointments';

export default function PredictMLPage() {
  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      
      {/* Hero Section */}
      <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-purple-900/20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-20 -left-20 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute w-[500px] h-[500px] -bottom-20 -right-20 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/20 rounded-xl backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full backdrop-blur-sm"
        />

        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  PredictML
                </span>
              </h1>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-light">
                  Where <span className="text-purple-400 font-semibold">AI Predictions</span> Meet Reality
                </h2>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed"
            >
              Transform your business with our state-of-the-art ML prediction models. 
              <span className="text-purple-400"> Up to 89% accuracy</span> across diverse enterprise scenarios.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link 
                href="/predictml/login"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Login to Dashboard</span>
              </Link>
              <Link 
                href="/predictml/trial"
                className="group relative px-8 py-4 rounded-xl overflow-hidden border border-purple-500/30"
              >
                <div className="absolute inset-0 bg-purple-500/0 transition-colors duration-300 group-hover:bg-purple-500/20" />
                <span className="relative text-white font-semibold">Start Free Trial</span>
              </Link>
              <Link 
                href="/predictml/benefits"
                className="group relative px-8 py-4 rounded-xl overflow-hidden border border-purple-500/30"
              >
                <div className="absolute inset-0 bg-purple-500/0 transition-colors duration-300 group-hover:bg-purple-500/20" />
                <span className="relative text-white font-semibold">Explore Benefits</span>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl"
            >
              {[
                { number: "89%", label: "Prediction Accuracy" },
                { number: "5M+", label: "Predictions / Month" },
                { number: "45%", label: "Cost Reduction" }
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
        <AnimatedHospitalAppointments />
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of prediction technology with our cutting-edge ML features
            </p>
          </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                title: 'Resource Allocation',
                description: 'Optimize staff scheduling and resource management with predictive analytics',
                gradient: 'from-blue-500 to-purple-500',
                link: '/predictml/features/resource-allocation'
              },
              {
                iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Real-Time Insights',
                description: 'Get instant predictions and analytics to make informed decisions faster',
                gradient: 'from-pink-500 to-rose-500',
                link: '/predictml/features/real-time-insights'
              },
              {
                iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                title: 'Plug-and-Play Integration',
                description: 'Seamlessly integrate with your existing systems with minimal setup time',
                gradient: 'from-purple-500 to-indigo-500',
                link: '/predictml/features/integration'
              }
            ].map((feature, index) => (
              <Link key={index} href={feature.link} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative">
                    <div className="w-16 h-16 mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience a streamlined workflow designed for enterprise success
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  step: '01',
                  title: 'Data Integration',
                  description: 'Connect your enterprise data sources securely. PredictML supports various data formats and sources, ensuring seamless integration with your existing infrastructure.',
                  icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
                },
                {
                  step: '02',
                  title: 'Model Training',
                  description: 'Our advanced AI algorithms analyze your data patterns and train custom models specific to your business needs, ensuring high accuracy and reliability.',
                  icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                },
                {
                  step: '03',
                  title: 'Predictive Analytics',
                  description: 'Get real-time insights and predictions. Our models continuously learn and adapt, providing increasingly accurate forecasts over time.',
                  icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                },
                {
                  step: '04',
                  title: 'Business Integration',
                  description: 'Seamlessly integrate predictions into your business processes through our API or dashboard. Make data-driven decisions with confidence.',
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start gap-8 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-[1px]">
                    <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                      <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl font-bold text-purple-500/30 mr-4">{item.step}</span>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how leading enterprises are transforming their businesses with PredictML
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                company: 'Healthcare No-Shows',
                industry: 'Healthcare',
                metric: '45% Reduction',
                description: 'in missed appointments through predictive analytics',
                gradient: 'from-blue-500 to-purple-500',
                link: '/predictml/case-studies/healthcare-no-shows'
              },
              {
                company: 'HR Attrition',
                industry: 'Human Resources',
                metric: '85% Accuracy',
                description: 'in predicting employee turnover risks',
                gradient: 'from-purple-500 to-pink-500',
                link: '/predictml/case-studies/hr-attrition'
              },
              {
                company: 'Length of Stay',
                industry: 'Healthcare',
                metric: '92% Accuracy',
                description: 'in predicting patient stay duration',
                gradient: 'from-pink-500 to-red-500',
                link: '/predictml/case-studies/length-of-stay'
              },
              {
                company: 'Cost Prediction',
                industry: 'Healthcare',
                metric: '90% Accuracy',
                description: 'in forecasting healthcare treatment costs',
                gradient: 'from-red-500 to-orange-500',
                link: '/predictml/case-studies/cost-prediction'
              },
              {
                company: 'Delayed Arrivals',
                industry: 'Healthcare',
                metric: '88% Accuracy',
                description: 'in predicting patient arrival delays',
                gradient: 'from-orange-500 to-yellow-500',
                link: '/predictml/case-studies/delayed-arrival'
              }
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {study.company}
                      </h3>
                      <p className="text-gray-500">{study.industry}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{study.metric}</h4>
                    <p className="text-gray-400">{study.description}</p>
                  </div>

                  <div className="pt-4">
                    <Link 
                      href={study.link} 
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    >
                      Know More
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Enterprise Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how PredictML transforms businesses across industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Healthcare',
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
                items: [
                  '45% reduction in no-shows',
                  'Smart appointment scheduling',
                  'Resource optimization'
                ],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Retail & E-commerce',
                icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
                items: [
                  'Inventory demand forecasting',
                  'Customer behavior analysis',
                  'Pricing optimization'
                ],
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Financial Services',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                items: [
                  'Fraud detection',
                  'Risk assessment',
                  'Market predictions'
                ],
                gradient: 'from-emerald-500 to-green-500'
              },
              {
                title: 'Supply Chain',
                icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z',
                items: [
                  'Logistics optimization',
                  'Demand forecasting',
                  'Route planning'
                ],
                gradient: 'from-orange-500 to-amber-500'
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className="w-16 h-16 mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={useCase.icon} />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                    {useCase.title}
                  </h3>

                  <ul className="space-y-3">
                    {useCase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                company: 'MediCare Plus',
                type: 'Healthcare Provider',
                image: '/images/testimonials/healthcare.png',
                quote: 'PredictML reduced our no-show rates by 35% and improved resource allocation significantly.',
                metric: '45% Revenue Increase'
              },
              {
                company: 'ShopSmart',
                type: 'Retail Chain',
                image: '/images/testimonials/retail.png',
                quote: 'The inventory prediction model has transformed how we manage our stock levels.',
                metric: '28% Cost Reduction'
              },
              {
                company: 'SecureBank',
                type: 'Financial Services',
                image: '/images/testimonials/finance.png',
                quote: 'PredictML\'s fraud detection capabilities have saved us millions in potential losses.',
                metric: '92% Detection Rate'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={story.image}
                    alt={story.company} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{story.company}</h3>
                    <p className="text-gray-400">{story.type}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{story.quote}</p>
                <p className="text-purple-400">{story.metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ML Flow Diagram */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            How PredictML Works
          </motion.h2>
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
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
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