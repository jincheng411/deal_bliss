import React, { useState, useMemo, useCallback } from 'react';
import DealCard from './DealCard';
import { Deal, SortOption } from '../../types';

interface DealGridProps {
  deals: Deal[];
  title?: string;
}

const DealGrid: React.FC<DealGridProps> = ({ deals, title }) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Memoize the sorting function to avoid recreating it on every render
  const sortDeals = useCallback(
    (dealsToSort: Deal[], option: SortOption): Deal[] => {
      switch (option) {
        case 'featured':
          return [...dealsToSort].sort((a, b) =>
            a.featured === b.featured ? 0 : a.featured ? -1 : 1
          );
        case 'newest':
          return [...dealsToSort].sort((a, b) => b.id.localeCompare(a.id));
        case 'price-low-high':
          return [...dealsToSort].sort((a, b) => a.salePrice - b.salePrice);
        case 'price-high-low':
          return [...dealsToSort].sort((a, b) => b.salePrice - a.salePrice);
        case 'biggest-discount':
          return [...dealsToSort].sort(
            (a, b) => b.discountPercentage - a.discountPercentage
          );
        default:
          return dealsToSort;
      }
    },
    []
  );

  // Memoize sorted deals to avoid recalculation on every render
  const sortedDeals = useMemo(() => {
    return sortDeals(deals, sortBy);
  }, [deals, sortBy, sortDeals]);

  // Memoize the sort handler to avoid recreating it on every render
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as SortOption);
    },
    []
  );

  return (
    <section id="deals" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{title}</h2>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <p className="text-gray-600 mb-4 sm:mb-0">
            Showing {deals.length} deals
          </p>

          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-lg border border-gray-300 py-1.5 px-3 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="biggest-discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealGrid;
