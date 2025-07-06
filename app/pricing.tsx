import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, DollarSign, Check, Zap } from 'lucide-react-native';
import { CervColors } from '@/themes/appleDesignSystem';

const MOCK_SERVICES = {
  '1': { name: 'Pool Maintenance', duration: 60, basePrice: 120, subscriptionPrice: 89 },
  '2': { name: 'Landscaping', duration: 90, basePrice: 85, subscriptionPrice: 65 },
  '3': { name: 'Exterior Cleaning', duration: 120, basePrice: 150, subscriptionPrice: 110 },
  '4': { name: 'Pest Control', duration: 60, basePrice: 120, subscriptionPrice: 95 },
  '5': { name: 'Tree Services', duration: 180, basePrice: 200, subscriptionPrice: 150 },
  '6': { name: 'Janitorial Services', duration: 120, basePrice: 100, subscriptionPrice: 80 },
  '7': { name: 'Waste Management', duration: 45, basePrice: 80, subscriptionPrice: 65 },
};

export default function PricingScreen() {
  const { serviceId, date, time, frequency } = useLocalSearchParams();
  const [selectedModel, setSelectedModel] = useState<'subscription' | 'one-time' | null>(null);

  const service = MOCK_SERVICES[serviceId as keyof typeof MOCK_SERVICES];

  const handleBack = () => {
    router.back();
  };

  const handleModelSelect = (model: 'subscription' | 'one-time') => {
    setSelectedModel(model);
  };

  const handleContinue = () => {
    if (!selectedModel) return;

    router.push({
      pathname: '/payment',
      params: {
        serviceId,
        date,
        time,
        frequency,
        model: selectedModel,
        price: selectedModel === 'subscription' ? service?.subscriptionPrice : service?.basePrice,
      },
    });
  };

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Service not found</Text>
      </SafeAreaView>
    );
  }

  const frequencyDisplay = frequency === 'bi-weekly' ? 'Bi-weekly' : 
                          frequency === 'one-time' ? 'One-time' :
                          (frequency as string)?.charAt(0).toUpperCase() + (frequency as string)?.slice(1);

  const subscriptionSavings = ((service.basePrice - service.subscriptionPrice) / service.basePrice * 100).toFixed(0);

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
          <Text style={styles.headerTitle}>Choose Your Plan</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <DollarSign color={CervColors.systemGreen} size={32} />
            </View>
            <Text style={styles.title}>Select payment model</Text>
            <Text style={styles.subtitle}>
              Choose between subscription savings or flexible one-time payments
            </Text>
          </View>

          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceSchedule}>
              {new Date(date as string).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })} at {time} • {frequencyDisplay}
            </Text>
          </View>

          <View style={styles.pricingOptions}>
            {/* Subscription Option */}
            <TouchableOpacity
              style={[
                styles.pricingCard,
                selectedModel === 'subscription' && styles.pricingCardSelected,
                styles.recommendedCard
              ]}
              onPress={() => handleModelSelect('subscription')}
            >
              <View style={styles.recommendedBadge}>
                <Zap color="#ffffff" size={16} />
                <Text style={styles.recommendedText}>RECOMMENDED</Text>
              </View>
              
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Subscription Plan</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${service.subscriptionPrice}</Text>
                  <Text style={styles.priceFrequency}>per visit</Text>
                </View>
                <Text style={styles.savings}>Save {subscriptionSavings}% vs one-time</Text>
              </View>

              <View style={styles.features}>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>Priority scheduling</Text>
                </View>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>Consistent service team</Text>
                </View>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>24/7 customer support</Text>
                </View>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>Cancel anytime</Text>
                </View>
              </View>

              {selectedModel === 'subscription' && (
                <View style={styles.selectedIndicator}>
                  <Check color="#ffffff" size={20} />
                </View>
              )}
            </TouchableOpacity>

            {/* One-time Option */}
            <TouchableOpacity
              style={[
                styles.pricingCard,
                selectedModel === 'one-time' && styles.pricingCardSelected
              ]}
              onPress={() => handleModelSelect('one-time')}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>One-time Payment</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${service.basePrice}</Text>
                  <Text style={styles.priceFrequency}>per visit</Text>
                </View>
                <Text style={styles.priceNote}>Pay as you go</Text>
              </View>

              <View style={styles.features}>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>No commitment</Text>
                </View>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>Flexible scheduling</Text>
                </View>
                <View style={styles.feature}>
                  <Check color={CervColors.systemGreen} size={18} />
                  <Text style={styles.featureText}>Standard support</Text>
                </View>
              </View>

              {selectedModel === 'one-time' && (
                <View style={styles.selectedIndicator}>
                  <Check color="#ffffff" size={20} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.continueButton, !selectedModel && styles.disabledButton]} 
            onPress={handleContinue}
            disabled={!selectedModel}
          >
            <LinearGradient
              colors={selectedModel ? [CervColors.systemGreen, CervColors.systemGreen] : ['#9CA3AF', '#9CA3AF']}
              style={styles.gradientButton}
            >
              <Text style={styles.continueButtonText}>
                Continue to Payment
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    backgroundColor: CervColors.systemGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  serviceInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  serviceSchedule: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
  },
  pricingOptions: {
    gap: 16,
  },
  pricingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    position: 'relative',
  },
  pricingCardSelected: {
    borderColor: CervColors.systemGreen,
    backgroundColor: CervColors.systemGreenLight,
  },
  recommendedCard: {
    borderColor: '#FFB800',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB800',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
  },
  recommendedText: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: '#ffffff',
  },
  cardHeader: {
    marginBottom: 20,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    marginRight: 8,
    letterSpacing: -1,
  },
  priceFrequency: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
  },
  savings: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  priceNote: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#374151',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CervColors.systemGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
});