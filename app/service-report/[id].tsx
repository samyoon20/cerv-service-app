import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Camera,
  CheckCircle,
  Clock,
  Star,
  AlertCircle,
  Calendar,
  User,
  FileText,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ServiceReport, WorkItem, RecommendationItem } from '@/types';

const { width: screenWidth } = Dimensions.get('window');

// Mock service report data
const MOCK_SERVICE_REPORT: ServiceReport = {
  id: '1',
  serviceId: 'pool-maintenance',
  appointmentId: 'apt-001',
  beforePhotos: [
    'https://images.pexels.com/photos/261179/pexels-photo-261179.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  afterPhotos: [
    'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  workCompleted: [
    {
      id: '1',
      task: 'Cleaned pool skimmers and baskets',
      completed: true,
      timeSpent: 15,
      notes: 'Removed significant debris buildup'
    },
    {
      id: '2',
      task: 'Tested and balanced water chemistry',
      completed: true,
      timeSpent: 20,
      notes: 'pH was slightly high, added acid'
    },
    {
      id: '3',
      task: 'Brushed pool walls and floor',
      completed: true,
      timeSpent: 25,
      notes: 'Focused on algae spots near shallow end'
    },
    {
      id: '4',
      task: 'Checked pool equipment operation',
      completed: true,
      timeSpent: 10,
      notes: 'All systems running properly'
    },
    {
      id: '5',
      task: 'Applied shock treatment',
      completed: true,
      timeSpent: 5,
      notes: 'Added calcium hypochlorite for clarity'
    }
  ],
  nextServicePlan: [
    {
      id: '1',
      task: 'Pool filter deep cleaning',
      priority: 'high',
      estimatedTime: '2 weeks',
      description: 'Replace or deep clean filter cartridges for optimal filtration'
    },
    {
      id: '2',
      task: 'Pool heater maintenance check',
      priority: 'medium',
      estimatedTime: '1 month',
      description: 'Inspect heater components and test functionality before winter'
    },
    {
      id: '3',
      task: 'Tile line cleaning',
      priority: 'low',
      estimatedTime: '6 weeks',
      description: 'Remove calcium buildup from waterline tiles'
    }
  ],
  technicianNotes: 'Pool was in good condition overall. Water clarity improved significantly after chemical balancing. Recommend more frequent skimming between services due to nearby trees. Equipment is running well with no immediate concerns.',
  serviceDate: '2024-01-12',
  duration: 75,
  rating: 5,
  userReview: 'Excellent service! Mike was thorough and left the pool sparkling clean.'
};

