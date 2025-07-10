// Apple-inspired light design system for Cerv
export const CervColors = {
  // Light Theme Backgrounds (Apple-inspired)
  background: '#F2F2F7',
  secondaryBackground: '#FFFFFF',
  tertiaryBackground: '#F2F2F7',
  groupedBackground: '#F2F2F7',
  
  // Card/Surface Colors
  cardBackground: '#FFFFFF',
  elevatedBackground: '#FFFFFF',
  
  // Text Colors (Light Mode)
  label: '#000000',
  secondaryLabel: '#3C3C43CC',
  tertiaryLabel: '#3C3C4399',
  quaternaryLabel: '#3C3C432E',
  
  // Separator Colors (Light Mode)
  separator: '#C6C6C8',
  opaqueSeparator: '#C6C6C8',
  
  // Fill Colors (Light Mode)
  systemFill: '#78788014',
  secondarySystemFill: '#78788028',
  tertiarySystemFill: '#7676801C',
  quaternarySystemFill: '#76768014',
  
  // Apple-inspired Grays (Lighter for better readability)
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
  
  // System Colors (Apple-inspired) - Blue theme
  systemBlue: '#8BB5E8',
  systemBlueLight: '#8BB5E81A',
  
  // Primary Colors (Blue instead of green)
  systemGreen: '#8BB5E8',
  systemGreenLight: '#8BB5E81A',
  
  // Destructive Colors
  systemRed: '#FF3B30',
  systemRedLight: '#FF3B301A',
  
  // Warning Colors
  systemOrange: '#FF9500',
  systemOrangeLight: '#FF95001A',
  
  // Apple White/Light Colors  
  white: '#FFFFFF',
  lightGray: '#F2F2F7',
  mediumGray: '#C7C7CC',
  darkGray: '#8E8E93',
  
  // Accent colors for contrast
  accentBackground: '#F2F2F7',
  accentBackgroundLight: '#F2F2F733',
};

export const CervShadows = {
  // Apple-style shadows for light theme
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
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
  // Apple San Francisco font system
  largeTitle: {
    fontSize: 34,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  
  title1: {
    fontSize: 28,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  
  title2: {
    fontSize: 22,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  
  title3: {
    fontSize: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  
  headline: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  body: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  callout: {
    fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  
  subheadline: {
    fontSize: 15,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  
  footnote: {
    fontSize: 13,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  
  caption1: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  caption2: {
    fontSize: 11,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
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