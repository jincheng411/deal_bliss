import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Deal } from '../../types';
import DealCard from '../deals/DealCard';
import { Link } from '../ui/Link';

interface FeaturedDealsProps {
  deals: Deal[];
}

const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ deals }) => {
  const featuredDeals = deals.filter(deal => deal.featured).slice(0, 4);
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Featured Deals</h2>
            <p className="mt-2 text-gray-600">
              Hand-picked offers with the biggest discounts
            </p>
          </div>
          
          <Link
            href="/deals/featured"
            className="mt-4 md:mt-0 inline-flex items-center text-coral-600 hover:text-coral-700 font-medium"
          >
            View all featured deals
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;