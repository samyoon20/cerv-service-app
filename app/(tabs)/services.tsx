import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Calendar, Pause, Play, CreditCard as Edit3, Star, MessageSquare, Camera, X, User } from 'lucide-react-native';
import { 
  CervColors, 
  CervShadows, 
  CervSpacing, 
  CervTypography, 
  CervBorderRadius 
} from '@/themes/appleDesignSystem';
import type { TechnicianReview, CategoryRatings } from '@/types';

const MOCK_ACTIVE_SERVICES = [
  {
    id: '1',
    name: 'Pool Maintenance',
    frequency: 'Weekly',
    nextDate: '2024-01-15',
    price: 89,
    status: 'active',
    technician: 'Mike Johnson'
  },
  {
    id: '2',
    name: 'Landscaping',
    frequency: 'Bi-weekly',
    nextDate: '2024-01-18',
    price: 65,
    status: 'active',
    technician: 'Sarah Wilson'
  },
  {
    id: '3',
    name: 'Exterior Cleaning',
    frequency: 'Monthly',
    nextDate: '2024-02-10',
    price: 110,
    status: 'paused',
    technician: 'David Chen'
  },
];

const AVAILABLE_ADDONS = [
  {
    id: '1',
    name: 'Pool Equipment Maintenance',
    description: 'Additional pool equipment care and repairs',
    price: 75,
  },
  {
    id: '2',
    name: 'Tree Pruning Service',
    description: 'Professional tree trimming and care',
    price: 120,
  },
  {
    id: '3',
    name: 'Deep Exterior Cleaning',
    description: 'Comprehensive exterior surface cleaning',
    price: 200,
  },
];

const MOCK_REVIEWS: TechnicianReview[] = [
  {
    id: '1',
    technicianId: 'tech-001',
    technicianName: 'Mike Johnson',
    serviceId: 'pool-maintenance',
    serviceName: 'Pool Maintenance',
    appointmentId: 'apt-001',
    overallRating: 5,
    categoryRatings: {
      quality: 5,
      punctuality: 5,
      professionalism: 5,
      communication: 4
    },
    reviewText: 'Mike did an excellent job with our pool maintenance. Very thorough and professional. Left the area cleaner than when he arrived!',
    photos: ['https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg?auto=compress&cs=tinysrgb&w=400'],
    date: '2024-01-12',
    verified: true
  },
  {
    id: '2',
    technicianId: 'tech-002',
    technicianName: 'Sarah Wilson',
    serviceId: 'landscaping',
    serviceName: 'Landscaping',
    appointmentId: 'apt-002',
    overallRating: 4,
    categoryRatings: {
      quality: 4,
      punctuality: 4,
      professionalism: 5,
      communication: 4
    },
    reviewText: 'Great landscaping work! Sarah was very knowledgeable about plant care and gave helpful tips for maintenance.',
    date: '2024-01-08',
    verified: true
  },
  {
    id: '3',
    technicianId: 'tech-003',
    technicianName: 'David Chen',
    serviceId: 'exterior-cleaning',
    serviceName: 'Exterior Cleaning',
    appointmentId: 'apt-003',
    overallRating: 5,
    categoryRatings: {
      quality: 5,
      punctuality: 5,
      professionalism: 5,
      communication: 5
    },
    reviewText: 'Outstanding service! David was punctual, professional, and did an amazing job cleaning our home exterior.',
    date: '2024-01-05',
    verified: true
  }
];

