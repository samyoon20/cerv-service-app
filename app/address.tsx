import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CircleCheck as CheckCircle } from 'lucide-react-native';
import { CervColors, CervTypography, CervBorderRadius, CervSpacing } from '@/themes/appleDesignSystem';

export default function AddressScreen() {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (isVerified) setIsVerified(false);
  };

  const handleVerifyAddress = async () => {
    const { street, city, state, zipCode } = formData;
    
    if (!street.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      Alert.alert('Missing Information', 'Please fill in all address fields.');
      return;
    }

    setIsLoading(true);
    
    // Simulate Zillow API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful verification
      setIsVerified(true);
      
      setTimeout(() => {
        router.push('/services');
      }, 1500);
      
    } catch {
      Alert.alert('Verification Failed', 'Unable to verify address. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lightBackgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CervColors.label} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Address</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <MapPin color={CervColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>What's your property address?</Text>
            <Text style={styles.subtitle}>
              We'll use this to recommend the best services for your home and verify your property details
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Street Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your street address"
                placeholderTextColor={CervColors.tertiaryLabel}
                value={formData.street}
                onChangeText={(value) => handleInputChange('street', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City name"
                  placeholderTextColor={CervColors.tertiaryLabel}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CA"
                  placeholderTextColor={CervColors.tertiaryLabel}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ZIP Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter ZIP code"
                placeholderTextColor={CervColors.tertiaryLabel}
                value={formData.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
          </View>

          {isVerified && (
            <View style={styles.verificationSuccess}>
              <CheckCircle color={CervColors.systemBlue} size={24} />
              <Text style={styles.verificationText}>Address verified successfully!</Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why do we need this?</Text>
            <Text style={styles.infoText}>
              • Get personalized service recommendations{'\n'}
              • Verify property details for accurate pricing{'\n'}
              • Connect you with local service providers{'\n'}
              • Calculate your Home Score accurately
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.verifyButton, isLoading && styles.disabledButton]} 
            onPress={handleVerifyAddress}
            disabled={isLoading || isVerified}
          >
            <View style={[
              styles.blueButtonBackground,
              isVerified && { backgroundColor: CervColors.systemBlue }
            ]}>
              {isLoading ? (
                <ActivityIndicator color={CervColors.white} size="small" />
              ) : isVerified ? (
                <>
                  <CheckCircle color={CervColors.white} size={20} />
                  <Text style={styles.verifyButtonText}>Verified</Text>
                </>
              ) : (
                <Text style={styles.verifyButtonText}>Verify Address</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  lightBackgroundContainer: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.lg,
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
    paddingHorizontal: CervSpacing.xxl,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: CervSpacing.xxxl,
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CervColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CervSpacing.xxl,
  },
  title: {
    ...CervTypography.title1,
    color: CervColors.label,
    textAlign: 'center',
    marginBottom: CervSpacing.md,
  },
  subtitle: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  form: {
    marginBottom: CervSpacing.xxxl,
  },
  inputGroup: {
    marginBottom: CervSpacing.xxl,
  },
  inputRow: {
    flexDirection: 'row',
    gap: CervSpacing.lg,
  },
  label: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: CervSpacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: CervColors.separator,
    borderRadius: CervBorderRadius.large,
    paddingHorizontal: CervSpacing.lg,
    paddingVertical: CervSpacing.lg,
    ...CervTypography.body,
    backgroundColor: CervColors.cardBackground,
    color: CervColors.label,
  },
  verificationSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CervColors.systemBlueLight,
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xl,
    borderRadius: CervBorderRadius.large,
    marginBottom: CervSpacing.xxl,
    gap: CervSpacing.sm,
    borderWidth: 1,
    borderColor: CervColors.systemBlue,
  },
  verificationText: {
    ...CervTypography.headline,
    color: CervColors.systemBlue,
  },
  infoCard: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xxl,
    borderRadius: CervBorderRadius.large,
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  infoTitle: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: CervSpacing.md,
  },
  infoText: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
  },
  bottomSection: {
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.xxl,
    borderTopWidth: 1,
    borderTopColor: CervColors.separator,
  },
  verifyButton: {
    borderRadius: CervBorderRadius.large,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.7,
  },
  blueButtonBackground: {
    backgroundColor: CervColors.systemBlue,
    paddingVertical: CervSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: CervSpacing.sm,
  },
  verifyButtonText: {
    ...CervTypography.headline,
    color: CervColors.white,
  },
});