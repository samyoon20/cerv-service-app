import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Settings, Calendar, Pause, Play, CreditCard as Edit3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_ACTIVE_SERVICES = [
  {
    id: '1',
    name: 'Pool Maintenance',
    frequency: 'Weekly',
    nextDate: '2024-01-15',
    price: 89,
    status: 'active',
    technician: 'Mike Johnson'
  },
  {
    id: '2',
    name: 'Landscaping',
    frequency: 'Bi-weekly',
    nextDate: '2024-01-18',
    price: 65,
    status: 'active',
    technician: 'Sarah Wilson'
  },
  {
    id: '3',
    name: 'Exterior Cleaning',
    frequency: 'Monthly',
    nextDate: '2024-02-10',
    price: 110,
    status: 'paused',
    technician: 'David Chen'
  },
];

const AVAILABLE_ADDONS = [
  {
    id: '1',
    name: 'Window Cleaning',
    description: 'Interior and exterior window cleaning',
    price: 75,
  },
  {
    id: '2',
    name: 'Gutter Cleaning',
    description: 'Gutter cleaning and inspection',
    price: 120,
  },
  {
    id: '3',
    name: 'Deck Staining',
    description: 'Deck cleaning and protective staining',
    price: 200,
  },
];

export default function ServicesTab() {
  const [activeSection, setActiveSection] = useState<'active' | 'addons'>('active');

  const handleAddService = () => {
    router.push('/services');
  };

  const handleServiceAction = (serviceId: string, action: 'pause' | 'resume' | 'edit') => {
    const service = MOCK_ACTIVE_SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    switch (action) {
      case 'pause':
        Alert.alert(
          'Pause Service',
          `Are you sure you want to pause ${service.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Pause', onPress: () => Alert.alert('Service Paused', `${service.name} has been paused.`) }
          ]
        );
        break;
      case 'resume':
        Alert.alert('Service Resumed', `${service.name} has been resumed.`);
        break;
      case 'edit':
        Alert.alert('Edit Service', `Editing options for ${service.name} will be available soon.`);
        break;
    }
  };

  const handleAddonSelect = (addon: typeof AVAILABLE_ADDONS[0]) => {
    Alert.alert(
      'Add Service',
      `Add ${addon.name} for $${addon.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add Service', 
          onPress: () => Alert.alert('Service Added', `${addon.name} has been added to your services.`) 
        }
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
            <Text style={styles.headerTitle}>My Services</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
              <LinearGradient
                colors={['#00D4AA', '#00B894']}
                style={styles.addButtonGradient}
              >
                <Plus color="#0F1629" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'active' && styles.activeTab]}
              onPress={() => setActiveSection('active')}
            >
              <Text style={[
                styles.tabText,
                activeSection === 'active' && styles.activeTabText
              ]}>
                Active Services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'addons' && styles.activeTab]}
              onPress={() => setActiveSection('addons')}
            >
              <Text style={[
                styles.tabText,
                activeSection === 'addons' && styles.activeTabText
              ]}>
                Add-ons
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {activeSection === 'active' && (
              <View style={styles.activeServices}>
                {MOCK_ACTIVE_SERVICES.map(service => (
                  <LinearGradient
                    key={service.id}
                    colors={['#1E2A3A', '#243447']}
                    style={styles.serviceCard}
                  >
                    <View style={styles.serviceHeader}>
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceFrequency}>{service.frequency}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        service.status === 'active' ? styles.activeBadge : styles.pausedBadge
                      ]}>
                        <Text style={[
                          styles.statusText,
                          service.status === 'active' ? styles.activeStatusText : styles.pausedStatusText
                        ]}>
                          {service.status === 'active' ? 'Active' : 'Paused'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.serviceDetails}>
                      <View style={styles.detailRow}>
                        <Calendar color="#8B9DC3" size={16} />
                        <Text style={styles.detailText}>
                          Next: {new Date(service.nextDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.priceText}>${service.price}/visit</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.technicianText}>with {service.technician}</Text>
                      </View>
                    </View>

                    <View style={styles.serviceActions}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleServiceAction(service.id, 'edit')}
                      >
                        <Edit3 color="#8B9DC3" size={16} />
                        <Text style={styles.actionButtonText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleServiceAction(
                          service.id, 
                          service.status === 'active' ? 'pause' : 'resume'
                        )}
                      >
                        {service.status === 'active' ? (
                          <Pause color="#8B9DC3" size={16} />
                        ) : (
                          <Play color="#00D4AA" size={16} />
                        )}
                        <Text style={[
                          styles.actionButtonText,
                          service.status === 'paused' && styles.resumeButtonText
                        ]}>
                          {service.status === 'active' ? 'Pause' : 'Resume'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                ))}

                {MOCK_ACTIVE_SERVICES.length === 0 && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateTitle}>No active services</Text>
                    <Text style={styles.emptyStateText}>
                      Add your first service to get started
                    </Text>
                    <TouchableOpacity style={styles.addFirstServiceButton} onPress={handleAddService}>
                      <LinearGradient
                        colors={['#00D4AA', '#00B894']}
                        style={styles.gradientButton}
                      >
                        <Plus color="#0F1629" size={20} />
                        <Text style={styles.addFirstServiceButtonText}>Add Service</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {activeSection === 'addons' && (
              <View style={styles.addonsSection}>
                <Text style={styles.sectionSubtitle}>
                  Enhance your home maintenance with these additional services
                </Text>
                
                {AVAILABLE_ADDONS.map(addon => (
                  <LinearGradient
                    key={addon.id}
                    colors={['#1E2A3A', '#243447']}
                    style={styles.addonCard}
                  >
                    <View style={styles.addonInfo}>
                      <Text style={styles.addonName}>{addon.name}</Text>
                      <Text style={styles.addonDescription}>{addon.description}</Text>
                      <Text style={styles.addonPrice}>${addon.price}</Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.addonButton}
                      onPress={() => handleAddonSelect(addon)}
                    >
                      <Plus color="#00D4AA" size={20} />
                      <Text style={styles.addonButtonText}>Add</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ))}
              </View>
            )}

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
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    margin: 24,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
  activeTabText: {
    color: '#00D4AA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  activeServices: {
    gap: 16,
  },
  serviceCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  serviceFrequency: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  pausedBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  activeStatusText: {
    color: '#00D4AA',
  },
  pausedStatusText: {
    color: '#FFB800',
  },
  serviceDetails: {
    gap: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#00D4AA',
    letterSpacing: -0.2,
  },
  technicianText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
  },
  resumeButtonText: {
    color: '#00D4AA',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    textAlign: 'center',
    marginBottom: 32,
  },
  addFirstServiceButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addFirstServiceButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#0F1629',
    letterSpacing: -0.2,
  },
  addonsSection: {
    gap: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
    lineHeight: 24,
  },
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  addonInfo: {
    flex: 1,
    marginRight: 16,
  },
  addonName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  addonDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
    lineHeight: 20,
  },
  addonPrice: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#00D4AA',
    letterSpacing: -0.2,
  },
  addonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
    gap: 6,
  },
  addonButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#00D4AA',
  },
  bottomSpacing: {
    height: 20,
  },
});