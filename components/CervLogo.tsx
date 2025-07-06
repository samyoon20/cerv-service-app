import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface CervLogoProps {
  variant?: 'horizontal' | 'vertical' | 'compact' | 'service';
  service?: 'pool' | 'landscape' | 'exterior' | 'pest' | 'tree' | 'janitorial' | 'waste';
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export default function CervLogo({ 
  variant = 'horizontal', 
  service, 
  size = 'medium',
  style 
}: CervLogoProps) {
  
  const getImageSize = () => {
    if (variant === 'compact') {
      switch (size) {
        case 'small': return { width: 32, height: 32 };
        case 'large': return { width: 64, height: 64 };
        default: return { width: 48, height: 48 };
      }
    }
    
    if (variant === 'vertical' || (variant === 'service' && service)) {
      switch (size) {
        case 'small': return { width: 80, height: 40 };
        case 'large': return { width: 200, height: 100 };
        default: return { width: 120, height: 60 };
      }
    }
    
    // Horizontal variant
    switch (size) {
      case 'small': return { width: 120, height: 30 };
      case 'large': return { width: 240, height: 60 };
      default: return { width: 180, height: 45 };
    }
  };

  // Compact variant - show CERV icon only
  if (variant === 'compact') {
    return (
      <View style={[styles.imageContainer, style]}>
        <Image 
          source={require('@/assets/images/cerv-logo-icon.png')}
          style={[styles.iconImage, getImageSize()]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Service variant - show service-specific logos
  if (variant === 'service' && service) {
    // For now, use the services icons image - you could create individual service logos later
    return (
      <View style={[styles.imageContainer, style]}>
        <Image 
          source={require('@/assets/images/cerv-services-icons.png')}
          style={[styles.serviceImage, getImageSize()]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Vertical variant - show main CERV Property Solutions logo (vertical layout)
  if (variant === 'vertical') {
    return (
      <View style={[styles.imageContainer, style]}>
        <Image 
          source={require('@/assets/images/cerv-logo-vertical.png')}
          style={[styles.mainImage, getImageSize()]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Default horizontal - show main CERV Property Solutions logo (horizontal layout)
  return (
    <View style={[styles.imageContainer, style]}>
      <Image 
        source={require('@/assets/images/cerv-logo-horizontal.png')}
        style={[styles.mainImage, getImageSize()]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Image container for all logo variants
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Main CERV logo image styles (horizontal/vertical)
  mainImage: {
    // Size controlled by getImageSize()
  },
  
  // Icon-only logo image styles (compact variant)
  iconImage: {
    // Size controlled by getImageSize()
  },
  
  // Service-specific logo image styles
  serviceImage: {
    // Size controlled by getImageSize()
  },
});