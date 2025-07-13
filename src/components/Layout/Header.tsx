import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ShoppingBag, Tag } from 'lucide-react';
import { Link } from '../ui/Link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Home & Kitchen', href: '/category/home-kitchen' },
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Top Deals', href: '/top-deals' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Tag className="h-8 w-8 text-coral-500 mr-2" />
              <span className="text-2xl font-bold text-navy-900">
                DealBliss
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-navy-700 hover:text-coral-500 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for deals..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 focus:outline-none w-64 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Link
              href="/cart"
              className="ml-4 text-navy-700 hover:text-coral-500"
            >
              <ShoppingBag className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-navy-700" />
            ) : (
              <Menu className="h-6 w-6 text-navy-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="flex items-center">
            <Tag className="h-8 w-8 text-coral-500 mr-2" />
            <span className="text-2xl font-bold text-navy-900">DealsFind</span>
          </Link>
          <button onClick={toggleMenu} aria-label="Close menu">
            <X className="h-6 w-6 text-navy-700" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for deals..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg text-navy-700 hover:text-coral-500 font-medium transition-colors py-2 px-4 -mx-4 hover:bg-gray-50 rounded-lg"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="flex items-center text-lg text-navy-700 hover:text-coral-500 font-medium transition-colors py-2 px-4 -mx-4 hover:bg-gray-50 rounded-lg"
              onClick={toggleMenu}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
