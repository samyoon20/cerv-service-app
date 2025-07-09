import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Calendar, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Plus, Bell, Settings, FileText } from 'lucide-react-native';
import CervScore from '@/components/CervScore';
import PropertySelector from '@/components/PropertySelector';
import CampaignBanner from '@/components/CampaignBanner';
import TechnicianTracker from '@/components/TechnicianTracker';
import LoyaltyScore from '@/components/LoyaltyScore';
import UserInvitationModal from '@/components/UserInvitation';
import PropertyUsersManager from '@/components/PropertyUsersManager';
import type { Property, PropertyPortfolio, CervScore as CervScoreType, Campaign, Promotion, UserRole } from '@/types';
import CervLogo from '@/components/CervLogo';
import { CervColors, CervShadows, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

const MOCK_CERV_SCORE: CervScoreType = {
  overall: 87,
  poolMaintenance: 92,
  exteriorCleaning: 85,
  landscaping: 84,
  loyalty: 78,
  engagement: 91,
  lastUpdated: new Date().toISOString(),
  propertyId: 'prop-1',
  trend: 'improving',
  monthlyDelta: 3,
};

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    address: '123 Main Street',
    city: 'Beverly Hills',
    state: 'CA',
    zipCode: '90210',
    propertyType: 'Single Family Home',
    squareFootage: 3200,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    hasGarden: true,
    hasDriveway: true,
    nickname: 'Beverly Hills Home',
    primaryPhoto: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    gateCode: '1234',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    address: '456 Ocean Drive',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    propertyType: 'Beach House',
    squareFootage: 2800,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: false,
    hasGarden: false,
    hasDriveway: true,
    nickname: 'Malibu Beach House',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_PORTFOLIO: PropertyPortfolio = {
  id: 'portfolio-1',
  userId: 'user-1',
  properties: MOCK_PROPERTIES,
  activePropertyId: 'prop-1',
  totalProperties: 2,
  averageCervScore: 85,
  totalOpenIssues: 2,
  monthlySpend: 450,
  lastUpdated: new Date().toISOString(),
};

const MOCK_PROPERTY_SCORES = {
  'prop-1': MOCK_CERV_SCORE,
  'prop-2': {
    ...MOCK_CERV_SCORE,
    overall: 82,
    propertyId: 'prop-2',
    trend: 'stable' as const,
    monthlyDelta: 0,
  },
};

const MOCK_PROPERTY_ISSUES = {
  'prop-1': 1,
  'prop-2': 1,
};

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    title: '4th of July Special',
    description: 'Get 25% off all exterior cleaning services this holiday weekend. Perfect time to prep for summer gatherings!',
    imageUrl: 'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=400',
    startDate: '2024-07-01T00:00:00Z',
    endDate: '2024-07-07T23:59:59Z',
    isActive: true,
    displayConfig: {
      showOnHomeScreen: true,
      showInServices: true,
      showInProfile: false,
      priority: 1,
    },
    analytics: {
      impressions: 1250,
      clicks: 89,
      conversions: 12,
    },
  },
];

const MOCK_PROMOTION: Promotion = {
  id: 'promo-1',
  campaignId: 'campaign-1',
  title: '4th of July Special',
  description: '25% off exterior cleaning',
  discountType: 'percentage',
  discountValue: 25,
  serviceIds: ['exterior-cleaning'],
  usageLimit: 100,
  usageCount: 12,
  startDate: '2024-07-01T00:00:00Z',
  endDate: '2024-07-07T23:59:59Z',
  isActive: true,
};

const MOCK_LOYALTY_SCORE = {
  points: 2847,
  level: 'Gold',
  nextLevel: 'Platinum',
  pointsToNext: 653,
  totalPointsForNext: 3500,
};

const MOCK_TECHNICIAN_STATUS = {
  isActive: true,
  technicianName: 'Mike Johnson',
  serviceName: 'Pool Maintenance',
  status: 'en_route', // 'preparing', 'en_route', 'arrived', 'working', 'completed'
  eta: '12 minutes',
  progress: 0.65, // 0 to 1
  location: 'Oak Street & Main Ave',
  phoneNumber: '+1 (555) 123-4567',
} as const;

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    serviceName: 'Pool Maintenance',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'scheduled' as const,
    technicianName: 'Mike Johnson',
  },
  {
    id: '2',
    serviceName: 'Landscaping',
    date: '2024-01-12',
    time: '2:00 PM',
    status: 'completed' as const,
    technicianName: 'Sarah Wilson',
  },
  {
    id: '3',
    serviceName: 'Exterior Cleaning',
    date: '2024-01-10',
    time: '9:00 AM',
    status: 'in-progress' as const,
    technicianName: 'David Chen',
  },
];

