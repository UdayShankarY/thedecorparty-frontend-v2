export interface HomeCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  active: boolean;
  productCount?: number;
}

export interface HomeProduct {
  _id: string;
  name: string;
  categoryName: string;
  categoryId?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  active: boolean;
  featured?: boolean;
  badge?: string;
  badgeColor?: string;
}
