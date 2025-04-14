"use client";
import { Suspense, useState } from "react";
import { App } from "./components/App";
import Intelligence from "./components/Intelligence";
import { stsConfig } from "./lib/constants";
import {
  isConversationMessage,
  useVoiceBot,
} from "./context/VoiceBotContextProvider";
import { VoiceBotStatus } from './types/voicebot';
import { CaretIcon } from "./components/icons/CaretIcon";
import { withBasePath } from "./utils/deepgramUtils";
import PromptSuggestions from "./components/PromptSuggestions";
import Conversation from "./components/Conversation";
import VoiceSelector from "./components/VoiceSelector/VoiceSelector";
import { isMobile } from "react-device-detect";
import { PopupButton } from "./components/PopupButton";
import MobileMenu from "./components/MobileMenu";
import Latency from "./components/Latency";
import { PencilIcon } from "./components/icons/PencilIcon";
import InstructionInput from "./components/InstructionInput";
import Header from "./components/Header";
import { useStsQueryParams } from "./hooks/UseStsQueryParams";
import { useDeepgram } from "./context/DeepgramContextProvider";
import LandingSections from "./components/LandingSections";
import UseCaseButtons from "./components/UseCaseButtons";
import ProductNav from './components/ProductNav';
import Link from 'next/link';
import LogoLink from './components/LogoLink';
import AnimatedBackground from './components/AnimatedBackground.js';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <ProductNav />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white">
              Pragyaa <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
              Advanced AI solutions for voice interactions, analytics, and predictive intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#products" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Explore Products
              </Link>
              <Link href="#contact" className="border border-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-600/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Our AI Solutions
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
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Why Choose Pragyaa AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">High Performance</h3>
              <p className="text-gray-400">
                Our AI solutions deliver exceptional accuracy and performance across all applications
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Enterprise Security</h3>
              <p className="text-gray-400">
                Bank-grade security protocols protect your data and maintain customer privacy
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Seamless Integration</h3>
              <p className="text-gray-400">
                Easily integrate with your existing systems with our robust APIs and SDKs
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Customer Support</h3>
              <p className="text-gray-400">
                24/7 dedicated support team to help you implement and optimize our solutions
              </p>
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
                      <p className="text-white">contact@pragyaa.ai</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-400">Address</p>
                      <p className="text-white">123 AI Boulevard, Tech City, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Schedule a Demo</h3>
                <p className="text-gray-400 mb-6">
                  Interested in seeing our products in action? Schedule a personalized demo with our team.
                </p>
                <Link href="#" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block">
                  Book a Demo
                </Link>
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
