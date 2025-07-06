import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Home, Sparkles } from 'lucide-react-native';
import CervServiceCard from '@/components/CervServiceCard';
import CervLogo from '@/components/CervLogo';
import { CervColors, CervShadows, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

const CERV_SERVICES = [
  {
    id: '1',
    name: 'Pool Maintenance',
    description: 'Weekly cleaning, chemical balancing, and equipment checks',
    category: 'Pool Care',
    basePrice: 120,
    subscriptionPrice: 89,
    icon: 'pool',
    duration: 60,
    isRecommended: true,
    isAvailable: true,
    serviceKey: 'pool',
  },
  {
    id: '2',
    name: 'Landscaping',
    description: 'Lawn mowing, trimming, and garden maintenance',
    category: 'Garden',
    basePrice: 85,
    subscriptionPrice: 65,
    icon: 'landscaping',
    duration: 90,
    isRecommended: true,
    isAvailable: true,
    serviceKey: 'landscape',
  },
  {
    id: '3',
    name: 'Exterior Cleaning',
    description: 'Pressure washing for driveways, patios, and walkways',
    category: 'Cleaning',
    basePrice: 150,
    subscriptionPrice: 110,
    icon: 'driveway',
    duration: 120,
    isRecommended: true,
    isAvailable: true,
    serviceKey: 'exterior',
  },
  {
    id: '4',
    name: 'Pest Control',
    description: 'Comprehensive pest prevention and treatment services',
    category: 'Protection',
    basePrice: 120,
    subscriptionPrice: 95,
    icon: 'pest',
    duration: 60,
    isAvailable: false,
    comingSoon: true,
    serviceKey: 'pest',
  },
  {
    id: '5',
    name: 'Tree Services',
    description: 'Tree trimming, removal, and arborist consultations',
    category: 'Landscaping',
    basePrice: 200,
    subscriptionPrice: 150,
    icon: 'tree',
    duration: 180,
    isAvailable: false,
    comingSoon: true,
    serviceKey: 'tree',
  },
  {
    id: '6',
    name: 'Janitorial Services',
    description: 'Interior deep cleaning and maintenance services',
    category: 'Cleaning',
    basePrice: 100,
    subscriptionPrice: 80,
    icon: 'janitorial',
    duration: 120,
    isAvailable: false,
    comingSoon: true,
    serviceKey: 'janitorial',
  },
  {
    id: '7',
    name: 'Waste Management',
    description: 'Garbage collection and recycling services',
    category: 'Utilities',
    basePrice: 75,
    subscriptionPrice: 60,
    icon: 'waste',
    duration: 30,
    isAvailable: false,
    comingSoon: true,
    serviceKey: 'waste',
  },
];

export default function ServicesScreen() {

  const handleBack = () => {
    router.back();
  };

  const handleServiceSelect = (serviceId: string) => {
    router.push(`/schedule?serviceId=${serviceId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CervColors.label} size={24} />
          </TouchableOpacity>
          <CervLogo variant="horizontal" size="small" />
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Sparkles color={CervColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Perfect for your home</Text>
            <Text style={styles.subtitle}>
              Based on your property details, here are the services we recommend
            </Text>
          </View>

          <View style={styles.propertyInfo}>
            <View style={styles.propertyIcon}>
              <Home color={CervColors.secondaryLabel} size={20} />
            </View>
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyAddress}>123 Main Street, Beverly Hills, CA 90210</Text>
              <Text style={styles.propertyFeatures}>Pool • Garden • Driveway • 2,400 sq ft</Text>
            </View>
          </View>

          <View style={styles.servicesList}>
            <Text style={styles.sectionTitle}>Recommended Services</Text>
            {CERV_SERVICES.filter(service => service.isRecommended).map(service => (
              <CervServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </View>

          <View style={styles.servicesList}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            {CERV_SERVICES.filter(service => !service.isRecommended).map(service => (
              <CervServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: CervColors.separator,
    backgroundColor: CervColors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: CervBorderRadius.round,
    backgroundColor: CervColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...CervTypography.headline,
    color: CervColors.label,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    backgroundColor: CervColors.background,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: CervSpacing.xxxl,
    marginBottom: CervSpacing.xxxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: CervBorderRadius.round,
    backgroundColor: CervColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CervSpacing.xl,
    ...CervShadows.card,
  },
  title: {
    ...CervTypography.title1,
    color: CervColors.label,
    textAlign: 'center',
    marginBottom: CervSpacing.sm,
  },
  subtitle: {
    ...CervTypography.callout,
    color: CervColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 300,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xl,
    borderRadius: CervBorderRadius.large,
    marginBottom: CervSpacing.xxxl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    ...CervShadows.card,
  },
  propertyIcon: {
    width: 44,
    height: 44,
    borderRadius: CervBorderRadius.medium,
    backgroundColor: CervColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CervSpacing.lg,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyAddress: {
    ...CervTypography.subheadline,
    fontWeight: '600',
    color: CervColors.label,
    marginBottom: CervSpacing.xs,
  },
  propertyFeatures: {
    ...CervTypography.footnote,
    fontWeight: '500',
    color: CervColors.secondaryLabel,
  },
  servicesList: {
    marginBottom: CervSpacing.xxxl,
  },
  sectionTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
    marginBottom: CervSpacing.xl,
  },
  bottomSpacing: {
    height: CervSpacing.xl,
  },
});