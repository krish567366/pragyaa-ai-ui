"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ProductNav from '../components/ProductNav'; // Assuming you want the same nav

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  requirements: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSubmissionMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionMessage(result.message || "Thanks for reaching out! We've received your details and are already mentally high-fiving your future success. We'll be in touch faster than a caffeinated cheetah!");
        setFormData({ name: '', email: '', company: '', phone: '', requirements: '' });
      } else {
        setError(result.error || 'An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection and try again.');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <ProductNav />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Get in Touch
        </h1>

        {submissionMessage ? (
          <div className="text-center p-8 bg-gray-800 rounded-xl max-w-2xl mx-auto">
            <p className="text-xl text-green-400">{submissionMessage}</p>
            <button 
              onClick={() => router.push('/')} 
              className="mt-8 py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-900 p-8 md:p-12 rounded-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-1">Brief Summary of Requirements</label>
              <textarea name="requirements" id="requirements" value={formData.requirements} onChange={handleChange} rows={5} required className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:ring-purple-500 focus:border-purple-500"></textarea>
            </div>
            
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
} 