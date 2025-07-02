import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share, Clipboard, Alert } from 'react-native';
import { Star, Gift, Users, Copy, X, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReferralData, ReferralItem } from '@/types';

interface LoyaltyScoreProps {
  score: {
    points: number;
    level: string;
    nextLevel: string;
    pointsToNext: number;
    totalPointsForNext: number;
  };
  onPress?: () => void;
}

const MOCK_REFERRAL_DATA: ReferralData = {
  referralCode: 'JOHN2024',
  totalReferrals: 3,
  totalRewardsEarned: 450,
  pendingRewards: 150,
  completedReferrals: [
    {
      id: '1',
      referredUserName: 'Sarah Miller',
      referredUserEmail: 'sarah@email.com',
      status: 'completed',
      rewardEarned: 150,
      dateReferred: '2024-01-05',
      dateCompleted: '2024-01-12'
    },
    {
      id: '2',
      referredUserName: 'Mike Chen',
      referredUserEmail: 'mike@email.com',
      status: 'completed',
      rewardEarned: 150,
      dateReferred: '2024-01-10',
      dateCompleted: '2024-01-18'
    },
    {
      id: '3',
      referredUserName: 'Lisa Johnson',
      referredUserEmail: 'lisa@email.com',
      status: 'pending',
      rewardEarned: 150,
      dateReferred: '2024-01-20'
    }
  ],
  referralLink: 'https://cerv.app/ref/JOHN2024'
};

export default function LoyaltyScore({ score, onPress }: LoyaltyScoreProps) {
  const [showReferralModal, setShowReferralModal] = useState(false);
  const progressPercentage = ((score.totalPointsForNext - score.pointsToNext) / score.totalPointsForNext) * 100;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowReferralModal(true);
    }
  };

  const copyReferralCode = () => {
    Clipboard.setString(MOCK_REFERRAL_DATA.referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join me on Cerv and get $50 off your first service! Use my referral link: ${MOCK_REFERRAL_DATA.referralLink}`,
        url: MOCK_REFERRAL_DATA.referralLink,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share referral link');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      default:
        return '#00D4AA';
    }
  };

  return (
    <>
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <LinearGradient
        colors={['rgba(0, 212, 170, 0.15)', 'rgba(0, 212, 170, 0.05)']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={[styles.starContainer, { backgroundColor: `${getLevelColor(score.level)}20` }]}>
            <Star color={getLevelColor(score.level)} size={14} fill={getLevelColor(score.level)} />
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.points}>{score.points.toLocaleString()}</Text>
            <Text style={styles.level}>{score.level}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: getLevelColor(score.level)
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {score.pointsToNext} to {score.nextLevel}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>

    {/* Referral Modal */}
    <Modal
      visible={showReferralModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowReferralModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Referral Program</Text>
            <TouchableOpacity onPress={() => setShowReferralModal(false)}>
              <X color="#8B9DC3" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.referralStats}>
            <LinearGradient
              colors={['rgba(0, 212, 170, 0.15)', 'rgba(0, 212, 170, 0.05)']}
              style={styles.statsCard}
            >
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Gift color="#00D4AA" size={24} />
                  <Text style={styles.statValue}>${MOCK_REFERRAL_DATA.totalRewardsEarned}</Text>
                  <Text style={styles.statLabel}>Total Earned</Text>
                </View>
                <View style={styles.statItem}>
                  <Users color="#FFB800" size={24} />
                  <Text style={styles.statValue}>{MOCK_REFERRAL_DATA.totalReferrals}</Text>
                  <Text style={styles.statLabel}>Referrals</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.referralSection}>
            <Text style={styles.sectionTitle}>Your Referral Code</Text>
            <View style={styles.codeContainer}>
              <LinearGradient
                colors={['#1E2A3A', '#243447']}
                style={styles.codeCard}
              >
                <Text style={styles.referralCode}>{MOCK_REFERRAL_DATA.referralCode}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={copyReferralCode}>
                  <Copy color="#00D4AA" size={16} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            
            <Text style={styles.referralDescription}>
              Share your code and earn $150 for each friend who signs up!
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={shareReferral}>
              <LinearGradient
                colors={['#00D4AA', '#00B894']}
                style={styles.shareButtonGradient}
              >
                <MessageCircle color="#0F1629" size={18} />
                <Text style={styles.shareButtonText}>Share Referral</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.referralsHistory}>
            <Text style={styles.sectionTitle}>Recent Referrals</Text>
            {MOCK_REFERRAL_DATA.completedReferrals.slice(0, 3).map(referral => (
              <View key={referral.id} style={styles.referralItem}>
                <View style={styles.referralInfo}>
                  <Text style={styles.referralName}>{referral.referredUserName}</Text>
                  <Text style={styles.referralDate}>
                    {new Date(referral.dateReferred).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.referralStatus}>
                  <View style={[
                    styles.statusBadge,
                    referral.status === 'completed' ? styles.completedBadge : styles.pendingBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      referral.status === 'completed' ? styles.completedText : styles.pendingText
                    ]}>
                      {referral.status === 'completed' ? '+$150' : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 6,
  },
  gradient: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  starContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreInfo: {
    alignItems: 'flex-start',
  },
  points: {
    fontSize: 13,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 15,
  },
  level: {
    fontSize: 9,
    fontFamily: 'Nunito-SemiBold',
    color: '#00D4AA',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  progressContainer: {
    gap: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 8,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#1A2332',
    borderRadius: 24,
    maxHeight: '80%',
    paddingVertical: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  referralStats: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
  },
  referralSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  codeContainer: {
    marginBottom: 12,
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  referralCode: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#00D4AA',
    letterSpacing: 2,
  },
  copyButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderRadius: 8,
  },
  referralDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    lineHeight: 20,
    textAlign: 'center',
  },
  actionButtons: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  shareButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#0F1629',
  },
  referralsHistory: {
    paddingHorizontal: 24,
  },
  referralItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  referralDate: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  referralStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  completedText: {
    color: '#00D4AA',
  },
  pendingText: {
    color: '#FFB800',
  },
});