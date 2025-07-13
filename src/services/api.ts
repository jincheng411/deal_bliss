import { Deal, Category } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const mapDealFromApi = (deal: any): Deal => ({
  id: deal.id,
  title: deal.title,
  description: deal.description,
  originalPrice: Number(deal.original_price),
  salePrice: Number(deal.sale_price),
  discountPercentage: Number(deal.discount_percentage),
  imageUrl: deal.image_url,
  category: deal.categories[0]?.slug || 'uncategorized',
  featured: Boolean(deal.featured),
  dealOfDay: Boolean(deal.deal_of_day),
  url: deal.url,
  editor_note: deal.editor_note,
});

const mapCategoryFromApi = (category: any): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
});

export const fetchDeals = async (): Promise<Deal[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deals`);
    if (!response.ok) {
      throw new Error('Failed to fetch deals');
    }
    const data = await response.json();
    return data.map(mapDealFromApi);
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const fetchDealById = async (id: string): Promise<Deal | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/deals/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch deal');
    }
    const deal = await response.json();
    return mapDealFromApi(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    throw error;
  }
};

export const fetchDealsByCategory = async (
  category: string
): Promise<Deal[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/deals?category=${encodeURIComponent(category)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch deals by category');
    }
    const data = await response.json();
    return data.map(mapDealFromApi);
  } catch (error) {
    console.error('Error fetching deals by category:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.map(mapCategoryFromApi);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
