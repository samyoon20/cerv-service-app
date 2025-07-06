import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react-native';
import { getCervServiceTheme } from '@/themes/cervServiceThemes';
import CervLogo from '@/components/CervLogo';
import { CervColors, CervShadows, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

const { width } = Dimensions.get('window');

interface CervServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    subscriptionPrice: number;
    icon: string;
    duration: number;
    isRecommended?: boolean;
    isAvailable: boolean;
    comingSoon?: boolean;
    serviceKey: string;
  };
  onSelect: (serviceId: string) => void;
}

export default function CervServiceCard({ service, onSelect }: CervServiceCardProps) {
  const theme = getCervServiceTheme(service.serviceKey);
  
  const handlePress = () => {
    if (service.isAvailable) {
      onSelect(service.id);
    }
  };

  const getStatusInfo = () => {
    if (!service.isAvailable && service.comingSoon) {
      return {
        icon: <Clock color={CervColors.systemGray} size={16} />,
        text: 'Coming Soon',
        color: CervColors.systemGray
      };
    }
    if (service.isAvailable) {
      return {
        icon: <CheckCircle color={theme.primaryColor} size={16} />,
        text: 'Available',
        color: theme.primaryColor
      };
    }
    return {
      icon: <AlertCircle color={CervColors.systemRed} size={16} />,
      text: 'Unavailable',
      color: CervColors.systemRed
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !service.isAvailable && styles.disabledContainer
      ]}
      onPress={handlePress}
      activeOpacity={service.isAvailable ? 0.6 : 1}
    >
      <View style={[
        styles.cardBackground,
        !service.isAvailable && styles.disabledBackground
      ]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.serviceColorBar, { backgroundColor: theme.primaryColor }]} />
            
            <View style={styles.statusContainer}>
              {statusInfo.icon}
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          </View>

          <View style={styles.serviceInfo}>
            <Text style={[
              styles.serviceName,
              { color: service.isAvailable ? CervColors.label : CervColors.tertiaryLabel }
            ]}>
              {service.name}
            </Text>
            <Text style={[
              styles.serviceCategory,
              { color: service.isAvailable ? theme.primaryColor : CervColors.quaternaryLabel }
            ]}>
              {service.category}
            </Text>
            <Text style={[
              styles.serviceDescription,
              { color: service.isAvailable ? CervColors.secondaryLabel : CervColors.tertiaryLabel }
            ]}>
              {service.description}
            </Text>
          </View>

          <View style={styles.pricing}>
            <View style={styles.priceRow}>
              <Text style={[
                styles.originalPrice,
                { color: service.isAvailable ? CervColors.tertiaryLabel : CervColors.quaternaryLabel }
              ]}>
                ${service.basePrice}
              </Text>
              <Text style={[
                styles.subscriptionPrice,
                { 
                  color: service.isAvailable ? theme.primaryColor : CervColors.tertiaryLabel,
                  fontWeight: '600'
                }
              ]}>
                ${service.subscriptionPrice}/visit
              </Text>
            </View>
            <Text style={[
              styles.durationText,
              { color: service.isAvailable ? CervColors.tertiaryLabel : CervColors.quaternaryLabel }
            ]}>
              ~{service.duration} min
            </Text>
          </View>

          {service.isRecommended && service.isAvailable && (
            <View style={[styles.recommendedBadge, { backgroundColor: theme.primaryColor }]}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 48,
    marginBottom: CervSpacing.lg,
    borderRadius: CervBorderRadius.large,
    overflow: 'hidden',
    ...CervShadows.card,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  cardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  disabledBackground: {
    backgroundColor: CervColors.systemGray6,
  },
  content: {
    // No special styling needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: CervSpacing.lg,
    gap: CervSpacing.md,
  },
  serviceColorBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CervSpacing.xs,
    backgroundColor: CervColors.secondarySystemFill,
    paddingHorizontal: CervSpacing.sm,
    paddingVertical: CervSpacing.xs,
    borderRadius: CervBorderRadius.medium,
  },
  statusText: {
    ...CervTypography.caption1,
    fontWeight: '600',
  },
  serviceInfo: {
    marginBottom: CervSpacing.lg,
  },
  serviceName: {
    ...CervTypography.title3,
    marginBottom: CervSpacing.xs,
  },
  serviceCategory: {
    ...CervTypography.subheadline,
    fontWeight: '500',
    marginBottom: CervSpacing.sm,
  },
  serviceDescription: {
    ...CervTypography.subheadline,
  },
  pricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CervSpacing.sm,
  },
  originalPrice: {
    ...CervTypography.subheadline,
    textDecorationLine: 'line-through',
  },
  subscriptionPrice: {
    ...CervTypography.headline,
  },
  durationText: {
    ...CervTypography.caption1,
    fontWeight: '500',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -CervSpacing.sm,
    right: -CervSpacing.sm,
    paddingHorizontal: CervSpacing.sm,
    paddingVertical: CervSpacing.xs,
    borderRadius: CervBorderRadius.small,
    ...CervShadows.card,
  },
  recommendedText: {
    ...CervTypography.caption2,
    fontWeight: '700',
    color: CervColors.white,
  },
});