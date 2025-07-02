import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Waves, 
  Trees, 
  Paintbrush, 
  Wrench, 
  Zap, 
  Wind,
  Car,
  Hammer,
  Bug,
  Clock
} from 'lucide-react-native';

interface ServiceCardProps {
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
    isAvailable?: boolean;
    comingSoon?: boolean;
  };
  onSelect: (serviceId: string) => void;
}

const iconMap = {
  pool: Waves,
  landscaping: Trees,
  painting: Paintbrush,
  handyman: Wrench,
  electrical: Zap,
  hvac: Wind,
  driveway: Car,
  construction: Hammer,
  pest: Bug,
};

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Wrench;
  const isDisabled = !service.isAvailable;

  return (
    <View style={[styles.container, isDisabled && styles.disabledContainer]}>
      {service.isRecommended && (
        <View style={styles.recommendedBadge}>
          <LinearGradient
            colors={['#FFB800', '#FF8C00']}
            style={styles.badgeGradient}
          >
            <Text style={styles.recommendedText}>Recommended</Text>
          </LinearGradient>
        </View>
      )}

      {service.comingSoon && (
        <View style={styles.comingSoonBadge}>
          <LinearGradient
            colors={['#00D4AA', '#00B894']}
            style={styles.badgeGradient}
          >
            <Clock color="#FFFFFF" size={12} />
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </LinearGradient>
        </View>
      )}
      
      <View style={styles.header}>
        <View style={[styles.iconContainer, isDisabled && styles.disabledIconContainer]}>
          <IconComponent 
            color={isDisabled ? '#94A3B8' : '#00D4AA'} 
            size={24} 
          />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={[styles.serviceName, isDisabled && styles.disabledText]}>
            {service.name}
          </Text>
          <Text style={[styles.serviceDescription, isDisabled && styles.disabledDescription]}>
            {service.description}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDisabled && styles.disabledText]}>Starting from</Text>
          <Text style={[styles.detailValue, isDisabled && styles.disabledText]}>
            ${service.basePrice}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDisabled && styles.disabledText]}>Duration</Text>
          <Text style={[styles.detailValue, isDisabled && styles.disabledText]}>
            {service.duration} min
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDisabled && styles.disabledText]}>Subscription</Text>
          <Text style={[styles.detailValue, isDisabled && styles.disabledText]}>
            ${service.subscriptionPrice}/mo
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.selectButton, isDisabled && styles.disabledButton]} 
        onPress={() => !isDisabled && onSelect(service.id)}
        disabled={isDisabled}
      >
        {isDisabled ? (
          <View style={styles.disabledButtonContent}>
            <Text style={styles.disabledButtonText}>
              {service.comingSoon ? 'Notify Me' : 'Not Available'}
            </Text>
          </View>
        ) : (
          <LinearGradient
            colors={['#00D4AA', '#00B894']}
            style={styles.gradientButton}
          >
            <Text style={styles.selectButtonText}>Select Service</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  disabledContainer: {
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    borderColor: 'rgba(139, 157, 195, 0.1)',
    opacity: 0.7,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
    shadowColor: '#FFB800',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recommendedText: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  comingSoonText: {
    fontSize: 11,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledIconContainer: {
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    shadowColor: 'transparent',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 19,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  disabledText: {
    color: '#94A3B8',
  },
  disabledDescription: {
    color: '#CBD5E1',
  },
  details: {
    marginBottom: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#64748B',
  },
  detailValue: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  selectButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 16,
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonContent: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  disabledButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#94A3B8',
    letterSpacing: -0.2,
  },
});