export default function ServicesTab() {
  const [activeSection, setActiveSection] = useState<'active' | 'addons' | 'reviews'>('active');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    technicianId: '',
    technicianName: '',
    serviceId: '',
    serviceName: '',
    overallRating: 0,
    categoryRatings: {
      quality: 0,
      punctuality: 0,
      professionalism: 0,
      communication: 0
    } as CategoryRatings,
    reviewText: ''
  });

  const handleAddService = () => {
    router.push('/services');
  };

  const handleServiceAction = (serviceId: string, action: 'pause' | 'resume' | 'edit') => {
    const service = MOCK_ACTIVE_SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    switch (action) {
      case 'pause':
        Alert.alert(
          'Pause Service',
          `Are you sure you want to pause ${service.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Pause', onPress: () => Alert.alert('Service Paused', `${service.name} has been paused.`) }
          ]
        );
        break;
      case 'resume':
        Alert.alert('Service Resumed', `${service.name} has been resumed.`);
        break;
      case 'edit':
        Alert.alert('Edit Service', `Editing options for ${service.name} will be available soon.`);
        break;
    }
  };

  const handleAddonSelect = (addon: typeof AVAILABLE_ADDONS[0]) => {
    Alert.alert(
      'Add Service',
      `Add ${addon.name} for $${addon.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add Service', 
          onPress: () => Alert.alert('Service Added', `${addon.name} has been added to your services.`) 
        }
      ]
    );
  };

  const handleAddReview = () => {
    setNewReview({
      technicianId: '',
      technicianName: '',
      serviceId: '',
      serviceName: '',
      overallRating: 0,
      categoryRatings: {
        quality: 0,
        punctuality: 0,
        professionalism: 0,
        communication: 0
      },
      reviewText: ''
    });
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (newReview.overallRating === 0 || !newReview.reviewText.trim()) {
      Alert.alert('Incomplete Review', 'Please provide a rating and review text.');
      return;
    }
    
    setShowReviewModal(false);
    Alert.alert('Review Submitted', 'Thank you for your feedback!');
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void, size: number = 16) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
          >
            <Star
              size={size}
              color={star <= rating ? '#FFB800' : '#8B9DC3'}
              fill={star <= rating ? '#FFB800' : 'transparent'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const setCategoryRating = (category: keyof CategoryRatings, rating: number) => {
    setNewReview(prev => ({
      ...prev,
      categoryRatings: {
        ...prev.categoryRatings,
        [category]: rating
      }
    }));
  };

  const getAverageRating = (reviews: TechnicianReview[]) => {
    if (reviews.length === 0) return '0.0';
    const sum = reviews.reduce((acc, review) => acc + review.overallRating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Services</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
              <View style={styles.addButtonBackground}>
                <Plus color={CervColors.darkGray} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'active' && styles.activeTab]}
              onPress={() => setActiveSection('active')}
            >
              <Text style={[
                styles.tabText,
                activeSection === 'active' && styles.activeTabText
              ]}>
                Services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'addons' && styles.activeTab]}
              onPress={() => setActiveSection('addons')}
            >
              <Text style={[
                styles.tabText,
                activeSection === 'addons' && styles.activeTabText
              ]}>
                Add-ons
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'reviews' && styles.activeTab]}
              onPress={() => setActiveSection('reviews')}
            >
              <Text style={[
                styles.tabText,
                activeSection === 'reviews' && styles.activeTabText
              ]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {activeSection === 'active' && (
              <View style={styles.activeServices}>
                {MOCK_ACTIVE_SERVICES.map(service => (
                  <View
                    key={service.id}
                    style={styles.serviceCard}
                  >
                    <View style={styles.serviceHeader}>
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceFrequency}>{service.frequency}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        service.status === 'active' ? styles.activeBadge : styles.pausedBadge
                      ]}>
                        <Text style={[
                          styles.statusText,
                          service.status === 'active' ? styles.activeStatusText : styles.pausedStatusText
                        ]}>
                          {service.status === 'active' ? 'Active' : 'Paused'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.serviceDetails}>
                      <View style={styles.detailRow}>
                        <Calendar color="#8B9DC3" size={16} />
                        <Text style={styles.detailText}>
                          Next: {new Date(service.nextDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.priceText}>${service.price}/visit</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.technicianText}>with {service.technician}</Text>
                      </View>
                    </View>

                    <View style={styles.serviceActions}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleServiceAction(service.id, 'edit')}
                      >
                        <Edit3 color="#8B9DC3" size={16} />
                        <Text style={styles.actionButtonText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleServiceAction(
                          service.id, 
                          service.status === 'active' ? 'pause' : 'resume'
                        )}
                      >
                        {service.status === 'active' ? (
                          <Pause color="#8B9DC3" size={16} />
                        ) : (
                          <Play color={CervColors.systemGreen} size={16} />
                        )}
                        <Text style={[
                          styles.actionButtonText,
                          service.status === 'paused' && styles.resumeButtonText
                        ]}>
                          {service.status === 'active' ? 'Pause' : 'Resume'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {MOCK_ACTIVE_SERVICES.length === 0 && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateTitle}>No active services</Text>
                    <Text style={styles.emptyStateText}>
                      Add your first service to get started
                    </Text>
                    <TouchableOpacity style={styles.addFirstServiceButton} onPress={handleAddService}>
                      <View style={styles.gradientButton}>
                        <Plus color={CervColors.white} size={20} />
                        <Text style={styles.addFirstServiceButtonText}>Add Service</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {activeSection === 'addons' && (
              <View style={styles.addonsSection}>
                <Text style={styles.sectionSubtitle}>
                  Enhance your home maintenance with these additional services
                </Text>
                
                {AVAILABLE_ADDONS.map(addon => (
                  <View
                    key={addon.id}
                    style={styles.addonCard}
                  >
                    <View style={styles.addonInfo}>
                      <Text style={styles.addonName}>{addon.name}</Text>
                      <Text style={styles.addonDescription}>{addon.description}</Text>
                      <Text style={styles.addonPrice}>${addon.price}</Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.addonButton}
                      onPress={() => handleAddonSelect(addon)}
                    >
                      <Plus color={CervColors.systemBlue} size={20} />
                      <Text style={styles.addonButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {activeSection === 'reviews' && (
              <View style={styles.reviewsSection}>
                <View style={styles.reviewsHeader}>
                  <View style={styles.reviewsStats}>
                    <Text style={styles.sectionSubtitle}>
                      Rate and review your technicians
                    </Text>
                    <View style={styles.statsRow}>
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{getAverageRating(MOCK_REVIEWS)}</Text>
                        {renderStars(parseFloat(getAverageRating(MOCK_REVIEWS)), undefined, 14)}
                      </View>
                      <Text style={styles.statLabel}>({MOCK_REVIEWS.length} reviews)</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
                    <View style={styles.addReviewBackground}>
                      <Plus color={CervColors.white} size={16} />
                      <Text style={styles.addReviewText}>Add Review</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {MOCK_REVIEWS.map(review => (
                  <View
                    key={review.id}
                    style={styles.reviewCard}
                  >
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewerInfo}>
                        <View style={styles.technicianAvatar}>
                          <User color="#8B9DC3" size={20} />
                        </View>
                        <View style={styles.technicianDetails}>
                          <Text style={styles.technicianName}>{review.technicianName}</Text>
                          <Text style={styles.reviewServiceName}>{review.serviceName}</Text>
                        </View>
                      </View>
                      <View style={styles.reviewMeta}>
                        <View style={styles.ratingRow}>
                          {renderStars(review.overallRating, undefined, 14)}
                          <Text style={styles.ratingNumber}>{review.overallRating}.0</Text>
                        </View>
                        <Text style={styles.reviewDate}>
                          {new Date(review.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.reviewText}>{review.reviewText}</Text>

                    <View style={styles.categoryRatings}>
                      <View style={styles.categoryRating}>
                        <Text style={styles.categoryLabel}>Quality</Text>
                        {renderStars(review.categoryRatings.quality, undefined, 12)}
                      </View>
                      <View style={styles.categoryRating}>
                        <Text style={styles.categoryLabel}>Punctuality</Text>
                        {renderStars(review.categoryRatings.punctuality, undefined, 12)}
                      </View>
                      <View style={styles.categoryRating}>
                        <Text style={styles.categoryLabel}>Professionalism</Text>
                        {renderStars(review.categoryRatings.professionalism, undefined, 12)}
                      </View>
                      <View style={styles.categoryRating}>
                        <Text style={styles.categoryLabel}>Communication</Text>
                        {renderStars(review.categoryRatings.communication, undefined, 12)}
                      </View>
                    </View>

                    {review.photos && review.photos.length > 0 && (
                      <View style={styles.reviewPhotos}>
                        {review.photos.map((photo, index) => (
                          <Image key={index} source={{ uri: photo }} style={styles.reviewPhoto} />
                        ))}
                      </View>
                    )}

                    {review.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓ Verified Review</Text>
                      </View>
                    )}
                  </View>
                ))}

                {MOCK_REVIEWS.length === 0 && (
                  <View style={styles.emptyReviews}>
                    <MessageSquare color="#8B9DC3" size={48} />
                    <Text style={styles.emptyReviewsTitle}>No reviews yet</Text>
                    <Text style={styles.emptyReviewsText}>
                      Share your experience with our technicians
                    </Text>
                    <TouchableOpacity style={styles.firstReviewButton} onPress={handleAddReview}>
                      <View style={styles.firstReviewBackground}>
                        <Star color={CervColors.white} size={16} />
                        <Text style={styles.firstReviewText}>Write First Review</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>

        {/* Add Review Modal */}
        <Modal
          visible={showReviewModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowReviewModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Write a Review</Text>
                <TouchableOpacity onPress={() => setShowReviewModal(false)}>
                  <X color="#8B9DC3" size={24} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.ratingSection}>
                  <Text style={styles.ratingLabel}>Overall Rating</Text>
                  {renderStars(newReview.overallRating, (rating) => setNewReview({...newReview, overallRating: rating}), 24)}
                </View>

                <View style={styles.categoryRatingsSection}>
                  <Text style={styles.categoryRatingsTitle}>Rate by Category</Text>
                  
                  <View style={styles.categoryRatingRow}>
                    <Text style={styles.categoryRatingLabel}>Quality</Text>
                    {renderStars(newReview.categoryRatings.quality, (rating) => setCategoryRating('quality', rating), 18)}
                  </View>
                  
                  <View style={styles.categoryRatingRow}>
                    <Text style={styles.categoryRatingLabel}>Punctuality</Text>
                    {renderStars(newReview.categoryRatings.punctuality, (rating) => setCategoryRating('punctuality', rating), 18)}
                  </View>
                  
                  <View style={styles.categoryRatingRow}>
                    <Text style={styles.categoryRatingLabel}>Professionalism</Text>
                    {renderStars(newReview.categoryRatings.professionalism, (rating) => setCategoryRating('professionalism', rating), 18)}
                  </View>
                  
                  <View style={styles.categoryRatingRow}>
                    <Text style={styles.categoryRatingLabel}>Communication</Text>
                    {renderStars(newReview.categoryRatings.communication, (rating) => setCategoryRating('communication', rating), 18)}
                  </View>
                </View>

                <View style={styles.reviewTextSection}>
                  <Text style={styles.reviewTextLabel}>Your Review</Text>
                  <TextInput
                    style={styles.reviewTextInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Share your experience with the technician..."
                    placeholderTextColor="#8B9DC3"
                    value={newReview.reviewText}
                    onChangeText={(text) => setNewReview({...newReview, reviewText: text})}
                  />
                </View>

                <TouchableOpacity style={styles.photoButton}>
                  <Camera color="#8B9DC3" size={20} />
                  <Text style={styles.photoButtonText}>Add Photos (Optional)</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setShowReviewModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
                  <View style={styles.submitButtonBackground}>
                    <Text style={styles.submitButtonText}>Submit Review</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonBackground: {
    width: 40,
    height: 40,
    backgroundColor: CervColors.accentBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CervBorderRadius.large,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    margin: 24,
    borderRadius: 12,
    padding: 4,
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
    backgroundColor: CervColors.accentBackgroundLight,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
  activeTabText: {
    color: CervColors.cervDarkGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  activeServices: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.extraLarge,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  serviceFrequency: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  pausedBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  activeStatusText: {
    color: CervColors.systemGreen,
  },
  pausedStatusText: {
    color: '#FFB800',
  },
  serviceDetails: {
    gap: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: CervColors.systemGreen,
    letterSpacing: -0.2,
  },
  technicianText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
  },
  resumeButtonText: {
    color: CervColors.systemGreen,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    textAlign: 'center',
    marginBottom: 32,
  },
  addFirstServiceButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    backgroundColor: CervColors.systemBlue,
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.large,
  },
  addFirstServiceButtonText: {
    ...CervTypography.callout,
    fontFamily: 'Nunito-Bold',
    color: CervColors.white,
  },
  addonsSection: {
    gap: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
    lineHeight: 24,
  },
  addonCard: {
    backgroundColor: CervColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  addonInfo: {
    flex: 1,
    marginRight: 16,
  },
  addonName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  addonDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
    lineHeight: 20,
  },
  addonPrice: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: CervColors.systemGreen,
    letterSpacing: -0.2,
  },
  addonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: CervColors.systemBlueLight,
    borderWidth: 1,
    borderColor: CervColors.systemBlue,
    gap: 6,
  },
  addonButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemBlue,
  },
  bottomSpacing: {
    height: 20,
  },
  // Reviews Section Styles
  reviewsSection: {
    gap: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  reviewsStats: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  addReviewButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addReviewBackground: {
    backgroundColor: CervColors.systemBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CervSpacing.sm,
    paddingHorizontal: CervSpacing.lg,
    gap: CervSpacing.xs,
    borderRadius: CervBorderRadius.medium,
  },
  addReviewText: {
    ...CervTypography.subheadline,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.white,
  },
  reviewCard: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.extraLarge,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  technicianAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  technicianDetails: {
    flex: 1,
  },
  technicianName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  reviewServiceName: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  reviewMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingNumber: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFB800',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 16,
  },
  categoryRatings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  categoryRating: {
    alignItems: 'center',
    gap: 4,
    minWidth: '22%',
  },
  categoryLabel: {
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewPhotos: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  reviewPhoto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  emptyReviews: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyReviewsTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  emptyReviewsText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    textAlign: 'center',
    marginBottom: 16,
  },
  firstReviewButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  firstReviewBackground: {
    backgroundColor: CervColors.systemBlue,
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.large,
  },
  firstReviewText: {
    ...CervTypography.callout,
    fontFamily: 'Nunito-Bold',
    color: CervColors.white,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: CervColors.background,
    borderTopLeftRadius: CervBorderRadius.extraLarge,
    borderTopRightRadius: CervBorderRadius.extraLarge,
    maxHeight: '90%',
    paddingTop: CervSpacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  modalScroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  ratingLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  categoryRatingsSection: {
    marginBottom: 32,
  },
  categoryRatingsTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoryRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  categoryRatingLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
    flex: 1,
  },
  reviewTextSection: {
    marginBottom: 20,
  },
  reviewTextLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  reviewTextInput: {
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    gap: 8,
    marginBottom: 32,
  },
  photoButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
  },
  submitButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonBackground: {
    backgroundColor: CervColors.systemBlue,
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xl,
    alignItems: 'center',
    borderRadius: CervBorderRadius.medium,
  },
  submitButtonText: {
    ...CervTypography.callout,
    fontFamily: 'Nunito-Bold',
    color: CervColors.white,
  },
});