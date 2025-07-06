// Cerv dark design system
export const CervColors = {
  // Dark Theme Backgrounds
  background: '#1C1C1E',
  secondaryBackground: '#2C2C2E',
  tertiaryBackground: '#3A3A3C',
  groupedBackground: '#000000',
  
  // Card/Surface Colors
  cardBackground: '#2C2C2E',
  elevatedBackground: '#3A3A3C',
  
  // Text Colors (Dark Mode)
  label: '#FFFFFF',
  secondaryLabel: '#EBEBF5',
  tertiaryLabel: '#EBEBF599',
  quaternaryLabel: '#EBEBF52E',
  
  // Separator Colors (Dark Mode)
  separator: '#54545899',
  opaqueSeparator: '#38383A',
  
  // Fill Colors (Dark Mode)
  systemFill: '#7878805C',
  secondarySystemFill: '#78788052',
  tertiarySystemFill: '#7676803D',
  quaternarySystemFill: '#7676802E',
  
  // Dark Theme Grays
  systemGray: '#8E8E93',
  systemGray2: '#636366',
  systemGray3: '#48484A',
  systemGray4: '#3A3A3C',
  systemGray5: '#2C2C2E',
  systemGray6: '#1C1C1E',
  
  // System Accent Colors (Dark Mode Compatible)
  systemBlue: '#0A84FF',
  systemBlueLight: '#0A84FF33',
  
  // Success Colors (Dark Mode) - GLOBAL CERV GREEN
  systemGreen: '#30D158', // THIS IS THE OFFICIAL CERV GREEN - USE EVERYWHERE
  systemGreenLight: '#30D15833',
  
  // Legacy aliases for consistency (all point to same green)
  cervGreen: '#30D158',
  cervGreenLight: '#30D15833',
  
  // Light Grey/White/Tan Accent Colors for Cerv
  cervLightGray: '#F5F5F7',
  cervMediumGray: '#E5E5EA',
  cervDarkGray: '#C7C7CC',
  cervTan: '#F2F1F0',
  cervCream: '#FEFEFE',
  cervWarmGray: '#F7F6F4',
  
  // Accent backgrounds using light colors
  accentBackground: '#F5F5F7',
  accentBackgroundLight: '#F5F5F733',
  secondaryAccent: '#E5E5EA',
  secondaryAccentLight: '#E5E5EA33',
  
  // Destructive Colors (Dark Mode)
  systemRed: '#FF453A',
  systemRedLight: '#FF453A33',
  
  // Warning Colors (Dark Mode)
  systemOrange: '#FF9F0A',
  systemOrangeLight: '#FF9F0A33',
  
  // Additional Dark Theme Colors
  white: '#FFFFFF',
  lightGray: '#F2F2F7',
  mediumGray: '#8E8E93',
  darkGray: '#48484A',
};

export const CervShadows = {
  // Dark theme shadows - more subtle with darker colors
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  
  // Inner glow effects for dark theme
  innerGlow: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
};

export const CervSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const CervTypography = {
  // Cerv-style typography scale with proper font stack
  largeTitle: {
    fontSize: 34,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  
  title1: {
    fontSize: 28,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  
  title2: {
    fontSize: 22,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  
  title3: {
    fontSize: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  
  headline: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  body: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  callout: {
    fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  
  subheadline: {
    fontSize: 15,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  
  footnote: {
    fontSize: 13,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  
  caption1: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  caption2: {
    fontSize: 11,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 13,
    letterSpacing: 0.07,
  },
};

export const CervBorderRadius = {
  small: 6,
  medium: 8,
  large: 12,
  extraLarge: 16,
  round: 50,
};