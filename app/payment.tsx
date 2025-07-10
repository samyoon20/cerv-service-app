import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard } from 'lucide-react-native';
import PaymentForm from '@/components/PaymentForm';
import { LinearGradient } from 'expo-linear-gradient';
import { CervColors, CervTypography } from '@/themes/appleDesignSystem';

const MOCK_SERVICES = {
  '1': { name: 'Pool Maintenance', duration: 60, basePrice: 120, subscriptionPrice: 89 },
  '2': { name: 'Landscaping', duration: 90, basePrice: 85, subscriptionPrice: 65 },
  '3': { name: 'Exterior Cleaning', duration: 120, basePrice: 150, subscriptionPrice: 110 },
  '4': { name: 'Pest Control', duration: 60, basePrice: 120, subscriptionPrice: 95 },
  '5': { name: 'Tree Services', duration: 180, basePrice: 200, subscriptionPrice: 150 },
  '6': { name: 'Janitorial Services', duration: 120, basePrice: 100, subscriptionPrice: 80 },
  '7': { name: 'Waste Management', duration: 45, basePrice: 80, subscriptionPrice: 65 },
};

export default function PaymentScreen() {
  const { serviceId, date, time, frequency, model, price } = useLocalSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const service = MOCK_SERVICES[serviceId as keyof typeof MOCK_SERVICES];

  const handleBack = () => {
    router.back();
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to confirmation
      if (isMountedRef.current) {
        router.push({
          pathname: '/confirmation',
          params: {
            serviceId,
            date,
            time,
            frequency,
            model,
            price,
            paymentMethod: paymentData.method,
          },
        });
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Payment failed:', error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsProcessing(false);
      }
    }
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

  const modelDisplay = model === 'subscription' ? 'Subscription Plan' : 'One-time Payment';

  if (isProcessing) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#F8FAFC', '#F1F5F9']}
          style={styles.backgroundGradient}
        >
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={CervColors.systemGreen} />
            <Text style={styles.processingTitle}>Processing Payment</Text>
            <Text style={styles.processingText}>Please wait while we process your payment...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <CreditCard color={CervColors.systemGreen} size={32} />
            </View>
            <Text style={styles.title}>Complete your booking</Text>
            <Text style={styles.subtitle}>
              Secure payment and account creation
            </Text>
          </View>

          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <Text style={styles.orderTitle}>Order Summary</Text>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Service:</Text>
              <Text style={styles.orderValue}>{service.name}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Date & Time:</Text>
              <Text style={styles.orderValue}>
                {new Date(date as string).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })} at {time}
              </Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Frequency:</Text>
              <Text style={styles.orderValue}>{frequencyDisplay}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Plan:</Text>
              <Text style={styles.orderValue}>{modelDisplay}</Text>
            </View>
            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${price}</Text>
            </View>
          </View>

          <PaymentForm
            onPaymentSubmit={handlePaymentSubmit}
            amount={Number(price)}
          />

          <View style={styles.securityNote}>
            <Text style={styles.securityText}>
              🔒 Your payment information is encrypted and secure. We never store your card details.
            </Text>
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
    fontFamily: CervTypography.headline.fontFamily,
    fontWeight: CervTypography.headline.fontWeight,
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
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: CervTypography.title1.fontFamily,
    fontWeight: CervTypography.title1.fontWeight,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: CervTypography.body.fontFamily,
    fontWeight: CervTypography.body.fontWeight,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  orderSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  orderTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#64748B',
  },
  orderValue: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#0F172A',
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.2)',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '700',
    color: CervColors.systemGreen,
    letterSpacing: -0.3,
  },
  securityNote: {
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#0369A1',
    textAlign: 'center',
    lineHeight: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  processingTitle: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  processingText: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 20,
  },
});