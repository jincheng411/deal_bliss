import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../ui/Link';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 opacity-95"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Discover Amazing Deals <span className="text-coral-500">Every Day</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg mx-auto md:mx-0">
              The smartest way to save on your favorite products. We find the best discounts so you don't have to.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="#deals"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-coral-500 hover:bg-coral-600 transition-colors"
              >
                Browse Deals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                View Categories
              </Link>
            </div>
          </div>

          {/* Animated deals showcase */}
          <div className="relative h-80 md:h-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-coral-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-white rounded-2xl shadow-xl p-4 transform transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Featured deal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="inline-block bg-coral-500 text-white text-xs font-bold rounded-full px-2 py-1 mb-1">
                      -24%
                    </div>
                    <h3 className="text-navy-900 font-medium">AirPods Pro</h3>
                    <p className="text-sm text-gray-600">
                      <span className="line-through">$249.99</span>{" "}
                      <span className="text-coral-500 font-bold">$189.99</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-4 transform transition-transform hover:-translate-y-1 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="inline-block bg-coral-500 text-white text-xs font-bold rounded-full px-2 py-1 mb-1">
                  -42%
                </div>
                <h3 className="text-navy-900 font-medium text-sm">Ninja Air Fryer</h3>
                <p className="text-sm text-gray-600">
                  <span className="line-through">$119.99</span>{" "}
                  <span className="text-coral-500 font-bold">$69.99</span>
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-4 transform transition-transform hover:-translate-y-1 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="inline-block bg-coral-500 text-white text-xs font-bold rounded-full px-2 py-1 mb-1">
                  -35%
                </div>
                <h3 className="text-navy-900 font-medium text-sm">Samsung Tablet</h3>
                <p className="text-sm text-gray-600">
                  <span className="line-through">$229.99</span>{" "}
                  <span className="text-coral-500 font-bold">$149.99</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;