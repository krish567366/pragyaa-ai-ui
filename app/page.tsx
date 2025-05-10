"use client";

import Link from 'next/link';
import ProductNav from './components/ProductNav';
import AnimatedLogo from './components/AnimatedLogo';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    if (showCalendly) {
      const calendlyContainer = document.getElementById('calendly-inline-widget');
      if (calendlyContainer && (window as any).Calendly) {
        calendlyContainer.innerHTML = '';
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/pragyaa-info/30min',
          parentElement: calendlyContainer,
          prefill: {},
          utm: {}
        });
      }
    }
  }, [showCalendly]);

  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Voice</span> is the New UI. <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Gen AI</span> is the New OS.
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-8 leading-snug">
                Welcome to the Future of Enterprise AI
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link href="#products" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Explore Products
                </Link>
                <Link href="#contact" className="border border-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-600/10 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Right Logo */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <AnimatedLogo />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Our AI Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* VoiceAgent */}
            <div className="bg-black/80 p-8 rounded-xl border border-blue-500/30 transform transition-transform hover:scale-105">
              <div className="h-64 flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">VoiceAgent</h3>
              <p className="text-gray-400 mb-6">
                Intelligent voice assistant that provides natural, human-like conversations powered by advanced AI
              </p>
              <Link href="/VoiceAgent" className="inline-block bg-blue-600/20 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-600/30 transition-colors">
                Try VoiceAgent
              </Link>
            </div>

            {/* VoiceLens */}
            <div className="bg-black/80 p-8 rounded-xl border border-purple-500/30 transform transition-transform hover:scale-105">
              <div className="h-64 flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">VoiceLens</h3>
              <p className="text-gray-400 mb-6">
                Advanced voice analytics platform providing real-time insights from customer interactions
              </p>
              <Link href="/voicelens" className="inline-block bg-purple-600/20 text-purple-400 px-6 py-2 rounded-lg hover:bg-purple-600/30 transition-colors">
                Explore VoiceLens
              </Link>
            </div>

            {/* PredictML */}
            <div className="bg-black/80 p-8 rounded-xl border border-purple-500/30 transform transition-transform hover:scale-105">
              <div className="h-64 flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">PredictML</h3>
              <p className="text-gray-400 mb-6">
                ML-based prediction models for various enterprise use cases with high accuracy
              </p>
              <Link href="/predictml" className="inline-block bg-purple-600/20 text-purple-400 px-6 py-2 rounded-lg hover:bg-purple-600/30 transition-colors">
                Discover PredictML
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Your Enterprise AI Partner
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Point 1 - Expertise */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    01
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Expertise</h3>
                    <p className="text-gray-400">
                      A dedicated team of AI specialists who bring a wealth of experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/enterprise/expertise.png"
                      alt="AI Expertise Team"
                      width={400}
                      height={225}
                      priority
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Point 2 - Innovation */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    02
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Innovation</h3>
                    <p className="text-gray-400">
                      Continuous R&D to stay ahead in AI technology and solutions
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/enterprise/innovation.png"
                      alt="Innovation in AI"
                      width={400}
                      height={225}
                      priority
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Point 3 - Customization */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    03
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Customization</h3>
                    <p className="text-gray-400">
                      Tailored solutions designed to meet your specific enterprise needs
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/enterprise/customization.png"
                      alt="Customized Solutions"
                      width={400}
                      height={225}
                      priority
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Point 4 - Global Reach */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="text-[120px] font-bold text-blue-500/20 absolute -top-10 -left-6">
                    04
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Global Reach</h3>
                    <p className="text-gray-400">
                      Your reliable AI partner, no matter where you are located
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                  <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/enterprise/global-reach.png"
                      alt="Global Reach"
                      width={400}
                      height={225}
                      priority
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Get in Touch
          </h2>
          <div className="max-w-4xl mx-auto bg-black p-8 rounded-xl border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">info@pragyaa.ai</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-400">Global Presence</p>
                      <div className="text-white grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                        <p>New Delhi</p>
                        <p>Bengaluru</p>
                        <p>Dubai</p>
                        <p>London</p>
                        <p>Singapore</p>
                        <p>Dallas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Schedule a Demo</h3>
                <p className="text-gray-400 mb-6">
                  Interested in seeing our products in action? Schedule a personalized demo with our team.
                </p>
                {!showCalendly ? (
                  <button 
                    type="button"
                    onClick={() => setShowCalendly(true)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block"
                  >
                    Book a Demo
                  </button>
                ) : (
                  <div id="calendly-inline-widget" style={{ minWidth: '320px', height: '700px' }}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/pragyaa_transparent_hor.png" 
                alt="Pragyaa AI Logo" 
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
