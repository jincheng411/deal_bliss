import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Share2, AlertTriangle } from 'lucide-react';
import { Link } from '../components/ui/Link';
import DealGrid from '../components/deals/DealGrid';
import { Deal } from '../types';
import { fetchDealById, fetchDeals } from '../services/api';

const DealDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [relatedDeals, setRelatedDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const loadDeal = useCallback(async () => {
    if (!id) return;

    try {
      const dealData = await fetchDealById(id);
      if (!dealData) {
        setError('Deal not found');
        setLoading(false);
        return;
      }

      setDeal(dealData);

      // Fetch all deals to get related ones
      const allDeals = await fetchDeals();
      const related = allDeals
        .filter((d) => d.category === dealData.category && d.id !== dealData.id)
        .slice(0, 4);
      setRelatedDeals(related);
    } catch (err) {
      setError('Failed to load deal details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const loadDealSafely = async () => {
      await loadDeal();
      // Only update state if component is still mounted
      if (!isMounted) return;
    };

    loadDealSafely();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [loadDeal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading deal details...</p>
        </div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            {error || 'Deal Not Found'}
          </h1>
          <p className="text-gray-600 mb-4">
            The deal you're looking for doesn't exist or has expired.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-coral-600 hover:text-coral-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-coral-600">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/category/${deal.category}`}
              className="hover:text-coral-600 capitalize"
            >
              {deal.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {deal.title}
            </span>
          </div>
        </div>
      </div>

      {/* Deal Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>
            {deal.dealOfDay && (
              <div className="absolute top-4 right-4 bg-yellow-500 text-white font-bold px-4 py-2 rounded-full">
                Deal of the Day
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-flex items-center bg-coral-500 text-white font-bold rounded-full px-4 py-2">
                  -{discountPercentage}% OFF
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <h1 className="text-3xl font-bold text-navy-900 mb-4">
                {deal.title}
              </h1>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-coral-600">
                  ${deal.salePrice.toFixed(2)}
                </span>
                <span className="ml-4 text-xl text-gray-500 line-through">
                  ${deal.originalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-8">{deal.description}</p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-navy-900 mb-4">小编推荐</h3>
                <ul className="space-y-3">{deal.editor_note}</ul>
              </div>

              <Link
                href={deal.url}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-navy-800 hover:bg-navy-700 transition-colors"
                target="_blank"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Get This Deal
              </Link>
            </div>
          </div>
        </div>

        {/* Related Deals */}
        <div className="mt-16">
          <DealGrid deals={relatedDeals} title="Similar Deals" />
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage;
