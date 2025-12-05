'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function BenefitCard({ title, description, icon, link }: BenefitCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900 p-8 rounded-xl border border-purple-600/20 hover:border-purple-600/40 transition-colors"
    >
      <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
        <img src={icon} alt={title} className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <Link 
        href={link}
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
      >
        Learn More
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </motion.div>
  );
}