import { Tabs } from 'expo-router';
import { Chrome as Home, Wrench, MessageCircle, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00D4AA',
        tabBarInactiveTintColor: '#8B9DC3',
        tabBarStyle: {
          backgroundColor: '#1A2332',
          borderTopWidth: 1,
          borderTopColor: 'rgba(139, 157, 195, 0.1)',
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Nunito-SemiBold',
          marginTop: 4,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#1A2332', '#0F1629']}
            style={{ flex: 1 }}
          />
        ),
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