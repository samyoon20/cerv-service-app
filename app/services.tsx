import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Chrome as Home, Sparkles, Bug } from 'lucide-react-native';
import ServiceCard from '@/components/ServiceCard';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_SERVICES = [
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
  },
  {
    id: '4',
    name: 'Handyman Services',
    description: 'General repairs, maintenance, and small improvements',
    category: 'Maintenance',
    basePrice: 95,
    subscriptionPrice: 75,
    icon: 'handyman',
    duration: 75,
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Pest Control',
    description: 'Comprehensive pest prevention and treatment services',
    category: 'Protection',
    basePrice: 120,
    subscriptionPrice: 95,
    icon: 'pest',
    duration: 60,
    isAvailable: false,
    comingSoon: true,
  },
];

export default function ServicesScreen() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleServiceSelect = (serviceId: string) => {
    router.push(`/schedule?serviceId=${serviceId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={styles.backgroundGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color="#475569" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recommended Services</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Sparkles color="#00D4AA" size={32} />
            </View>
            <Text style={styles.title}>Perfect for your home</Text>
            <Text style={styles.subtitle}>
              Based on your property details, here are the services we recommend
            </Text>
          </View>

          <View style={styles.propertyInfo}>
            <View style={styles.propertyIcon}>
              <Home color="#64748B" size={20} />
            </View>
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyAddress}>123 Main Street, Beverly Hills, CA 90210</Text>
              <Text style={styles.propertyFeatures}>Pool • Garden • Driveway • 2,400 sq ft</Text>
            </View>
          </View>

          <View style={styles.servicesList}>
            <Text style={styles.sectionTitle}>Recommended Services</Text>
            {MOCK_SERVICES.filter(service => service.isRecommended).map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </View>

          <View style={styles.servicesList}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            {MOCK_SERVICES.filter(service => !service.isRecommended).map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
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
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  propertyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyAddress: {
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  propertyFeatures: {
    fontSize: 13,
    fontFamily: 'Nunito-Medium',
    color: '#64748B',
  },
  servicesList: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  bottomSpacing: {
    height: 20,
  },
});