export default function HomeTab() {
  const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
  const [selectedProperty, setSelectedProperty] = useState<Property>(MOCK_PROPERTIES[0]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentUserRole] = useState<UserRole>('owner');

  const handleScoreDetails = () => {
    router.push('/analytics');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'No new notifications at this time.');
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleAddProperty = () => {
    Alert.alert('Add Property', 'Property addition flow will be implemented.');
  };

  const handleCampaignPress = () => {
    Alert.alert('Campaign', '4th of July promotion details and booking.');
  };

  const handleInviteUser = async (invitation: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sending invitation:', invitation);
  };

  const handleRemoveUser = (userId: string) => {
    Alert.alert('User Removed', `User ${userId} has been removed from the property.`);
  };

  const handleUpdateUserRole = (userId: string, role: UserRole) => {
    Alert.alert('Role Updated', `User ${userId} role updated to ${role}.`);
  };

  const handleManageUsers = () => {
    setShowUsersModal(true);
  };

  const currentScore = MOCK_PROPERTY_SCORES[selectedProperty.id as keyof typeof MOCK_PROPERTY_SCORES];

  const handleViewReport = (appointmentId: string) => {
    router.push(`/service-report/${appointmentId}`);
  };

  const currentAppointments = MOCK_APPOINTMENTS.filter(apt => 
    apt.status === 'scheduled' || apt.status === 'in-progress'
  );

  const pastAppointments = MOCK_APPOINTMENTS.filter(apt => 
    apt.status === 'completed'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Calendar color={CervColors.systemGreen} size={16} />;
      case 'in-progress':
        return <Clock color={CervColors.systemOrange} size={16} />;
      case 'completed':
        return <CheckCircle color={CervColors.systemGreen} size={16} />;
      case 'cancelled':
        return <AlertCircle color={CervColors.systemRed} size={16} />;
      default:
        return <Calendar color={CervColors.systemGray} size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return CervColors.systemGreen;
      case 'in-progress':
        return CervColors.systemOrange;
      case 'completed':
        return CervColors.systemGreen;
      case 'cancelled':
        return CervColors.systemRed;
      default:
        return CervColors.systemGray;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.brandSection}>
              <CervLogo variant="horizontal" size="medium" />
              <Text style={styles.welcomeText}>Welcome back, John</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton} onPress={handleNotifications}>
                <Bell color={CervColors.secondaryLabel} size={22} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleManageUsers}
              >
                <Settings color={CervColors.secondaryLabel} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Property Selector */}
            <PropertySelector
              portfolio={MOCK_PORTFOLIO}
              activeProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              onAddProperty={handleAddProperty}
              propertyScores={MOCK_PROPERTY_SCORES}
              propertyIssues={MOCK_PROPERTY_ISSUES}
            />

            {/* Cerv Score */}
            <CervScore score={currentScore} onViewDetails={handleScoreDetails} />

            {/* Upcoming Visit Section */}
            {MOCK_TECHNICIAN_STATUS.isActive && (
              <TechnicianTracker status={MOCK_TECHNICIAN_STATUS} />
            )}

            {/* Campaign Banner */}
            {MOCK_CAMPAIGNS.length > 0 && (
              <CampaignBanner
                campaign={MOCK_CAMPAIGNS[0]}
                promotion={MOCK_PROMOTION}
                onPress={handleCampaignPress}
                style={{ marginBottom: 20 }}
              />
            )}

            <View style={styles.statusSection}>
              <Text style={styles.sectionTitle}>Current Status</Text>
              
              <View style={styles.statusCards}>
                <View style={styles.statusCard}>
                  <View style={styles.statusCardHeader}>
                    <View style={styles.statusIconContainer}>
                      <Calendar color={CervColors.systemGreen} size={20} />
                    </View>
                    <Text style={styles.statusCardTitle}>Next Service</Text>
                  </View>
                  <Text style={styles.statusCardValue}>Tomorrow</Text>
                  <Text style={styles.statusCardSubtitle}>Pool Maintenance at 10:00 AM</Text>
                </View>

                <View style={styles.statusCard}>
                  <View style={styles.statusCardHeader}>
                    <View style={styles.statusIconContainer}>
                      <CheckCircle color={CervColors.systemGreen} size={20} />
                    </View>
                    <Text style={styles.statusCardTitle}>This Month</Text>
                  </View>
                  <Text style={styles.statusCardValue}>3 Services</Text>
                  <Text style={styles.statusCardSubtitle}>All completed successfully</Text>
                </View>
              </View>
            </View>

            <View style={styles.servicesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Service History</Text>
                <TouchableOpacity style={styles.addButton}>
                  <View style={styles.addButtonBackground}>
                    <Plus color={CervColors.white} size={18} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.tabBar}>
                <TouchableOpacity
                  style={[styles.tab, activeSection === 'current' && styles.activeTab]}
                  onPress={() => setActiveSection('current')}
                >
                  <Text style={[
                    styles.tabText,
                    activeSection === 'current' && styles.activeTabText
                  ]}>
                    Current & Upcoming
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeSection === 'history' && styles.activeTab]}
                  onPress={() => setActiveSection('history')}
                >
                  <Text style={[
                    styles.tabText,
                    activeSection === 'history' && styles.activeTabText
                  ]}>
                    Past Services
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appointmentsList}>
                {activeSection === 'current' && currentAppointments.map(appointment => (
                  <View
                    key={appointment.id}
                    style={styles.appointmentCard}
                  >
                    <View style={styles.appointmentHeader}>
                      <View style={styles.appointmentStatus}>
                        {getStatusIcon(appointment.status)}
                        <Text style={[
                          styles.appointmentStatusText,
                          { color: getStatusColor(appointment.status) }
                        ]}>
                          {getStatusText(appointment.status)}
                        </Text>
                      </View>
                      <Text style={styles.appointmentDate}>
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Text>
                    </View>
                    
                    <Text style={styles.appointmentService}>{appointment.serviceName}</Text>
                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                    <Text style={styles.appointmentTechnician}>
                      with {appointment.technicianName}
                    </Text>
                  </View>
                ))}

                {activeSection === 'history' && pastAppointments.map(appointment => (
                  <View
                    key={appointment.id}
                    style={styles.appointmentCard}
                  >
                    <View style={styles.appointmentHeader}>
                      <View style={styles.appointmentStatus}>
                        {getStatusIcon(appointment.status)}
                        <Text style={[
                          styles.appointmentStatusText,
                          { color: getStatusColor(appointment.status) }
                        ]}>
                          {getStatusText(appointment.status)}
                        </Text>
                      </View>
                      <Text style={styles.appointmentDate}>
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Text>
                    </View>
                    
                    <Text style={styles.appointmentService}>{appointment.serviceName}</Text>
                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                    <Text style={styles.appointmentTechnician}>
                      with {appointment.technicianName}
                    </Text>

                    <TouchableOpacity 
                      style={styles.viewReportButton}
                      onPress={() => handleViewReport(appointment.id)}
                    >
                      <View style={styles.viewReportBackground}>
                        <FileText color={CervColors.systemBlue} size={16} />
                        <Text style={styles.viewReportText}>View Report</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                {((activeSection === 'current' && currentAppointments.length === 0) ||
                  (activeSection === 'history' && pastAppointments.length === 0)) && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                      {activeSection === 'current' 
                        ? 'No upcoming services scheduled'
                        : 'No past services to show'
                      }
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Add-on Carousel Section */}
            <View style={styles.addOnSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Add-ons</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/services')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.addOnCarousel}
              >
                {[
                  { id: '1', name: 'Window Cleaning', price: 75, description: 'Interior & exterior' },
                  { id: '2', name: 'Gutter Cleaning', price: 120, description: 'Cleaning & inspection' },
                  { id: '3', name: 'Deck Staining', price: 200, description: 'Clean & protective stain' },
                ].map(addon => (
                  <TouchableOpacity key={addon.id} style={styles.addOnCard}>
                    <View style={styles.addOnCardBackground}>
                      <Text style={styles.addOnName}>{addon.name}</Text>
                      <Text style={styles.addOnDescription}>{addon.description}</Text>
                      <Text style={styles.addOnPrice}>${addon.price}</Text>
                      <View style={styles.addOnButton}>
                        <Plus color={CervColors.systemBlue} size={16} />
                        <Text style={styles.addOnButtonText}>Add</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>

        {/* User Invitation Modal */}
        <UserInvitationModal
          visible={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onInviteUser={handleInviteUser}
          properties={MOCK_PROPERTIES}
          currentUserRole={currentUserRole}
        />

        {/* Property Users Manager */}
        <PropertyUsersManager
          visible={showUsersModal}
          onClose={() => setShowUsersModal(false)}
          property={selectedProperty}
          currentUserRole={currentUserRole}
          onInviteUser={() => {
            setShowUsersModal(false);
            setShowInviteModal(true);
          }}
          onRemoveUser={handleRemoveUser}
          onUpdateUserRole={handleUpdateUserRole}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: CervColors.separator,
    backgroundColor: CervColors.background,
  },
  brandSection: {
    flex: 1,
    gap: 8,
  },
  welcomeText: {
    ...CervTypography.caption1,
    color: CervColors.secondaryLabel,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CervColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CervColors.separator,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: CervColors.systemRed,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statusSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
    marginBottom: 16,
  },
  statusCards: {
    flexDirection: 'row',
    gap: 16,
  },
  statusCard: {
    flex: 1,
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    ...CervShadows.card,
  },
  statusCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statusIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CervColors.systemGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCardTitle: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.secondaryLabel,
  },
  statusCardValue: {
    ...CervTypography.title3,
    color: CervColors.label,
    marginBottom: 6,
  },
  statusCardSubtitle: {
    ...CervTypography.caption1,
    color: CervColors.tertiaryLabel,
    lineHeight: 16,
  },
  servicesSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonBackground: {
    width: 40,
    height: 40,
    backgroundColor: CervColors.systemBlue,
    borderRadius: CervBorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...CervShadows.card,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: CervColors.systemGray5,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: CervColors.systemBlue,
  },
  tabText: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.secondaryLabel,
  },
  activeTabText: {
    color: CervColors.white,
  },
  appointmentsList: {
    gap: 12,
  },
  appointmentCard: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    marginBottom: CervSpacing.lg,
    ...CervShadows.card,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  appointmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentStatusText: {
    ...CervTypography.caption1,
    fontWeight: '600',
  },
  appointmentDate: {
    ...CervTypography.caption1,
    fontWeight: '600',
    color: CervColors.secondaryLabel,
  },
  appointmentService: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: 6,
  },
  appointmentTime: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
    marginBottom: 4,
  },
  appointmentTechnician: {
    ...CervTypography.caption1,
    color: CervColors.tertiaryLabel,
    marginBottom: 12,
  },
  viewReportButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  viewReportText: {
    ...CervTypography.caption1,
    fontWeight: '600',
    color: CervColors.systemBlue,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    ...CervTypography.subheadline,
    color: CervColors.tertiaryLabel,
  },
  addOnSection: {
    marginBottom: 32,
  },
  addOnCarousel: {
    paddingRight: 24,
  },
  addOnCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  addOnName: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.label,
    marginBottom: 4,
  },
  addOnDescription: {
    ...CervTypography.caption1,
    color: CervColors.secondaryLabel,
    marginBottom: 8,
    lineHeight: 16,
  },
  addOnPrice: {
    ...CervTypography.headline,
    color: CervColors.systemGreen,
    marginBottom: 12,
  },
  addOnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CervColors.systemBlueLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CervColors.systemBlue,
    gap: 4,
  },
  addOnButtonText: {
    ...CervTypography.caption1,
    fontWeight: '600',
    color: CervColors.systemBlue,
  },
  viewAllText: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.systemBlue,
  },
  bottomSpacing: {
    height: CervSpacing.xl,
  },
  
  // New background styles to replace LinearGradients
  addOnCardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.lg,
    borderRadius: CervBorderRadius.medium,
    height: 140,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  
  viewReportBackground: {
    backgroundColor: CervColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CervSpacing.md,
    paddingVertical: CervSpacing.sm,
    borderRadius: CervBorderRadius.small,
    gap: CervSpacing.xs,
  },
});