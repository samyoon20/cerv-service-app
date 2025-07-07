import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { CervColors, CervBorderRadius } from '@/themes/appleDesignSystem';
import {
  ChevronRight,
  X,
  Tag,
  Clock,
  Gift,
  Star,
  Users,
  Zap,
} from 'lucide-react-native';
import type { Campaign, Promotion } from '@/types';

interface CampaignBannerProps {
  campaign: Campaign;
  promotion?: Promotion;
  onPress?: () => void;
  onDismiss?: () => void;
  style?: any;
  compact?: boolean;
}

export default function CampaignBanner({
  campaign,
  promotion,
  onPress,
  onDismiss,
  style,
  compact = false,
}: CampaignBannerProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (campaign.deepLink) {
      // Handle deep link navigation
      Alert.alert('Campaign', `Navigate to: ${campaign.deepLink}`);
    }
  };

  const getCampaignIcon = () => {
    if (promotion) {
      switch (promotion.discountType) {
        case 'percentage':
          return <Tag color="#FFB800" size={compact ? 16 : 20} />;
        case 'fixed':
          return <Gift color={CervColors.systemGreen} size={compact ? 16 : 20} />;
        case 'free_service':
          return <Star color="#8B66FF" size={compact ? 16 : 20} />;
        default:
          return <Zap color={CervColors.systemGreen} size={compact ? 16 : 20} />;
      }
    }
    
    // Default campaign icons based on title content
    if (campaign.title.toLowerCase().includes('referral')) {
      return <Users color={CervColors.systemGreen} size={compact ? 16 : 20} />;
    }
    if (campaign.title.toLowerCase().includes('discount') || campaign.title.toLowerCase().includes('save')) {
      return <Tag color="#FFB800" size={compact ? 16 : 20} />;
    }
    return <Zap color={CervColors.systemGreen} size={compact ? 16 : 20} />;
  };

  const getPromotionText = () => {
    if (!promotion) return null;
    
    switch (promotion.discountType) {
      case 'percentage':
        return `${promotion.discountValue}% OFF`;
      case 'fixed':
        return `$${promotion.discountValue} OFF`;
      case 'free_service':
        return 'FREE SERVICE';
      default:
        return null;
    }
  };

  const isExpiringSoon = () => {
    const endDate = new Date(campaign.endDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
  };

  const getBannerGradient = () => {
    if (promotion) {
      switch (promotion.discountType) {
        case 'percentage':
          return ['#FFB800', '#FF8C00'];
        case 'fixed':
          return [CervColors.systemGreen, '#28B946'];
        case 'free_service':
          return ['#8B66FF', '#7C3AED'];
        default:
          return [CervColors.cardBackground, CervColors.cardBackground];
      }
    }
    
    if (isExpiringSoon()) {
      return ['#FF6B6B', '#EF4444'];
    }
    
    return [CervColors.cardBackground, CervColors.cardBackground];
  };

  const getTextColor = () => {
    if (promotion || isExpiringSoon()) {
      return '#FFFFFF';
    }
    return CervColors.label;
  };

  const getSecondaryTextColor = () => {
    if (promotion || isExpiringSoon()) {
      return 'rgba(255, 255, 255, 0.8)';
    }
    return CervColors.secondaryLabel;
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, style]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={[styles.compactBackground, { backgroundColor: getBannerGradient()[0] }]}>
          <View style={styles.compactContent}>
            <View style={styles.compactIcon}>
              {getCampaignIcon()}
            </View>
            
            <View style={styles.compactText}>
              <Text style={[styles.compactTitle, { color: getTextColor() }]} numberOfLines={1}>
                {campaign.title}
              </Text>
              {promotion && (
                <Text style={[styles.compactPromotion, { color: getTextColor() }]}>
                  {getPromotionText()}
                </Text>
              )}
            </View>

            <ChevronRight color={getTextColor()} size={16} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={[styles.bannerBackground, { backgroundColor: getBannerGradient()[0] }]}>
          {onDismiss && (
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={onDismiss}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X color={getTextColor()} size={16} />
            </TouchableOpacity>
          )}

          <View style={styles.content}>
            {campaign.imageUrl ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: campaign.imageUrl }} style={styles.campaignImage} />
              </View>
            ) : (
              <View style={styles.iconContainer}>
                {getCampaignIcon()}
              </View>
            )}

            <View style={styles.textContent}>
              <View style={styles.header}>
                <Text style={[styles.title, { color: getTextColor() }]} numberOfLines={2}>
                  {campaign.title}
                </Text>
                
                {promotion && (
                  <View style={styles.promotionBadge}>
                    <Text style={styles.promotionText}>
                      {getPromotionText()}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.description, { color: getSecondaryTextColor() }]} numberOfLines={2}>
                {campaign.description}
              </Text>

              <View style={styles.footer}>
                {isExpiringSoon() && (
                  <View style={styles.urgencyIndicator}>
                    <Clock color={getTextColor()} size={12} />
                    <Text style={[styles.urgencyText, { color: getTextColor() }]}>
                      Ends in {Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </Text>
                  </View>
                )}
                
                <View style={styles.actionIndicator}>
                  <Text style={[styles.actionText, { color: getTextColor() }]}>
                    Tap to learn more
                  </Text>
                  <ChevronRight color={getTextColor()} size={16} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerBackground: {
    position: 'relative',
    borderRadius: CervBorderRadius.large,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  dismissButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  campaignImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  promotionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  promotionText: {
    fontSize: 10,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '400',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgencyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  urgencyText: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '600',
  },
  actionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '500',
    opacity: 0.8,
  },
  // Compact styles
  compactContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 4,
  },
  compactBackground: {
    borderRadius: CervBorderRadius.medium,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  compactIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactText: {
    flex: 1,
    gap: 2,
  },
  compactTitle: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  compactPromotion: {
    fontSize: 10,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
});