import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import SchedulingComponent from '@/components/SchedulingComponent';
import { CervColors, CervTypography } from '@/themes/appleDesignSystem';

const MOCK_SERVICES = {
  '1': { name: 'Pool Maintenance', duration: 60, basePrice: 120 },
  '2': { name: 'Landscaping', duration: 90, basePrice: 85 },
  '3': { name: 'Exterior Cleaning', duration: 120, basePrice: 150 },
  '4': { name: 'Pest Control', duration: 60, basePrice: 120 },
  '5': { name: 'Tree Services', duration: 180, basePrice: 200 },
  '6': { name: 'Janitorial Services', duration: 120, basePrice: 100 },
  '7': { name: 'Waste Management', duration: 45, basePrice: 80 },
};

export default function ScheduleScreen() {
  const { serviceId } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');

  const service = MOCK_SERVICES[serviceId as keyof typeof MOCK_SERVICES];

  const handleBack = () => {
    router.back();
  };

  const handleDateTimeSelect = (date: string, time: string, frequency: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedFrequency(frequency);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime || !selectedFrequency) {
      Alert.alert('Missing Selection', 'Please select date, time, and frequency before continuing.');
      return;
    }

    router.push({
      pathname: '/pricing',
      params: {
        serviceId,
        date: selectedDate,
        time: selectedTime,
        frequency: selectedFrequency,
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

  const isComplete = selectedDate && selectedTime && selectedFrequency;

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
          <Text style={styles.headerTitle}>Schedule Service</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Calendar color={CervColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Schedule your {service.name}</Text>
            <Text style={styles.subtitle}>
              Choose when you&apos;d like your service to begin
            </Text>
          </View>

          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDetails}>
              Duration: {service.duration} minutes • Starting from ${service.basePrice}
            </Text>
          </View>

          <SchedulingComponent
            onDateTimeSelect={handleDateTimeSelect}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedFrequency={selectedFrequency}
          />

          {isComplete && (
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Scheduling Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service:</Text>
                <Text style={styles.summaryValue}>{service.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frequency:</Text>
                <Text style={styles.summaryValue}>
                  {selectedFrequency === 'bi-weekly' ? 'Bi-weekly' : 
                   selectedFrequency === 'one-time' ? 'One-time' :
                   selectedFrequency.charAt(0).toUpperCase() + selectedFrequency.slice(1)}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.continueButton, !isComplete && styles.disabledButton]} 
            onPress={handleContinue}
            disabled={!isComplete}
          >
            <LinearGradient
              colors={[CervColors.systemBlue, CervColors.systemBlue]}
              style={[
              styles.blueButtonBackground,
              !isComplete && { backgroundColor: '#9CA3AF' }
            ]}>
              <Text style={styles.continueButtonText}>Continue to Pricing</Text>
            </LinearGradient>
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
    backgroundColor: CervColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CervColors.separator,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CervColors.systemGray5,
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
    backgroundColor: CervColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...CervTypography.title1,
    color: CervColors.label,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 300,
  },
  serviceInfo: {
    backgroundColor: CervColors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.label,
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CervColors.secondaryLabel,
  },
  summary: {
    backgroundColor: CervColors.systemBlueLight,
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 1,
    borderColor: CervColors.systemBlue,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemBlue,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CervColors.systemBlue,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemBlue,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: CervColors.separator,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
  },
  blueButtonBackground: {
    backgroundColor: CervColors.systemBlue,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.white,
  },
});