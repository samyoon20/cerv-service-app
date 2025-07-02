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
import { Calendar, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Plus, Bell, Settings, Star, MapPin, Navigation } from 'lucide-react-native';
import HomeScore from '@/components/HomeScore';
import TechnicianTracker from '@/components/TechnicianTracker';
import LoyaltyScore from '@/components/LoyaltyScore';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_HOME_SCORE = {
  overall: 87,
  maintenance: 92,
  cleanliness: 85,
  landscaping: 84,
  lastUpdated: new Date().toISOString(),
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

  const handleScoreDetails = () => {
    router.push('/analytics');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'No new notifications at this time.');
  };

  const handleLoyaltyDetails = () => {
    Alert.alert(
      'Loyalty Program',
      `You're a ${MOCK_LOYALTY_SCORE.level} member!\n\nEarn points with every service:\n• Pool Maintenance: 50 pts\n• Landscaping: 40 pts\n• Cleaning: 60 pts\n\nRedeem points for discounts and exclusive perks.`
    );
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
        return <Calendar color="#00D4AA" size={16} />;
      case 'in-progress':
        return <Clock color="#FFB800" size={16} />;
      case 'completed':
        return <CheckCircle color="#00D4AA" size={16} />;
      case 'cancelled':
        return <AlertCircle color="#FF6B6B" size={16} />;
      default:
        return <Calendar color="#8B9DC3" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#00D4AA';
      case 'in-progress':
        return '#FFB800';
      case 'completed':
        return '#00D4AA';
      case 'cancelled':
        return '#FF6B6B';
      default:
        return '#8B9DC3';
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
      <LinearGradient
        colors={['#0F1629', '#1A2332']}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.nameText}>John Doe</Text>
            </View>
            <View style={styles.headerActions}>
              <LoyaltyScore 
                score={MOCK_LOYALTY_SCORE} 
                onPress={handleLoyaltyDetails}
              />
              <TouchableOpacity style={styles.headerButton} onPress={handleNotifications}>
                <Bell color="#8B9DC3" size={22} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Settings color="#8B9DC3" size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <HomeScore score={MOCK_HOME_SCORE} onViewDetails={handleScoreDetails} />

            {MOCK_TECHNICIAN_STATUS.isActive && (
              <TechnicianTracker status={MOCK_TECHNICIAN_STATUS} />
            )}

            <View style={styles.statusSection}>
              <Text style={styles.sectionTitle}>Current Status</Text>
              
              <View style={styles.statusCards}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statusCard}
                >
                  <View style={styles.statusCardHeader}>
                    <View style={styles.statusIconContainer}>
                      <Calendar color="#00D4AA" size={20} />
                    </View>
                    <Text style={styles.statusCardTitle}>Next Service</Text>
                  </View>
                  <Text style={styles.statusCardValue}>Tomorrow</Text>
                  <Text style={styles.statusCardSubtitle}>Pool Maintenance at 10:00 AM</Text>
                </LinearGradient>

                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statusCard}
                >
                  <View style={styles.statusCardHeader}>
                    <View style={styles.statusIconContainer}>
                      <CheckCircle color="#00D4AA" size={20} />
                    </View>
                    <Text style={styles.statusCardTitle}>This Month</Text>
                  </View>
                  <Text style={styles.statusCardValue}>3 Services</Text>
                  <Text style={styles.statusCardSubtitle}>All completed successfully</Text>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.servicesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Service History</Text>
                <TouchableOpacity style={styles.addButton}>
                  <LinearGradient
                    colors={['#00D4AA', '#00B894']}
                    style={styles.addButtonGradient}
                  >
                    <Plus color="#0F1629" size={18} />
                  </LinearGradient>
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
                  <LinearGradient
                    key={appointment.id}
                    colors={['#1E2A3A', '#243447']}
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
                  </LinearGradient>
                ))}

                {activeSection === 'history' && pastAppointments.map(appointment => (
                  <LinearGradient
                    key={appointment.id}
                    colors={['#1E2A3A', '#243447']}
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
                  </LinearGradient>
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

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
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
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4AA',
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
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  statusCards: {
    flexDirection: 'row',
    gap: 16,
  },
  statusCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
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
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCardTitle: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
  statusCardValue: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  statusCardSubtitle: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
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
  addButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
  activeTabText: {
    color: '#00D4AA',
  },
  appointmentsList: {
    gap: 12,
  },
  appointmentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
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
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    letterSpacing: -0.1,
  },
  appointmentDate: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
  },
  appointmentService: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  appointmentTime: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 4,
  },
  appointmentTechnician: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  bottomSpacing: {
    height: 20,
  },
});