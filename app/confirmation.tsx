import React from 'react';
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
import { CircleCheck as CheckCircle, Calendar, CreditCard, Chrome as Home } from 'lucide-react-native';

const MOCK_SERVICES = {
  '1': { name: 'Pool Maintenance', duration: 60 },
  '2': { name: 'Landscaping', duration: 90 },
  '3': { name: 'Exterior Cleaning', duration: 120 },
  '4': { name: 'Handyman Services', duration: 75 },
  '5': { name: 'HVAC Maintenance', duration: 90 },
};

export default function ConfirmationScreen() {
  const { serviceId, date, time, frequency, model, price, paymentMethod } = useLocalSearchParams();

  const service = MOCK_SERVICES[serviceId as keyof typeof MOCK_SERVICES];

  const handleGoToDashboard = () => {
    router.push('/(tabs)');
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

  const paymentDisplay = paymentMethod === 'apple_pay' ? 'Apple Pay' :
                        paymentMethod === 'google_pay' ? 'Google Pay' :
                        'Credit/Debit Card';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9']}
        style={styles.backgroundGradient}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.successSection}>
            <View style={styles.checkContainer}>
              <View style={styles.checkCircle}>
                <CheckCircle color="#ffffff" size={48} />
              </View>
              <View style={styles.checkRing} />
            </View>
            
            <Text style={styles.successTitle}>Booking Confirmed!</Text>
            <Text style={styles.successSubtitle}>
              Your {service.name} service has been successfully booked
            </Text>
          </View>

          <View style={styles.bookingCard}>
            <View style={styles.cardHeader}>
              <Calendar color="#00D4AA" size={24} />
              <Text style={styles.cardTitle}>Booking Details</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service</Text>
                <Text style={styles.detailValue}>{service.name}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {new Date(date as string).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })} at {time}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Frequency</Text>
                <Text style={styles.detailValue}>{frequencyDisplay}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{service.duration} minutes</Text>
              </View>
            </View>
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.cardHeader}>
              <CreditCard color="#00D4AA" size={24} />
              <Text style={styles.cardTitle}>Payment Summary</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Plan</Text>
                <Text style={styles.detailValue}>{modelDisplay}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Method</Text>
                <Text style={styles.detailValue}>{paymentDisplay}</Text>
              </View>
              
              <View style={[styles.detailRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Amount Charged</Text>
                <Text style={styles.totalValue}>${price}</Text>
              </View>
            </View>
          </View>

          <View style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>What happens next?</Text>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  You'll receive a confirmation email with your booking details
                </Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Our team will contact you 24 hours before your appointment
                </Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Track your service progress through the dashboard
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.dashboardButton} onPress={handleGoToDashboard}>
            <LinearGradient
              colors={['#00D4AA', '#00B894']}
              style={styles.gradientButton}
            >
              <Home color="#ffffff" size={20} />
              <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  successSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  checkContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  checkRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(0, 212, 170, 0.3)',
    top: -12,
    left: -12,
    zIndex: 1,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  detailsGrid: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    flex: 2,
    textAlign: 'right',
  },
  totalRow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.2)',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    flex: 1,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#00D4AA',
    flex: 2,
    textAlign: 'right',
    letterSpacing: -0.3,
  },
  nextStepsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  nextStepsTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#ffffff',
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#374151',
    lineHeight: 20,
    flex: 1,
    paddingTop: 2,
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
  dashboardButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  dashboardButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
});