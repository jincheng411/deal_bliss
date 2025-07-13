import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DealGrid from '../components/deals/DealGrid';
import { Deal, Category } from '../types';
import { fetchDealsByCategory, fetchCategories } from '../services/api';

const CategoryDealsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize current category to avoid recalculation
  const currentCategory = useMemo(() => {
    if (!category || categories.length === 0) return null;
    return categories.find(
      (cat) => cat.slug.toLowerCase() === category.toLowerCase()
    );
  }, [categories, category]);

  const loadData = useCallback(async () => {
    if (!category) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch both deals by category and categories
      const [dealsData, categoriesData] = await Promise.all([
        fetchDealsByCategory(category),
        fetchCategories(),
      ]);

      setDeals(dealsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load deals. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true;

    const loadDataSafely = async () => {
      await loadData();
      // Only update state if component is still mounted
      if (!isMounted) return;
    };

    loadDataSafely();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-navy-900 mb-2">
            Category Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The category "{category}" doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      {/* Deals Grid */}
      {deals.length > 0 ? (
        <DealGrid deals={deals} title={`${currentCategory?.name} Deals`} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              No Deals Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any deals in the "{currentCategory?.name}"
              category.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
            >
              Browse All Deals
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDealsPage;
