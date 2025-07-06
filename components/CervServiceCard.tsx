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

// const getServiceIcon = (iconName: string) => {
//   switch (iconName) {
//     case 'pool':
//       return Droplets;
//     case 'landscaping':
//       return TreePine;
//     case 'driveway':
//       return Car;
//     case 'pest':
//       return Bug;
//     case 'tree':
//       return Scissors;
//     case 'janitorial':
//       return Sparkles;
//     case 'waste':
//       return Trash2;
//     default:
//       return Droplets;
//   }
// };

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
        icon: <Clock color="#8B9DC3" size={16} />,
        text: 'Coming Soon',
        color: '#8B9DC3'
      };
    }
    if (service.isAvailable) {
      return {
        icon: <CheckCircle color={CervColors.systemGreen} size={16} />,
        text: 'Available',
        color: CervColors.systemGreen
      };
    }
    return {
      icon: <AlertCircle color="#FF6B6B" size={16} />,
      text: 'Unavailable',
      color: '#FF6B6B'
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
            <CervLogo 
              variant="service" 
              service={service.serviceKey as any}
              style={styles.serviceLogo}
            />
            
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
              { color: service.isAvailable ? CervColors.secondaryLabel : CervColors.quaternaryLabel }
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
            <View style={styles.recommendedBadge}>
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
  serviceLogo: {
    maxWidth: 140,
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
    fontWeight: 600,
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
    fontWeight: 500,
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
    fontWeight: 500,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -CervSpacing.sm,
    right: -CervSpacing.sm,
    backgroundColor: CervColors.systemOrange,
    paddingHorizontal: CervSpacing.sm,
    paddingVertical: CervSpacing.xs,
    borderRadius: CervBorderRadius.small,
    ...CervShadows.card,
  },
  recommendedText: {
    ...CervTypography.caption2,
    fontWeight: 700,
    color: CervColors.background,
  },
});