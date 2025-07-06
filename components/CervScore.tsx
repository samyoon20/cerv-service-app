import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { TrendingUp, Info, X, Award, Target, Users, Chrome as Home, Plus, Eye } from 'lucide-react-native';
import type { CervScore as CervScoreType } from '@/types';
import { CervColors, CervShadows, CervSpacing, CervBorderRadius, CervTypography } from '@/themes/appleDesignSystem';

interface CervScoreComponentProps {
  score: CervScoreType;
  onViewDetails: () => void;
  showLearnMore?: boolean;
}

export default function CervScore({ score, onViewDetails, showLearnMore = true }: CervScoreComponentProps) {
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  // Convert 0-100 scale to 0-10 scale
  const convertToTenScale = (value: number) => Math.round(value / 10);
  
  const getScoreColor = (value: number) => {
    const tenScaleValue = convertToTenScale(value);
    if (tenScaleValue >= 8) return CervColors.systemGreen; // Excellent (8-10)
    if (tenScaleValue >= 6) return CervColors.systemOrange; // Good (6-7.9)
    return CervColors.systemRed; // Needs Attention (0-5.9)
  };

  const getScoreGrade = (value: number): string => {
    const tenScaleValue = convertToTenScale(value);
    if (tenScaleValue >= 8) return 'Excellent';
    if (tenScaleValue >= 6) return 'Good';
    return 'Needs Care';
  };

  const getTrendIcon = () => {
    switch (score.trend) {
      case 'improving':
        return <TrendingUp color={CervColors.systemGreen} size={14} />;
      case 'declining':
        return <TrendingUp color={CervColors.systemRed} size={14} style={{ transform: [{ rotate: '180deg' }] }} />;
      default:
        return <TrendingUp color={CervColors.systemGray} size={14} style={{ transform: [{ rotate: '90deg' }] }} />;
    }
  };

  const overallTenScale = convertToTenScale(score.overall);

  return (
    <View style={styles.container}>
      <View style={styles.cardBackground}>
        <View style={styles.mainScoreSection}>
          <View style={styles.scoreHeaderCard}>
            <View style={styles.scoreMain}>
              <View style={styles.scoreValueContainer}>
                <Text style={styles.scoreValueLarge}>{overallTenScale}.{Math.round((score.overall % 10))}</Text>
                <Text style={styles.scoreLabelMain}>Cerv Score</Text>
              </View>
              
              <View style={styles.scoreMetrics}>
                <View style={styles.trendContainer}>
                  {getTrendIcon()}
                  <Text style={[
                    styles.trendValue,
                    { color: score.trend === 'improving' ? CervColors.systemGreen : 
                            score.trend === 'declining' ? CervColors.systemRed : CervColors.systemGray }
                  ]}>
                    {score.monthlyDelta > 0 ? '+' : ''}{score.monthlyDelta}
                  </Text>
                </View>
                
                <Text style={styles.lastUpdatedSimple}>
                  Updated {new Date(score.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
            
            <View style={styles.scoreProgress}>
              <Text style={[styles.scoreGradeStatus, { color: getScoreColor(score.overall) }]}>
                {getScoreGrade(score.overall)}
              </Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${score.overall}%`, backgroundColor: getScoreColor(score.overall) }
                ]} />
              </View>
            </View>
            
            <View style={styles.quickActions}>
              {showLearnMore && (
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => setShowLearnMoreModal(true)}
                >
                  <Info color={CervColors.secondaryLabel} size={16} />
                  <Text style={styles.actionButtonText}>Learn More</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.actionButton} onPress={onViewDetails}>
                <Eye color={CervColors.secondaryLabel} size={16} />
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.homeInsightsBanner}>
            <Home color={CervColors.systemGray} size={20} />
            <Text style={styles.insightsText}>Tell us more about your home for full insights</Text>
            <TouchableOpacity style={styles.insightsButton}>
              <Plus color={CervColors.label} size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Home Services Discovery */}
        <View style={styles.servicesDiscovery}>
          <Text style={styles.discoveryTitle}>Home Services & Insights</Text>
          
          {/* Current Services */}
          <View style={styles.currentServices}>
            <Text style={styles.sectionLabel}>Your Current Services</Text>
            <View style={styles.servicesList}>
              <View style={styles.serviceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#e39ac433' }]}>
                  <View style={[styles.serviceColorDot, { backgroundColor: '#e39ac4' }]} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>Pool Maintenance</Text>
                  <Text style={styles.serviceScore}>{Math.round(score.poolMaintenance / 10)}.{Math.round((score.poolMaintenance % 10))}/10</Text>
                </View>
                <View style={[styles.serviceProgress, { backgroundColor: getScoreColor(score.poolMaintenance) }]} />
              </View>
              
              <View style={styles.serviceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#63373733' }]}>
                  <View style={[styles.serviceColorDot, { backgroundColor: '#633737' }]} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>Exterior Cleaning</Text>
                  <Text style={styles.serviceScore}>{Math.round(score.exteriorCleaning / 10)}.{Math.round((score.exteriorCleaning % 10))}/10</Text>
                </View>
                <View style={[styles.serviceProgress, { backgroundColor: getScoreColor(score.exteriorCleaning) }]} />
              </View>
            </View>
          </View>
          
          {/* Available Services */}
          <View style={styles.availableServices}>
            <Text style={styles.sectionLabel}>Available for Your Home</Text>
            <View style={styles.servicesList}>
              <TouchableOpacity style={styles.availableServiceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#196f6233' }]}>
                  <View style={[styles.serviceColorDot, { backgroundColor: '#196f62' }]} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.availableServiceName}>Landscaping</Text>
                  <Text style={styles.availableServiceHint}>Optimize your yard care</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.availableServiceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: CervColors.systemGray4 }]}>
                  <Plus color={CervColors.systemGray} size={14} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.availableServiceName}>More Services</Text>
                  <Text style={styles.availableServiceHint}>Coming soon</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.viewDetailsButton} onPress={onViewDetails}>
          <View style={styles.detailsBackground}>
            <TrendingUp color={CervColors.systemBlue} size={16} />
            <Text style={styles.viewDetailsText}>View Detailed Analytics</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Learn More Modal */}
      <Modal
        visible={showLearnMoreModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLearnMoreModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>What is Cerv Score?</Text>
              <TouchableOpacity onPress={() => setShowLearnMoreModal(false)}>
                <X color={CervColors.secondaryLabel} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalDescription}>
                Your Cerv Score shows how well your home is maintained and how much you benefit from 
                our partnership. A higher score means better service priority, exclusive discounts, 
                and a healthier, more valuable home.
              </Text>

              <View style={styles.cervActions}>
                <Text style={styles.cervActionsTitle}>How Cerv Improves Your Score:</Text>
                
                <View style={styles.actionGroup}>
                  <View style={styles.actionHeader}>
                    <Target color={CervColors.systemBlue} size={18} />
                    <Text style={styles.actionGroupTitle}>Home Care Services</Text>
                  </View>
                  <View style={styles.actionsList}>
                    <Text style={styles.actionItem}>• Schedule preventive maintenance before issues arise</Text>
                    <Text style={styles.actionItem}>• Connect you with certified, vetted professionals</Text>
                    <Text style={styles.actionItem}>• Monitor service quality and follow up on recommendations</Text>
                    <Text style={styles.actionItem}>• Track maintenance history and create care timelines</Text>
                  </View>
                </View>
                
                <View style={styles.actionGroup}>
                  <View style={styles.actionHeader}>
                    <Award color={CervColors.systemOrange} size={18} />
                    <Text style={styles.actionGroupTitle}>Partnership Benefits</Text>
                  </View>
                  <View style={styles.actionsList}>
                    <Text style={styles.actionItem}>• Reward loyalty with priority scheduling and discounts</Text>
                    <Text style={styles.actionItem}>• Provide personalized service recommendations</Text>
                    <Text style={styles.actionItem}>• Offer exclusive access to premium services</Text>
                    <Text style={styles.actionItem}>• Create custom maintenance plans for your home</Text>
                  </View>
                </View>
                
                <View style={styles.actionGroup}>
                  <View style={styles.actionHeader}>
                    <Users color={CervColors.systemGreen} size={18} />
                    <Text style={styles.actionGroupTitle}>Smart Optimization</Text>
                  </View>
                  <View style={styles.actionsList}>
                    <Text style={styles.actionItem}>• Use your feedback to improve service quality</Text>
                    <Text style={styles.actionItem}>• Optimize scheduling based on your preferences</Text>
                    <Text style={styles.actionItem}>• Proactively identify potential home issues</Text>
                    <Text style={styles.actionItem}>• Connect you with trusted neighbor recommendations</Text>
                  </View>
                </View>
              </View>

              <View style={styles.scoreGuarantee}>
                <View style={styles.guaranteeHeader}>
                  <Target color={CervColors.systemGreen} size={20} />
                  <Text style={styles.guaranteeTitle}>Cerv Score Guarantee</Text>
                </View>
                <Text style={styles.guaranteeText}>
                  We guarantee your Cerv Score will improve with our services. If it doesn&apos;t increase 
                  within 90 days, we&apos;ll work with you at no extra cost until it does.
                </Text>
                <View style={styles.guaranteeBadge}>
                  <Award color={CervColors.systemOrange} size={14} />
                  <Text style={styles.guaranteeBadgeText}>90-Day Score Improvement Promise</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: CervBorderRadius.extraLarge,
    overflow: 'hidden',
    marginBottom: CervSpacing.xxl,
    ...CervShadows.elevated,
  },
  cardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  mainScoreSection: {
    marginBottom: 32,
    gap: 20,
  },
  scoreHeaderCard: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xl,
    borderRadius: CervBorderRadius.extraLarge,
    gap: CervSpacing.lg,
    ...CervShadows.elevated,
  },
  scoreMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreValueContainer: {
    alignItems: 'flex-start',
  },
  scoreValueLarge: {
    ...CervTypography.largeTitle,
    fontSize: 64,
    fontWeight: '700',
    color: CervColors.label,
    lineHeight: 68,
    letterSpacing: -3,
  },
  scoreLabelMain: {
    ...CervTypography.headline,
    color: CervColors.secondaryLabel,
    marginTop: -8,
  },
  scoreMetrics: {
    alignItems: 'flex-end',
    gap: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendValue: {
    ...CervTypography.subheadline,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  lastUpdatedSimple: {
    ...CervTypography.footnote,
    color: CervColors.tertiaryLabel,
  },
  scoreGradeStatus: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: CervSpacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CervColors.systemGray5,
    padding: CervSpacing.sm,
    borderRadius: CervBorderRadius.small,
    gap: CervSpacing.xs,
  },
  actionButtonText: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.label,
  },
  homeInsightsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CervColors.systemGray4,
    padding: CervSpacing.md,
    borderRadius: CervBorderRadius.medium,
    gap: CervSpacing.sm,
  },
  insightsText: {
    flex: 1,
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.label,
  },
  insightsButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CervColors.systemGray2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreProgress: {
    marginTop: CervSpacing.sm,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: CervColors.systemGray4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  servicesDiscovery: {
    marginBottom: 28,
  },
  discoveryTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
    marginBottom: 20,
  },
  currentServices: {
    marginBottom: 24,
  },
  availableServices: {
    marginBottom: 16,
  },
  sectionLabel: {
    ...CervTypography.headline,
    color: CervColors.secondaryLabel,
    marginBottom: 12,
  },
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.md,
    borderRadius: CervBorderRadius.small,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    gap: CervSpacing.sm,
  },
  availableServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CervColors.systemGray5,
    padding: CervSpacing.md,
    borderRadius: CervBorderRadius.small,
    gap: CervSpacing.sm,
  },
  serviceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: 2,
  },
  serviceScore: {
    ...CervTypography.subheadline,
    fontWeight: '500',
    color: CervColors.secondaryLabel,
  },
  availableServiceName: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: 2,
  },
  availableServiceHint: {
    ...CervTypography.subheadline,
    color: CervColors.tertiaryLabel,
  },
  serviceProgress: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
  viewDetailsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  viewDetailsText: {
    ...CervTypography.headline,
    color: CervColors.systemBlue,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: CervColors.background,
    borderRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: CervColors.separator,
  },
  modalTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    lineHeight: 24,
    marginBottom: 24,
  },
  cervActions: {
    marginBottom: 24,
  },
  cervActionsTitle: {
    ...CervTypography.callout,
    fontWeight: '600',
    color: CervColors.systemBlue,
    marginBottom: 20,
    textAlign: 'center',
  },
  actionGroup: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  actionGroupTitle: {
    ...CervTypography.footnote,
    fontWeight: '600',
    color: CervColors.label,
  },
  actionsList: {
    gap: 6,
  },
  actionItem: {
    ...CervTypography.caption1,
    color: CervColors.secondaryLabel,
    lineHeight: 18,
  },
  scoreGuarantee: {
    backgroundColor: CervColors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CervColors.separator,
    alignItems: 'center',
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  guaranteeTitle: {
    ...CervTypography.footnote,
    fontWeight: '700',
    color: CervColors.systemGreen,
  },
  guaranteeText: {
    ...CervTypography.caption1,
    color: CervColors.secondaryLabel,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  guaranteeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: CervColors.systemOrangeLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  guaranteeBadgeText: {
    ...CervTypography.caption2,
    fontWeight: '600',
    color: CervColors.systemOrange,
  },
  
  detailsBackground: {
    backgroundColor: CervColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.md,
    paddingHorizontal: CervSpacing.lg,
    borderRadius: CervBorderRadius.medium,
    gap: CervSpacing.sm,
  },
});