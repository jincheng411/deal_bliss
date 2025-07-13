import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Tag } from 'lucide-react';
import { Link } from '../ui/Link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Tag className="h-8 w-8 text-coral-500 mr-2" />
              <span className="text-2xl font-bold">DealsFind</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the best deals and discounts from your favorite brands. Updated daily with the hottest offers.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-coral-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-coral-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-coral-500 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-coral-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-coral-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/electronics" className="text-gray-400 hover:text-coral-500 transition-colors">Electronics</Link></li>
              <li><Link href="/category/home-kitchen" className="text-gray-400 hover:text-coral-500 transition-colors">Home & Kitchen</Link></li>
              <li><Link href="/category/fashion" className="text-gray-400 hover:text-coral-500 transition-colors">Fashion</Link></li>
              <li><Link href="/category/beauty" className="text-gray-400 hover:text-coral-500 transition-colors">Beauty</Link></li>
              <li><Link href="/category/sports-outdoors" className="text-gray-400 hover:text-coral-500 transition-colors">Sports & Outdoors</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Never Miss a Deal</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter and be the first to know about exclusive deals.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              <button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DealsFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;