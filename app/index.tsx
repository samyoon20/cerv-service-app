import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Chrome as Home, Shield, Clock, Star } from 'lucide-react-native';
import { CervColors, CervTypography, CervBorderRadius, CervSpacing } from '@/themes/appleDesignSystem';

export default function OnboardingScreen() {
  const handleSkip = () => {
    router.push('/auth');
  };

  const handleContinue = () => {
    router.push('/auth');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Home color={CervColors.white} size={40} />
            </View>
            <Text style={styles.logoText}>Cerv</Text>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.title}>Your Home's Best Friend</Text>
            <Text style={styles.subtitle}>
              Book, track, and manage all your home maintenance services through one beautiful app
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Shield color={CervColors.systemGreen} size={24} />
              <Text style={styles.featureText}>Verified Professionals</Text>
            </View>
            <View style={styles.feature}>
              <Clock color={CervColors.systemGreen} size={24} />
              <Text style={styles.featureText}>Flexible Scheduling</Text>
            </View>
            <View style={styles.feature}>
              <Star color={CervColors.systemGreen} size={24} />
              <Text style={styles.featureText}>Premium Service</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <View style={styles.continueButtonBackground}>
                <Text style={styles.continueButtonText}>Get Started</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CervColors.systemGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CervSpacing.lg,
  },
  logoText: {
    ...CervTypography.largeTitle,
    color: CervColors.white,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: CervSpacing.xl,
  },
  title: {
    ...CervTypography.largeTitle,
    color: CervColors.white,
    textAlign: 'center',
    marginBottom: CervSpacing.lg,
  },
  subtitle: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  featuresContainer: {
    paddingHorizontal: CervSpacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CervSpacing.xl,
    backgroundColor: CervColors.cardBackground,
    paddingHorizontal: CervSpacing.xl,
    paddingVertical: CervSpacing.lg,
    borderRadius: CervBorderRadius.large,
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  featureText: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginLeft: CervSpacing.md,
  },
  buttonContainer: {
    gap: CervSpacing.lg,
  },
  continueButton: {
    borderRadius: CervBorderRadius.large,
    overflow: 'hidden',
  },
  continueButtonBackground: {
    backgroundColor: CervColors.systemGreen,
    paddingVertical: CervSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    ...CervTypography.headline,
    color: CervColors.white,
  },
  skipButton: {
    paddingVertical: CervSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    ...CervTypography.callout,
    color: CervColors.tertiaryLabel,
  },
});