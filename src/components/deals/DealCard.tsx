import React, { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Deal } from '../../types';
import { Link } from '../ui/Link';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  // Memoize savings calculation
  const savings = useMemo(() => {
    if (!deal) return 0;
    return deal.originalPrice - deal.salePrice;
  }, [deal]);

  // Memoize discount percentage calculation
  const discountPercentage = useMemo(() => {
    if (!deal) return '0';
    return ((savings / deal.originalPrice) * 100).toFixed(0);
  }, [deal, savings]);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Image container with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount badge */}
        <div className="absolute top-4 left-4 bg-coral-500 text-white font-bold px-2.5 py-1.5 rounded-full text-sm">
          -{discountPercentage}%
        </div>

        {/* Deal of the day badge */}
        {deal.dealOfDay && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white font-bold px-2.5 py-1.5 rounded-full text-sm">
            Deal of the Day
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {deal.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-navy-900 mb-2 line-clamp-2">
          {deal.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {deal.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="line-through text-gray-500 text-sm">
              ${deal.originalPrice.toFixed(2)}
            </span>
            <span className="text-coral-600 font-bold text-xl">
              ${deal.salePrice.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/deal/${deal.id}`}
            className="bg-navy-800 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-navy-700 transition-colors"
          >
            View Deal
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
