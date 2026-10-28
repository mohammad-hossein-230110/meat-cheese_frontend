export type MenuCategoryType = 
  | 'burgers'
  | 'sandwiches'
  | 'salads'
  | 'drinks'
  | 'appetizers'
  | 'all';

export type DietaryTag = 'chef_signature' | 'artisan' | 'high_protein' | 'organic' | 'spicy' | 'special';

export interface MenuItem {
  id: string;
  sku: string;
  name: string;
  nameEn: string;
  category: MenuCategoryType;
  categoryLabel: string;
  badgeLabel?: string; // e.g. 'امضای سرآشپز', 'آرتیزان', 'سبک و پروتئینی'
  badgeType?: 'burgundy' | 'dark' | 'amber';
  gradeMarker?: string;
  provenance?: string;
  aging?: string;
  price: number; // in Tomans
  formattedPrice: string; // e.g. '۲۴۵,۰۰۰ تومان'
  portionWeight?: string;
  description: string;
  tastingNotes?: string[];
  ingredients?: string[];
  pairingSuggestion?: string;
  image: string;
  dietary?: DietaryTag[];
  inStock: boolean;
  preparationTime?: string;
  nutrition?: {
    calories: number;
    proteinGrams: number;
    fatGrams: number;
    carbsGrams: number;
  };
}

export interface CartOrderItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
