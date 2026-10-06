export type FoodCategory = 'veg' | 'non-veg' | 'meals' | 'desserts-beverages';

export interface MenuItem {
  id: string;
  name: string;
  teluguName?: string;
  category: FoodCategory;
  price: number;
  description: string;
  specialty: string;
  isSpeciality?: boolean;
  spiceLevel: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Andhra Spicy
  isPureVeg: boolean;
  image: string;
  rating: number;
  reviewsCount: number;
  portionSize?: string;
  keyIngredients?: string[];
  pairing?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
  addons?: {
    name: string;
    price: number;
  }[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  avatarBg: string;
  dineType: 'Dine-in' | 'Family Feast' | 'Takeaway' | 'Regular Guest';
}

export interface GalleryImage {
  id: string;
  title: string;
  teluguTitle?: string;
  category: 'Thali' | 'Specialities' | 'Dining Ambiance' | 'Homestyle Kitchen' | 'Desserts';
  image: string;
  caption: string;
}

export interface ThaliComponent {
  name: string;
  telugu: string;
  role: string;
  desc: string;
}
