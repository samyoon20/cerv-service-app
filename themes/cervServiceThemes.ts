export interface CervServiceTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  lightColor: string;
  textColor: string;
  isActive: boolean;
}

export const CERV_SERVICE_THEMES: Record<string, CervServiceTheme> = {
  pool: {
    id: 'pool',
    name: 'Pool Maintenance',
    primaryColor: '#e39ac4',
    secondaryColor: '#d688b5',
    lightColor: '#f5e6f0',
    textColor: '#FFFFFF',
    isActive: true,
  },
  landscape: {
    id: 'landscape',
    name: 'Landscaping',
    primaryColor: '#196f62',
    secondaryColor: '#145a4f',
    lightColor: '#e3f2f0',
    textColor: '#FFFFFF',
    isActive: true,
  },
  exterior: {
    id: 'exterior',
    name: 'Exterior Cleaning',
    primaryColor: '#633737',
    secondaryColor: '#4d2a2a',
    lightColor: '#f0e8e8',
    textColor: '#FFFFFF',
    isActive: true,
  },
  pest: {
    id: 'pest',
    name: 'Pest Control',
    primaryColor: '#5a1e84',
    secondaryColor: '#481669',
    lightColor: '#ede5f5',
    textColor: '#FFFFFF',
    isActive: false,
  },
  tree: {
    id: 'tree',
    name: 'Tree Services',
    primaryColor: '#dcd7bb',
    secondaryColor: '#cbc5a5',
    lightColor: '#f5f3ed',
    textColor: '#333333',
    isActive: false,
  },
  janitorial: {
    id: 'janitorial',
    name: 'Janitorial Services',
    primaryColor: '#ded7c9',
    secondaryColor: '#d0c7b7',
    lightColor: '#f2efea',
    textColor: '#333333',
    isActive: false,
  },
  waste: {
    id: 'waste',
    name: 'Waste Management',
    primaryColor: '#af5348',
    secondaryColor: '#93433a',
    lightColor: '#f1e8e7',
    textColor: '#FFFFFF',
    isActive: false,
  },
};

export function getCervServiceTheme(serviceKey: string): CervServiceTheme {
  return CERV_SERVICE_THEMES[serviceKey] || CERV_SERVICE_THEMES.pool;
}

export function getServiceGradient(serviceKey: string): [string, string] {
  const theme = getCervServiceTheme(serviceKey);
  return [theme.primaryColor, theme.secondaryColor];
}