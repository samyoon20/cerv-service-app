import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Chrome as Home } from 'lucide-react-native';
import { CervColors, CervTypography, CervBorderRadius, CervSpacing } from '@/themes/appleDesignSystem';

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
        <View style={styles.backgroundContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft color={CervColors.label} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Welcome to Cerv</Text>
              <Text style={styles.subtitle}>
                Let's get your home maintenance journey started
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
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Continue</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedMode === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft color={CervColors.label} size={24} />
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
                For this demo, we'll take you directly to your dashboard
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CervColors.label} size={24} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Home color={CervColors.systemGreen} size={24} />
            <Text style={styles.logoText}>Cerv</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Let's get started</Text>
            <Text style={styles.subtitle}>
              Choose how you'd like to continue with Cerv
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => setSelectedMode('signup')}
            >
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setSelectedMode('login')}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
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
  backgroundContainer: {
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CervSpacing.sm,
  },
  logoText: {
    ...CervTypography.title3,
    color: CervColors.label,
  },
  content: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    paddingTop: 40,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
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
    maxWidth: 280,
  },
  buttonGroup: {
    gap: CervSpacing.lg,
    marginTop: 'auto',
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: CervBorderRadius.large,
    overflow: 'hidden',
  },
  primaryButtonBackground: {
    backgroundColor: CervColors.systemGreen,
    paddingVertical: CervSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...CervTypography.headline,
    color: CervColors.white,
  },
  secondaryButton: {
    paddingVertical: CervSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: CervColors.separator,
    borderRadius: CervBorderRadius.large,
  },
  secondaryButtonText: {
    ...CervTypography.headline,
    color: CervColors.label,
  },
  benefitsList: {
    marginBottom: 40,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: CervSpacing.xxl,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CervColors.systemGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CervSpacing.lg,
  },
  benefitEmoji: {
    fontSize: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: CervSpacing.xs,
  },
  benefitText: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
  },
  termsText: {
    ...CervTypography.caption1,
    color: CervColors.tertiaryLabel,
    textAlign: 'center',
    marginTop: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xl,
  },
  loginPrompt: {
    backgroundColor: CervColors.systemGreenLight,
    padding: CervSpacing.xl,
    borderRadius: CervBorderRadius.medium,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: CervColors.systemGreen,
  },
  loginPromptText: {
    ...CervTypography.subheadline,
    fontWeight: '500',
    color: CervColors.systemGreen,
    textAlign: 'center',
  },
});