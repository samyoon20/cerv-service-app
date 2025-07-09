import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
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
    color: CervColors.label,
  },
  cardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    color: CervColors.secondaryLabel,
  disabledBackground: {
    backgroundColor: CervColors.systemGray5,
  },
  content: {
    // No special styling needed
    color: CervColors.secondaryLabel,
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
    color: CervColors.tertiaryLabel,
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
    color: CervColors.tertiaryLabel,
  },
});
    color: CervColors.systemBlue,