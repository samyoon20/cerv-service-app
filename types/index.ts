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
  // New v2 fields for enhanced property management
  nickname?: string;
  primaryPhoto?: string;
  photos?: string[];
  gateCode?: string;
  specialInstructions?: string;
  amenities?: string[];
  maintenanceHistory?: MaintenanceHistoryItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceHistoryItem {
  id: string;
  date: string;
  type: string;
  description: string;
  cost?: number;
  provider?: string;
  notes?: string;
}

export interface PropertyPortfolio {
  id: string;
  userId: string;
  properties: Property[];
  activePropertyId: string;
  totalProperties: number;
  averageCervScore: number;
  totalOpenIssues: number;
  monthlySpend: number;
  lastUpdated: string;
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
  // New v2 fields for multi-user support
  role: UserRole;
  permissions: UserPermission[];
  portfolioId?: string;
  invitedBy?: string;
  invitedAt?: string;
  lastActiveAt?: string;
  profilePhoto?: string;
  preferences?: UserPreferences;
}

export type UserRole = 'owner' | 'household_member' | 'viewer';

export interface UserPermission {
  resource: string;
  actions: string[];
}

export interface UserPreferences {
  hasPets?: boolean;
  petTypes?: string[];
  hasKids?: boolean;
  kidAges?: number[];
  preferredVisitWindow?: {
    startTime: string;
    endTime: string;
    daysOfWeek: string[];
  };
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  specialRequests?: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: UserRole;
  portfolioId: string;
  propertyIds: string[];
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  token: string;
  expiresAt: string;
  message?: string;
}

export interface CervScore {
  overall: number;
  poolMaintenance: number;
  exteriorCleaning: number;
  landscaping: number;
  loyalty: number;
  engagement: number;
  lastUpdated: string;
  propertyId: string;
  trend: 'improving' | 'declining' | 'stable';
  monthlyDelta: number;
}

// Keep HomeScore for backward compatibility
export interface HomeScore {
  overall: number;
  poolMaintenance: number;
  exteriorCleaning: number;
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

export interface CervScoreHistoryEntry {
  date: string;
  overall: number;
  poolMaintenance: number;
  exteriorCleaning: number;
  landscaping: number;
  loyalty: number;
  engagement: number;
  notes?: string;
  propertyId: string;
}

// Keep ScoreHistoryEntry for backward compatibility
export interface ScoreHistoryEntry {
  date: string;
  overall: number;
  poolMaintenance: number;
  exteriorCleaning: number;
  landscaping: number;
  notes?: string;
}

export interface CervScoreAnalytics {
  current: CervScore;
  categories: CategoryDetails[];
  recommendations: ScoreRecommendation[];
  history: CervScoreHistoryEntry[];
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
  propertyId: string;
}

// Keep HomeScoreAnalytics for backward compatibility
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
  technicianName: string;
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

// New v2 interfaces for campaigns and promotions
export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  deepLink?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  targetAudience?: {
    userRoles?: UserRole[];
    propertyTypes?: string[];
    cervScoreRange?: { min: number; max: number };
  };
  displayConfig: {
    showOnHomeScreen: boolean;
    showInServices: boolean;
    showInProfile: boolean;
    priority: number;
  };
  analytics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

export interface Promotion {
  id: string;
  campaignId?: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_service';
  discountValue: number;
  serviceIds?: string[];
  minSpend?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  code?: string;
}

export interface CustomerTier {
  id: string;
  name: string;
  minCervScore: number;
  minMonthlySpend: number;
  benefits: string[];
  discountPercentage: number;
  prioritySupport: boolean;
  freeAddOns: string[];
}
