export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  dealOfDay: boolean;
  url: string;
  editor_note: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low-high'
  | 'price-high-low'
  | 'biggest-discount';
