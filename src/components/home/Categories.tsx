import React from 'react';
import { Category } from '../../types';
import { Link } from '../ui/Link';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  // Icon mapping for categories - using simple emoji for now
  // In a real app, you'd use proper icons for each category
  const getCategoryIcon = (slug: string) => {
    const icons: Record<string, string> = {
      'electronics': '🔌',
      'home-kitchen': '🏠',
      'fashion': '👕',
      'beauty': '💄',
      'sports-outdoors': '⚽',
      'toys-games': '🎮',
    };
    
    return icons[slug] || '🏷️';
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-900">Browse Categories</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find the best deals in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`} 
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 hover:bg-coral-50 hover:-translate-y-1 group"
            >
              <span className="text-4xl mb-4 transition-transform group-hover:scale-110 duration-300">
                {getCategoryIcon(category.slug)}
              </span>
              <span className="text-navy-800 font-medium group-hover:text-coral-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;