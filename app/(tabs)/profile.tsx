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
import { User, CreditCard, MapPin, Bell, CircleHelp as HelpCircle, Shield, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';
import { CervColors, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

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
      <View style={styles.backgroundContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 color="#8B9DC3" size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User color={CervColors.systemBlue} size={32} />
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
                <Text style={styles.profileAddress}>123 Main Street, Beverly Hills, CA 90210</Text>
              </View>
            </View>

            {/* Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
                <View style={styles.menuItemBackground}>
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
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
                <View style={styles.menuItemBackground}>
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
                </View>
              </TouchableOpacity>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <View style={styles.menuItem}>
                <View style={styles.menuItemBackground}>
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
                    thumbColor={notificationsEnabled ? CervColors.systemGreen : '#8B9DC3'}
                  />
                </View>
              </View>

              <View style={styles.menuItem}>
                <View style={styles.menuItemBackground}>
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
                    thumbColor={locationEnabled ? CervColors.systemGreen : '#8B9DC3'}
                  />
                </View>
              </View>
            </View>

            {/* Support Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
                <View style={styles.menuItemBackground}>
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
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
                <View style={styles.menuItemBackground}>
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
                </View>
              </TouchableOpacity>
            </View>

            {/* Account Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Account Stats</Text>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Services Completed</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Active Services</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>8.7</Text>
                  <Text style={styles.statLabel}>Home Score</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>6mo</Text>
                  <Text style={styles.statLabel}>Member Since</Text>
                </View>
              </View>
            </View>

            {/* Sign Out */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
              <View style={styles.signOutBackground}>
                <LogOut color="#FF6B6B" size={20} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: CervColors.background,
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
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.extraLarge,
    padding: CervSpacing.xxl,
    marginBottom: CervSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
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
  menuItemBackground: {
    backgroundColor: CervColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: CervSpacing.lg,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    borderRadius: CervBorderRadius.large,
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
    backgroundColor: CervColors.cardBackground,
    flex: 1,
    minWidth: '45%',
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: CervColors.systemGreen,
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
  signOutBackground: {
    backgroundColor: CervColors.systemRedLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CervColors.systemRedLight,
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.large,
  },
  signOutText: {
    ...CervTypography.callout,
    fontFamily: 'Nunito-Bold',
    color: CervColors.systemRed,
  },
  bottomSpacing: {
    height: 20,
  },
});