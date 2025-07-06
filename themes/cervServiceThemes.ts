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
    lightColor: '#e39ac433',
    textColor: '#FFFFFF',
    isActive: true,
  },
  landscape: {
    id: 'landscape',
    name: 'Landscaping',
    primaryColor: '#196f62',
    secondaryColor: '#145a4f',
    lightColor: '#196f6233',
    textColor: '#FFFFFF',
    isActive: true,
  },
  exterior: {
    id: 'exterior',
    name: 'Exterior Cleaning',
    primaryColor: '#633737',
    secondaryColor: '#4d2a2a',
    lightColor: '#63373733',
    textColor: '#FFFFFF',
    isActive: true,
  },
  pest: {
    id: 'pest',
    name: 'Pest Control',
    primaryColor: '#5a1e84',
    secondaryColor: '#481669',
    lightColor: '#5a1e8433',
    textColor: '#FFFFFF',
    isActive: false,
  },
  tree: {
    id: 'tree',
    name: 'Tree Services',
    primaryColor: '#dcd7bb',
    secondaryColor: '#cbc5a5',
    lightColor: '#dcd7bb33',
    textColor: '#333333',
    isActive: false,
  },
  janitorial: {
    id: 'janitorial',
    name: 'Janitorial Services',
    primaryColor: '#ded7c9',
    secondaryColor: '#d0c7b7',
    lightColor: '#ded7c933',
    textColor: '#333333',
    isActive: false,
  },
  waste: {
    id: 'waste',
    name: 'Waste Management',
    primaryColor: '#af5348',
    secondaryColor: '#93433a',
    lightColor: '#af534833',
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