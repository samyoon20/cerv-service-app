import { Tabs } from 'expo-router';
import { Chrome as Home, Wrench, MessageCircle, User } from 'lucide-react-native';
import { CervColors, CervTypography } from '@/themes/appleDesignSystem';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: CervColors.systemGreen,
        tabBarInactiveTintColor: CervColors.systemGray,
        tabBarStyle: {
          backgroundColor: CervColors.cardBackground,
          borderTopWidth: 0.5,
          borderTopColor: CervColors.separator,
          paddingTop: 6,
          paddingBottom: 34, // Account for safe area
          height: 83,
        },
        tabBarLabelStyle: {
          ...CervTypography.caption2,
          fontWeight: 500,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ size, color }) => (
            <Wrench size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}