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
export interface CategoryDetails {
  id: string;
  name: string;
  description: string;
  currentScore: number;
  targetScore: number;
  explanation: string;
  factorsAffecting: string[];
  improvementTips: string[];
  icon: string;
  color: string;
}

export interface ScoreRecommendation {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  impact: number; // Expected score improvement
  priority: 'high' | 'medium' | 'low';
  estimatedCost?: number;
  timeToComplete?: string;
  serviceRequired?: boolean;
  serviceId?: string;
  actionType: 'diy' | 'professional' | 'seasonal';
}

export interface ScoreHistoryEntry {
  date: string;
  overall: number;
  maintenance: number;
  cleanliness: number;
  landscaping: number;
  notes?: string;
}

export interface HomeScoreAnalytics {
  current: HomeScore;
  categories: CategoryDetails[];
  recommendations: ScoreRecommendation[];
  history: ScoreHistoryEntry[];
  trends: {
    period: '30d' | '90d' | '1y';
    overallTrend: 'improving' | 'declining' | 'stable';
    bestPerformingCategory: string;
    needsAttentionCategory: string;
    averageMonthlyImprovement: number;
  };
  goals: {
    targetOverallScore: number;
    targetDate: string;
    onTrack: boolean;
    requiredMonthlyImprovement: number;
  };
}

export interface WorkItem {
  id: string;
  task: string;
  completed: boolean;
  timeSpent: number; // in minutes
  notes?: string;
}

export interface RecommendationItem {
  id: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  description: string;
}

export interface ServiceReport {
  id: string;
  serviceId: string;
  appointmentId: string;
  beforePhotos: string[];
  afterPhotos: string[];
  workCompleted: WorkItem[];
  nextServicePlan: RecommendationItem[];
  technicianNotes: string;
  serviceDate: string;
  duration: number; // in minutes
  rating?: number;
  userReview?: string;
}

export interface CategoryRatings {
  quality: number;
  punctuality: number;
  professionalism: number;
  communication: number;
}

export interface TechnicianReview {
  id: string;
  technicianId: string;
  technicianName: string;
  serviceId: string;
  serviceName: string;
  appointmentId: string;
  overallRating: number;
  categoryRatings: CategoryRatings;
  reviewText: string;
  photos?: string[];
  date: string;
  verified: boolean;
}

export interface ReferralItem {
  id: string;
  referredUserName: string;
  referredUserEmail: string;
  status: 'pending' | 'completed' | 'expired';
  rewardEarned: number;
  dateReferred: string;
  dateCompleted?: string;
}

export interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  totalRewardsEarned: number;
  pendingRewards: number;
  completedReferrals: ReferralItem[];
  referralLink: string;
}
