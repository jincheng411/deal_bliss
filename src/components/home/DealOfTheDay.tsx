import React from 'react';
import { Deal } from '../../types';
import { Clock, Check, ShoppingBag } from 'lucide-react';
import { Link } from '../ui/Link';

interface DealOfTheDayProps {
  deal: Deal;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ deal }) => {
  const savings = deal.originalPrice - deal.salePrice;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium text-sm mb-2">
            <Clock className="h-4 w-4 mr-1" />
            Limited Time Offer
          </span>
          <h2 className="text-3xl font-bold text-navy-900">Deal of the Day</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Column */}
            <div className="h-64 md:h-auto">
              <img 
                src={deal.imageUrl} 
                alt={deal.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Column */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-coral-500 text-white font-bold rounded-full px-3 py-1.5 text-sm">
                  {deal.discountPercentage}% OFF
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-navy-900 mb-3">{deal.title}</h3>
              
              <p className="text-gray-600 mb-6">
                {deal.description}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="mr-6">
                  <span className="line-through text-gray-500 text-lg">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                  <div className="text-coral-600 font-bold text-3xl">
                    ${deal.salePrice.toFixed(2)}
                  </div>
                </div>
                
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                  Save ${savings.toFixed(2)}
                </div>
              </div>
              
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free shipping available</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Limited time offer - while supplies last</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Verified deal - price checked today</span>
                </li>
              </ul>
              
              <Link
                href={deal.url}
                className="mt-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-navy-800 hover:bg-navy-700 transition-colors w-full sm:w-auto"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Get This Deal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;