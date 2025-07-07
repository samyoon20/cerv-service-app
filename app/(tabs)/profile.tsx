import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView
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
              <Edit3 color={CervColors.secondaryLabel} size={20} />
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
                      <CreditCard color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Payment Methods</Text>
                      <Text style={styles.menuSubtitle}>Manage cards and payment options</Text>
                    </View>
                  </View>
                  <ChevronRight color={CervColors.tertiaryLabel} size={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Service Addresses</Text>
                      <Text style={styles.menuSubtitle}>Manage your property locations</Text>
                    </View>
                  </View>
                  <ChevronRight color={CervColors.tertiaryLabel} size={20} />
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
                      <Bell color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Push Notifications</Text>
                      <Text style={styles.menuSubtitle}>Service updates and reminders</Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: CervColors.systemGray4, true: CervColors.systemGreenLight }}
                    thumbColor={notificationsEnabled ? CervColors.systemGreen : CervColors.systemGray}
                  />
                </View>
              </View>

              <View style={styles.menuItem}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Location Services</Text>
                      <Text style={styles.menuSubtitle}>For better service matching</Text>
                    </View>
                  </View>
                  <Switch
                    value={locationEnabled}
                    onValueChange={setLocationEnabled}
                    trackColor={{ false: CervColors.systemGray4, true: CervColors.systemGreenLight }}
                    thumbColor={locationEnabled ? CervColors.systemGreen : CervColors.systemGray}
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
                      <HelpCircle color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Help & Support</Text>
                      <Text style={styles.menuSubtitle}>Get help with your services</Text>
                    </View>
                  </View>
                  <ChevronRight color={CervColors.tertiaryLabel} size={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Shield color={CervColors.secondaryLabel} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Privacy & Security</Text>
                      <Text style={styles.menuSubtitle}>Data protection and security</Text>
                    </View>
                  </View>
                  <ChevronRight color={CervColors.tertiaryLabel} size={20} />
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
                <LogOut color={CervColors.systemRed} size={20} />
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
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: CervColors.separator,
  },
  headerTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CervColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CervColors.separator,
  },
  content: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    paddingTop: CervSpacing.xl,
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
    marginBottom: CervSpacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CervColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CervColors.systemBlue,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    ...CervTypography.title2,
    color: CervColors.label,
    marginBottom: 4,
  },
  profileEmail: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    marginBottom: CervSpacing.sm,
  },
  profileAddress: {
    ...CervTypography.subheadline,
    color: CervColors.tertiaryLabel,
    textAlign: 'center',
  },
  section: {
    marginBottom: CervSpacing.xxxl,
  },
  sectionTitle: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: CervSpacing.lg,
  },
  menuItem: {
    borderRadius: CervBorderRadius.large,
    marginBottom: CervSpacing.sm,
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
    backgroundColor: CervColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CervSpacing.lg,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
  },
  statsSection: {
    marginBottom: CervSpacing.xxxl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CervSpacing.md,
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
    ...CervTypography.title2,
    color: CervColors.systemGreen,
    marginBottom: 4,
  },
  statLabel: {
    ...CervTypography.caption1,
    fontWeight: '600',
    color: CervColors.secondaryLabel,
    textAlign: 'center',
  },
  signOutButton: {
    borderRadius: CervBorderRadius.large,
    marginBottom: CervSpacing.xxxl,
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
    borderColor: CervColors.systemRed,
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.large,
  },
  signOutText: {
    ...CervTypography.callout,
    fontWeight: '700',
    color: CervColors.systemRed,
  },
  bottomSpacing: {
    height: CervSpacing.xl,
  },
});