import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Chrome as Home } from 'lucide-react-native';
import { CervColors } from '@/themes/appleDesignSystem';

export default function AuthScreen() {
  const [selectedMode, setSelectedMode] = useState<'signup' | 'login' | null>(null);

  const handleBack = () => {
    if (selectedMode) {
      setSelectedMode(null);
    } else {
      router.back();
    }
  };

  const handleSignUp = () => {
    // Skip credential collection, go directly to address verification
    router.push('/address');
  };

  const handleLogin = () => {
    // For demo purposes, go directly to main app
    router.push('/(tabs)');
  };

  if (selectedMode === 'signup') {
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
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Welcome to Cerv</Text>
              <Text style={styles.subtitle}>
                Let&apos;s get your home maintenance journey started
              </Text>
            </View>

            <View style={styles.benefitsList}>
              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>🏠</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Personalized Recommendations</Text>
                  <Text style={styles.benefitText}>
                    Get service suggestions tailored to your specific property
                  </Text>
                </View>
              </View>

              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>📅</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Easy Scheduling</Text>
                  <Text style={styles.benefitText}>
                    Book one-time or recurring services that fit your schedule
                  </Text>
                </View>
              </View>

              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>💳</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Secure Payments</Text>
                  <Text style={styles.benefitText}>
                    Multiple payment options with secure processing
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
              <LinearGradient
                colors={[CervColors.systemGreen, CervColors.systemGreen]}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (selectedMode === 'login') {
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
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Good to see you again</Text>
              <Text style={styles.subtitle}>
                Sign in to continue managing your home services
              </Text>
            </View>

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>
                For this demo, we&apos;ll take you directly to your dashboard
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <LinearGradient
                colors={[CervColors.systemGreen, CervColors.systemGreen]}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
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
          <View style={styles.logoContainer}>
            <Home color={CervColors.systemGreen} size={24} />
            <Text style={styles.logoText}>Cerv</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Let&apos;s get started</Text>
            <Text style={styles.subtitle}>
              Choose how you&apos;d like to continue with Cerv
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => setSelectedMode('signup')}
            >
              <LinearGradient
                colors={[CervColors.systemGreen, CervColors.systemGreen]}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setSelectedMode('login')}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  buttonGroup: {
    gap: 16,
    marginTop: 'auto',
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#ffffff',
  },
  secondaryButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 16,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#475569',
  },
  benefitsList: {
    marginBottom: 40,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CervColors.systemGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitEmoji: {
    fontSize: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  loginPrompt: {
    backgroundColor: CervColors.systemGreenLight,
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: CervColors.systemGreenLight,
  },
  loginPromptText: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#065F46',
    textAlign: 'center',
    lineHeight: 20,
  },
});