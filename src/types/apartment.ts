export interface Apartment {
  id: number;
  title: string;
  description: string;
  price_per_night: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  images: string[];
  amenities: string[];
  rating: number;
  reviews_count: number;
  is_available: boolean;
  contact_phone: string;
}