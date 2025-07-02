import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Chrome as Home, Shield, Clock, Star } from 'lucide-react-native';

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
        <LinearGradient
          colors={['rgba(15, 22, 41, 0.7)', 'rgba(26, 35, 50, 0.8)']}
          style={styles.overlay}
        />
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Home color="#ffffff" size={40} />
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
              <Shield color="#00D4AA" size={24} />
              <Text style={styles.featureText}>Verified Professionals</Text>
            </View>
            <View style={styles.feature}>
              <Clock color="#00D4AA" size={24} />
              <Text style={styles.featureText}>Flexible Scheduling</Text>
            </View>
            <View style={styles.feature}>
              <Star color="#00D4AA" size={24} />
              <Text style={styles.featureText}>Premium Service</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <LinearGradient
                colors={['#00D4AA', '#00B894']}
                style={styles.gradientButton}
              >
                <Text style={styles.continueButtonText}>Get Started</Text>
              </LinearGradient>
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
    backgroundColor: '#0F1629',
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    borderWidth: 2,
    borderColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    color: '#ffffff',
    letterSpacing: -1,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#ffffff',
    marginLeft: 12,
    letterSpacing: -0.2,
  },
  buttonContainer: {
    gap: 16,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
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
  skipButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});