export default function ServiceReportScreen() {
  const { id } = useLocalSearchParams();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [viewingBeforePhotos, setViewingBeforePhotos] = useState(true);
  const [userRating, setUserRating] = useState(MOCK_SERVICE_REPORT.rating || 0);

  const currentPhotos = viewingBeforePhotos ? MOCK_SERVICE_REPORT.beforePhotos : MOCK_SERVICE_REPORT.afterPhotos;

  const openPhotoModal = (index: number, isBefore: boolean) => {
    setSelectedPhotoIndex(index);
    setViewingBeforePhotos(isBefore);
    setShowPhotoModal(true);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const maxIndex = currentPhotos.length - 1;
    if (direction === 'prev') {
      setSelectedPhotoIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    } else {
      setSelectedPhotoIndex(prev => prev < maxIndex ? prev + 1 : 0);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFB800';
      case 'low': return '#00D4AA';
      default: return '#8B9DC3';
    }
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
          >
            <Star
              size={20}
              color={star <= rating ? '#FFB800' : '#8B9DC3'}
              fill={star <= rating ? '#FFB800' : 'transparent'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F1629', '#1A2332']}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Service Report</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Service Overview */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.overviewCard}
            >
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>Pool Maintenance</Text>
                  <Text style={styles.serviceDate}>
                    {new Date(MOCK_SERVICE_REPORT.serviceDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.durationBadge}>
                  <Clock color="#00D4AA" size={16} />
                  <Text style={styles.durationText}>{MOCK_SERVICE_REPORT.duration} min</Text>
                </View>
              </View>

              <View style={styles.technicianInfo}>
                <User color="#8B9DC3" size={16} />
                <Text style={styles.technicianText}>Serviced by Mike Johnson</Text>
              </View>

              <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Your Rating:</Text>
                {renderStars(userRating, setUserRating)}
              </View>
            </LinearGradient>

            {/* Photo Gallery */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.photoSection}
            >
              <View style={styles.sectionHeader}>
                <Camera color="#00D4AA" size={20} />
                <Text style={styles.sectionTitle}>Service Photos</Text>
              </View>

              <View style={styles.photoCategories}>
                <View style={styles.photoCategory}>
                  <Text style={styles.photoCategoryTitle}>Before</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
                    {MOCK_SERVICE_REPORT.beforePhotos.map((photo, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.photoThumbnail}
                        onPress={() => openPhotoModal(index, true)}
                      >
                        <Image source={{ uri: photo }} style={styles.thumbnailImage} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.photoCategory}>
                  <Text style={styles.photoCategoryTitle}>After</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
                    {MOCK_SERVICE_REPORT.afterPhotos.map((photo, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.photoThumbnail}
                        onPress={() => openPhotoModal(index, false)}
                      >
                        <Image source={{ uri: photo }} style={styles.thumbnailImage} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </LinearGradient>

            {/* Work Completed */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.workSection}
            >
              <View style={styles.sectionHeader}>
                <CheckCircle color="#00D4AA" size={20} />
                <Text style={styles.sectionTitle}>Work Completed</Text>
              </View>

              {MOCK_SERVICE_REPORT.workCompleted.map((item) => (
                <View key={item.id} style={styles.workItem}>
                  <View style={styles.workItemHeader}>
                    <CheckCircle color="#00D4AA" size={16} />
                    <Text style={styles.workItemTask}>{item.task}</Text>
                    <Text style={styles.workItemTime}>{item.timeSpent}m</Text>
                  </View>
                  {item.notes && (
                    <Text style={styles.workItemNotes}>{item.notes}</Text>
                  )}
                </View>
              ))}
            </LinearGradient>

            {/* Technician Notes */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.notesSection}
            >
              <View style={styles.sectionHeader}>
                <FileText color="#8B9DC3" size={20} />
                <Text style={styles.sectionTitle}>Technician Notes</Text>
              </View>
              <Text style={styles.notesText}>{MOCK_SERVICE_REPORT.technicianNotes}</Text>
            </LinearGradient>

            {/* Next Service Plan */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.planSection}
            >
              <View style={styles.sectionHeader}>
                <Lightbulb color="#FFB800" size={20} />
                <Text style={styles.sectionTitle}>Next Service Recommendations</Text>
              </View>

              {MOCK_SERVICE_REPORT.nextServicePlan.map((item) => (
                <View key={item.id} style={styles.planItem}>
                  <View style={styles.planItemHeader}>
                    <View style={styles.planItemInfo}>
                      <Text style={styles.planItemTask}>{item.task}</Text>
                      <View style={styles.planItemMeta}>
                        <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                            {item.priority.toUpperCase()}
                          </Text>
                        </View>
                        <Calendar color="#8B9DC3" size={14} />
                        <Text style={styles.planItemTime}>{item.estimatedTime}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.planItemDescription}>{item.description}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.scheduleButton}>
                <LinearGradient
                  colors={['#00D4AA', '#00B894']}
                  style={styles.scheduleButtonGradient}
                >
                  <Calendar color="#0F1629" size={16} />
                  <Text style={styles.scheduleButtonText}>Schedule Next Service</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>

        {/* Photo Modal */}
        <Modal
          visible={showPhotoModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPhotoModal(false)}
        >
          <View style={styles.photoModalOverlay}>
            <View style={styles.photoModalHeader}>
              <Text style={styles.photoModalTitle}>
                {viewingBeforePhotos ? 'Before' : 'After'} Photos
              </Text>
              <TouchableOpacity onPress={() => setShowPhotoModal(false)}>
                <X color="#FFFFFF" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.photoModalContent}>
              <TouchableOpacity 
                style={styles.photoNavButton}
                onPress={() => navigatePhoto('prev')}
              >
                <ChevronLeft color="#FFFFFF" size={24} />
              </TouchableOpacity>

              <Image 
                source={{ uri: currentPhotos[selectedPhotoIndex] }} 
                style={styles.fullPhoto}
                resizeMode="contain"
              />

              <TouchableOpacity 
                style={styles.photoNavButton}
                onPress={() => navigatePhoto('next')}
              >
                <ChevronRight color="#FFFFFF" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.photoCounter}>
              {selectedPhotoIndex + 1} / {currentPhotos.length}
            </Text>
          </View>
        </Modal>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  overviewCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  serviceDate: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#00D4AA',
  },
  technicianInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  technicianText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  photoSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  photoCategories: {
    gap: 20,
  },
  photoCategory: {
    gap: 12,
  },
  photoCategoryTitle: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
  },
  photoScroll: {
    flexDirection: 'row',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  workSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  workItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  workItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  workItemTask: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  workItemTime: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#00D4AA',
  },
  workItemNotes: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginLeft: 24,
    lineHeight: 16,
  },
  notesSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    lineHeight: 20,
  },
  planSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  planItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  planItemHeader: {
    marginBottom: 12,
  },
  planItemInfo: {
    gap: 8,
  },
  planItemTask: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  planItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0.5,
  },
  planItemTime: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
  },
  planItemDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    lineHeight: 20,
  },
  scheduleButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  scheduleButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F1629',
  },
  bottomSpacing: {
    height: 20,
  },
  // Photo Modal Styles
  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
  },
  photoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  photoModalTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  photoModalContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoNavButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  fullPhoto: {
    width: screenWidth - 100,
    height: '70%',
    borderRadius: 12,
  },
  photoCounter: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});