export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType?: string;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  hasGarden?: boolean;
  hasDriveway?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  subscriptionPrice: number;
  icon: string;
  duration: number; // in minutes
  isRecommended?: boolean;
  amenityRequirements?: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
  price: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  technicianId?: string;
  technicianName?: string;
  notes?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  propertyId?: string;
  createdAt: string;
}

export interface HomeScore {
  overall: number;
  maintenance: number;
  cleanliness: number;
  landscaping: number;
  lastUpdated: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}