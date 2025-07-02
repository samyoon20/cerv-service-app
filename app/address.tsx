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
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CircleCheck as CheckCircle } from 'lucide-react-native';

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
      
    } catch (error) {
      Alert.alert('Verification Failed', 'Unable to verify address. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
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
          <Text style={styles.headerTitle}>Property Address</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <MapPin color="#00D4AA" size={32} />
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
                placeholderTextColor="#94A3B8"
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
                  placeholderTextColor="#94A3B8"
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
                  placeholderTextColor="#94A3B8"
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
                placeholderTextColor="#94A3B8"
                value={formData.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
          </View>

          {isVerified && (
            <View style={styles.verificationSuccess}>
              <CheckCircle color="#00D4AA" size={24} />
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
            <LinearGradient
              colors={isVerified ? ['#00D4AA', '#00D4AA'] : ['#00D4AA', '#00B894']}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : isVerified ? (
                <>
                  <CheckCircle color="#ffffff" size={20} />
                  <Text style={styles.verifyButtonText}>Verified</Text>
                </>
              ) : (
                <Text style={styles.verifyButtonText}>Verify Address</Text>
              )}
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
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 12,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#334155',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  verificationSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  verificationText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#065F46',
    letterSpacing: -0.2,
  },
  infoCard: {
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  infoTitle: {
    fontSize: 17,
    fontFamily: 'Nunito-SemiBold',
    color: '#334155',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  verifyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  verifyButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
});