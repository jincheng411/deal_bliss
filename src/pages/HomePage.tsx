import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import DealOfTheDay from '../components/home/DealOfTheDay';
import FeaturedDeals from '../components/home/FeaturedDeals';
import DealGrid from '../components/deals/DealGrid';
import Newsletter from '../components/home/Newsletter';

import { Category, Deal } from '../types';
import { fetchCategories, fetchDeals } from '../services/api';

const HomePage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the deal of the day to avoid recalculation
  const dealOfTheDay = useMemo(() => {
    return deals.find((deal) => deal.dealOfDay) || deals[0];
  }, [deals]);

  const loadDeals = useCallback(async () => {
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (err) {
      setError('Failed to load deals. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories. Please try again later.');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      await loadDeals();
      if (isMounted) {
        await loadCategories();
      }
    };

    loadData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [loadDeals, loadCategories]);

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
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <DealOfTheDay deal={dealOfTheDay} />
      <FeaturedDeals deals={deals} />
      <DealGrid deals={deals} title="All Deals" />
      <Newsletter />
    </>
  );
};

export default HomePage;
