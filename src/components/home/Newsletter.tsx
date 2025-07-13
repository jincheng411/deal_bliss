import React, { useState, useEffect, useRef } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd submit to an API
    setIsSubmitted(true);
    setEmail('');

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset success message after 5 seconds
    timeoutRef.current = window.setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Never Miss a Deal</h2>
          <p className="mt-4 text-lg text-gray-300">
            Subscribe to our newsletter and get the best deals delivered to your
            inbox daily.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:flex max-w-lg mx-auto"
          >
            <div className="min-w-0 flex-1 relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-l-lg bg-white text-navy-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                type="submit"
                className="block w-full rounded-r-lg bg-coral-500 hover:bg-coral-600 py-3 px-6 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-coral-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>

          {isSubmitted && (
            <div className="mt-4 flex items-center justify-center text-green-400">
              <Check className="h-5 w-5 mr-2" />
              <span>Thanks for subscribing!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
