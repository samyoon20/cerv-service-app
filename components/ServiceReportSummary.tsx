import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CervColors } from '@/themes/appleDesignSystem';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  Camera,
  CheckCircle,
  Target,
  Star,
  FileDown,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import type { ServiceReport, CervScore } from '@/types';

interface ServiceReportSummaryProps {
  serviceReport: ServiceReport;
  cervScoreBefore: CervScore;
  cervScoreAfter: CervScore;
  onScheduleNext?: () => void;
  onExportPDF?: () => void;
  onGoBack?: () => void;
}

export default function ServiceReportSummary({
  serviceReport,
  cervScoreBefore,
  cervScoreAfter,
  onScheduleNext,
  onExportPDF,
  onGoBack,
}: ServiceReportSummaryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [viewingBeforePhotos, setViewingBeforePhotos] = useState(true);

  const scoreDelta = cervScoreAfter.overall - cervScoreBefore.overall;
  const isImprovement = scoreDelta > 0;
  
  // const getScoreColor = (score: number) => {
  //   if (score >= 80) return CervColors.systemGreen;
  //   if (score >= 60) return '#FFB800';
  //   return '#FF6B6B';
  // };

  const openPhotoModal = (index: number, isBefore: boolean) => {
    setSelectedPhotoIndex(index);
    setViewingBeforePhotos(isBefore);
    setShowPhotoModal(true);
  };

  const currentPhotos = viewingBeforePhotos ? serviceReport.beforePhotos : serviceReport.afterPhotos;

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const maxIndex = currentPhotos.length - 1;
    if (direction === 'prev') {
      setSelectedPhotoIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    } else {
      setSelectedPhotoIndex(prev => prev < maxIndex ? prev + 1 : 0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service Complete</Text>
          <TouchableOpacity style={styles.exportButton} onPress={onExportPDF}>
            <FileDown color="#8B9DC3" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Score Impact Summary */}
          <LinearGradient
            colors={isImprovement ? [CervColors.systemGreen, '#28B946'] : ['#FFB800', '#FF8C00']}
            style={styles.scoreImpactCard}
          >
            <View style={styles.scoreImpactHeader}>
              <View style={styles.scoreImpactIcon}>
                {isImprovement ? (
                  <TrendingUp color="#FFFFFF" size={24} />
                ) : (
                  <TrendingDown color="#FFFFFF" size={24} />
                )}
              </View>
              <Text style={styles.scoreImpactTitle}>
                Cerv Score {isImprovement ? 'Improved' : 'Impact'}
              </Text>
            </View>

            <View style={styles.scoreComparison}>
              <View style={styles.scoreBefore}>
                <Text style={styles.scoreLabel}>Before</Text>
                <Text style={styles.scoreValue}>{cervScoreBefore.overall}</Text>
              </View>
              
              <View style={styles.scoreArrow}>
                <View style={styles.scoreDelta}>
                  <Text style={styles.scoreDeltaText}>
                    {scoreDelta > 0 ? '+' : ''}{scoreDelta}
                  </Text>
                </View>
              </View>
              
              <View style={styles.scoreAfter}>
                <Text style={styles.scoreLabel}>After</Text>
                <Text style={styles.scoreValue}>{cervScoreAfter.overall}</Text>
              </View>
            </View>

            <Text style={styles.scoreImpactDescription}>
              {isImprovement 
                ? `Great job! This service improved your home's condition and your Cerv Score.`
                : `Your score will improve as we complete more services and maintenance.`
              }
            </Text>
          </LinearGradient>

          {/* Service Overview */}
          <LinearGradient
            colors={[CervColors.cardBackground, CervColors.cardBackground]}
            style={styles.serviceOverview}
          >
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>Pool Maintenance</Text>
                <Text style={styles.serviceDate}>
                  {new Date(serviceReport.serviceDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
              
              <View style={styles.serviceMeta}>
                <View style={styles.durationBadge}>
                  <Clock color={CervColors.systemGreen} size={14} />
                  <Text style={styles.durationText}>{serviceReport.duration}m</Text>
                </View>
                <View style={styles.ratingDisplay}>
                  <Star color="#FFB800" size={14} fill="#FFB800" />
                  <Text style={styles.ratingText}>{serviceReport.rating || 'N/A'}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.technicianInfo}>
              Completed by {serviceReport.technicianName || 'Mike Johnson'}
            </Text>
          </LinearGradient>

          {/* Visual Proof */}
          <LinearGradient
            colors={[CervColors.cardBackground, CervColors.cardBackground]}
            style={styles.visualProofSection}
          >
            <View style={styles.sectionHeader}>
              <Camera color={CervColors.systemGreen} size={20} />
              <Text style={styles.sectionTitle}>Visual Proof</Text>
            </View>

            <View style={styles.photoComparison}>
              <View style={styles.photoColumn}>
                <Text style={styles.photoColumnTitle}>Before</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.photoRow}>
                    {serviceReport.beforePhotos.map((photo, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.photoItem}
                        onPress={() => openPhotoModal(index, true)}
                      >
                        <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.photoColumn}>
                <Text style={styles.photoColumnTitle}>After</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.photoRow}>
                    {serviceReport.afterPhotos.map((photo, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.photoItem}
                        onPress={() => openPhotoModal(index, false)}
                      >
                        <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </LinearGradient>

          {/* Work Completed */}
          <LinearGradient
            colors={[CervColors.cardBackground, CervColors.cardBackground]}
            style={styles.workCompletedSection}
          >
            <View style={styles.sectionHeader}>
              <CheckCircle color={CervColors.systemGreen} size={20} />
              <Text style={styles.sectionTitle}>Work Completed</Text>
              <Text style={styles.workSummary}>
                {serviceReport.workCompleted.length} tasks • {serviceReport.duration} minutes
              </Text>
            </View>

            <View style={styles.workGrid}>
              {serviceReport.workCompleted.map((item, index) => (
                <View key={item.id} style={styles.workGridItem}>
                  <View style={styles.workItemHeader}>
                    <CheckCircle color={CervColors.systemGreen} size={16} />
                    <Text style={styles.workItemNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.workItemTask}>{item.task}</Text>
                  {item.notes && (
                    <Text style={styles.workItemNotes}>{item.notes}</Text>
                  )}
                  <Text style={styles.workItemTime}>{item.timeSpent}m</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Technician Insights */}
          <LinearGradient
            colors={[CervColors.cardBackground, CervColors.cardBackground]}
            style={styles.insightsSection}
          >
            <View style={styles.sectionHeader}>
              <Target color="#8B66FF" size={20} />
              <Text style={styles.sectionTitle}>Professional Insights</Text>
            </View>
            
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>Technician Notes</Text>
              <Text style={styles.insightText}>{serviceReport.technicianNotes}</Text>
            </View>

            {serviceReport.nextServicePlan.length > 0 && (
              <View style={styles.recommendationsCard}>
                <Text style={styles.recommendationsTitle}>Next Recommendations</Text>
                {serviceReport.nextServicePlan.slice(0, 2).map((item, index) => (
                  <View key={item.id} style={styles.recommendationItem}>
                    <View style={styles.recommendationHeader}>
                      <Text style={styles.recommendationTask}>{item.task}</Text>
                      <Text style={styles.recommendationTime}>{item.estimatedTime}</Text>
                    </View>
                    <Text style={styles.recommendationDesc}>{item.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>

          {/* Next Steps */}
          <LinearGradient
            colors={[CervColors.cardBackground, CervColors.cardBackground]}
            style={styles.nextStepsSection}
          >
            <View style={styles.sectionHeader}>
              <Calendar color="#FFB800" size={20} />
              <Text style={styles.sectionTitle}>Next Steps</Text>
            </View>

            <TouchableOpacity style={styles.scheduleButton} onPress={onScheduleNext}>
              <LinearGradient
                colors={[CervColors.systemGreen, '#28B946']}
                style={styles.scheduleButtonGradient}
              >
                <Calendar color="#FFFFFF" size={16} />
                <Text style={styles.scheduleButtonText}>Schedule Next Service</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.nextServiceInfo}>
              <Text style={styles.nextServiceText}>
                Based on this service, we recommend scheduling your next pool maintenance in 2 weeks.
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.bottomSpacing} />
        </ScrollView>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scoreImpactCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreImpactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  scoreImpactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreImpactTitle: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  scoreBefore: {
    alignItems: 'center',
  },
  scoreAfter: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreArrow: {
    alignItems: 'center',
  },
  scoreDelta: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreDeltaText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreImpactDescription: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  serviceOverview: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
  },
  serviceMeta: {
    gap: 8,
    alignItems: 'flex-end',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemGreen,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFB800',
  },
  technicianInfo: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
  },
  visualProofSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  workSummary: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
  },
  photoComparison: {
    gap: 20,
  },
  photoColumn: {
    gap: 12,
  },
  photoColumnTitle: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#8B9DC3',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  photoItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
  },
  workCompletedSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  workGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  workGridItem: {
    width: '48%',
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  workItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  workItemNumber: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '700',
    color: CervColors.systemGreen,
  },
  workItemTask: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 16,
  },
  workItemNotes: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    marginBottom: 6,
    lineHeight: 14,
  },
  workItemTime: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFB800',
  },
  insightsSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  insightCard: {
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 13,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    lineHeight: 18,
  },
  recommendationsCard: {
    backgroundColor: 'rgba(255, 184, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.1)',
  },
  recommendationsTitle: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFB800',
    marginBottom: 12,
  },
  recommendationItem: {
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recommendationTask: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  recommendationTime: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#FFB800',
  },
  recommendationDesc: {
    fontSize: 11,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    lineHeight: 15,
  },
  nextStepsSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  scheduleButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextServiceInfo: {
    backgroundColor: 'rgba(255, 184, 0, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  nextServiceText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
  // Photo Modal
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
    fontFamily: 'System',
    fontWeight: '700',
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
    width: 300,
    height: '70%',
    borderRadius: 12,
  },
  photoCounter: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});