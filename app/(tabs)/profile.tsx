import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard, MapPin, Bell, CircleHelp as HelpCircle, Shield, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileTab() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing will be available soon.');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Manage your payment methods here.');
  };

  const handleAddresses = () => {
    Alert.alert('Addresses', 'Manage your service addresses here.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact our support team for assistance.');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy', 'Review our privacy policy and data handling.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          Alert.alert('Signed Out', 'You have been signed out successfully.');
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F1629', '#1A2332']}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 color="#8B9DC3" size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Profile Card */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.profileCard}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User color="#00D4AA" size={32} />
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
                <Text style={styles.profileAddress}>123 Main Street, Beverly Hills, CA 90210</Text>
              </View>
            </LinearGradient>

            {/* Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <CreditCard color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Payment Methods</Text>
                      <Text style={styles.menuSubtitle}>Manage cards and payment options</Text>
                    </View>
                  </View>
                  <ChevronRight color="#8B9DC3" size={20} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Service Addresses</Text>
                      <Text style={styles.menuSubtitle}>Manage your property locations</Text>
                    </View>
                  </View>
                  <ChevronRight color="#8B9DC3" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <View style={styles.menuItem}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Bell color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Push Notifications</Text>
                      <Text style={styles.menuSubtitle}>Service updates and reminders</Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: 'rgba(139, 157, 195, 0.2)', true: 'rgba(0, 212, 170, 0.3)' }}
                    thumbColor={notificationsEnabled ? '#00D4AA' : '#8B9DC3'}
                  />
                </LinearGradient>
              </View>

              <View style={styles.menuItem}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Location Services</Text>
                      <Text style={styles.menuSubtitle}>For better service matching</Text>
                    </View>
                  </View>
                  <Switch
                    value={locationEnabled}
                    onValueChange={setLocationEnabled}
                    trackColor={{ false: 'rgba(139, 157, 195, 0.2)', true: 'rgba(0, 212, 170, 0.3)' }}
                    thumbColor={locationEnabled ? '#00D4AA' : '#8B9DC3'}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Support Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <HelpCircle color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Help & Support</Text>
                      <Text style={styles.menuSubtitle}>Get help with your services</Text>
                    </View>
                  </View>
                  <ChevronRight color="#8B9DC3" size={20} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Shield color="#8B9DC3" size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Privacy & Security</Text>
                      <Text style={styles.menuSubtitle}>Data protection and security</Text>
                    </View>
                  </View>
                  <ChevronRight color="#8B9DC3" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Account Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Account Stats</Text>
              
              <View style={styles.statsGrid}>
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statCard}
                >
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Services Completed</Text>
                </LinearGradient>
                
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statCard}
                >
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Active Services</Text>
                </LinearGradient>
                
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statCard}
                >
                  <Text style={styles.statValue}>8.7</Text>
                  <Text style={styles.statLabel}>Home Score</Text>
                </LinearGradient>
                
                <LinearGradient
                  colors={['#1E2A3A', '#243447']}
                  style={styles.statCard}
                >
                  <Text style={styles.statValue}>6mo</Text>
                  <Text style={styles.statLabel}>Member Since</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Sign Out */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
              <LinearGradient
                colors={['rgba(255, 107, 107, 0.1)', 'rgba(255, 107, 107, 0.05)']}
                style={styles.signOutGradient}
              >
                <LogOut color="#FF6B6B" size={20} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
  },
  profileAddress: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  menuItem: {
    borderRadius: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  menuItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#00D4AA',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    textAlign: 'center',
  },
  signOutButton: {
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FF6B6B',
    letterSpacing: -0.2,
  },
  bottomSpacing: {
    height: 20,
  },
});