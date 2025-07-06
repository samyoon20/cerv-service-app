import React, { useState } from 'react';
import { CervColors, CervSpacing, CervBorderRadius } from '@/themes/appleDesignSystem';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {
  UserPlus,
  X,
  Mail,
  Shield,
  Users,
  Eye,
  Check,
} from 'lucide-react-native';
import type { UserRole, UserInvitation, Property } from '@/types';

interface UserInvitationModalProps {
  visible: boolean;
  onClose: () => void;
  onInviteUser: (invitation: Partial<UserInvitation>) => void;
  properties: Property[];
  currentUserRole: UserRole;
}

interface InvitationFormData {
  email: string;
  role: UserRole;
  propertyIds: string[];
  message: string;
}

const ROLE_DEFINITIONS = {
  owner: {
    name: 'Owner',
    description: 'Full access to all properties and settings. Can invite/manage users.',
    permissions: ['view', 'edit', 'invite', 'billing', 'settings'],
    icon: Shield,
    color: CervColors.systemGreen,
  },
  household_member: {
    name: 'Household Member',
    description: 'Can view and schedule services for assigned properties.',
    permissions: ['view', 'schedule', 'review'],
    icon: Users,
    color: '#FFB800',
  },
  viewer: {
    name: 'Viewer',
    description: 'Read-only access to assigned properties and service history.',
    permissions: ['view'],
    icon: Eye,
    color: '#8B9DC3',
  },
};

export default function UserInvitationModal({
  visible,
  onClose,
  onInviteUser,
  properties,
  currentUserRole,
}: UserInvitationModalProps) {
  const [formData, setFormData] = useState<InvitationFormData>({
    email: '',
    role: 'viewer',
    propertyIds: [],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableRoles = currentUserRole === 'owner' 
    ? ['owner', 'household_member', 'viewer'] as UserRole[]
    : ['household_member', 'viewer'] as UserRole[];

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handlePropertyToggle = (propertyId: string) => {
    setFormData(prev => ({
      ...prev,
      propertyIds: prev.propertyIds.includes(propertyId)
        ? prev.propertyIds.filter(id => id !== propertyId)
        : [...prev.propertyIds, propertyId],
    }));
  };

  const handleSelectAllProperties = () => {
    setFormData(prev => ({
      ...prev,
      propertyIds: prev.propertyIds.length === properties.length 
        ? [] 
        : properties.map(p => p.id),
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter an email address.');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    
    if (formData.propertyIds.length === 0) {
      Alert.alert('Error', 'Please select at least one property.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const invitation: Partial<UserInvitation> = {
        email: formData.email.trim(),
        role: formData.role,
        propertyIds: formData.propertyIds,
        message: formData.message.trim() || undefined,
        status: 'pending',
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };
      
      await onInviteUser(invitation);
      
      // Reset form
      setFormData({
        email: '',
        role: 'viewer',
        propertyIds: [],
        message: '',
      });
      
      Alert.alert(
        'Invitation Sent',
        `An invitation has been sent to ${formData.email}. They will receive an email with instructions to join.`,
        [{ text: 'OK', onPress: onClose }]
      );
    } catch {
      Alert.alert('Error', 'Failed to send invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPropertyDisplayName = (property: Property) => {
    return property.nickname || `${property.address.split(',')[0]}`;
  };

  // const RoleIcon = ROLE_DEFINITIONS[formData.role].icon;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Invite User</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#8B9DC3" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Email Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Mail color="#8B9DC3" size={16} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter email address"
                  placeholderTextColor="#8B9DC3"
                  value={formData.email}
                  onChangeText={(email) => setFormData(prev => ({ ...prev, email }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Role Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Role</Text>
              <View style={styles.rolesContainer}>
                {availableRoles.map(role => {
                  const roleInfo = ROLE_DEFINITIONS[role];
                  const isSelected = formData.role === role;
                  const IconComponent = roleInfo.icon;
                  
                  return (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleCard,
                        isSelected && styles.selectedRoleCard,
                      ]}
                      onPress={() => handleRoleSelect(role)}
                    >
                      <View style={[styles.roleCardBackground, isSelected && { backgroundColor: roleInfo.color }]}>
                        <View style={styles.roleCardHeader}>
                          <View style={[
                            styles.roleIcon,
                            { backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : `${roleInfo.color}20` }
                          ]}>
                            <IconComponent 
                              color={isSelected ? '#FFFFFF' : roleInfo.color} 
                              size={20} 
                            />
                          </View>
                          {isSelected && (
                            <View style={styles.selectedIndicator}>
                              <Check color="#FFFFFF" size={16} />
                            </View>
                          )}
                        </View>
                        
                        <Text style={[
                          styles.roleName,
                          { color: isSelected ? '#FFFFFF' : '#FFFFFF' }
                        ]}>
                          {roleInfo.name}
                        </Text>
                        
                        <Text style={[
                          styles.roleDescription,
                          { color: isSelected ? 'rgba(255, 255, 255, 0.8)' : '#8B9DC3' }
                        ]}>
                          {roleInfo.description}
                        </Text>
                        
                        <View style={styles.permissionsList}>
                          {roleInfo.permissions.map(permission => (
                            <View key={permission} style={styles.permissionItem}>
                              <Text style={[
                                styles.permissionText,
                                { color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#8B9DC3' }
                              ]}>
                                • {permission}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Property Access */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Access</Text>
                <TouchableOpacity
                  style={styles.selectAllButton}
                  onPress={handleSelectAllProperties}
                >
                  <Text style={styles.selectAllText}>
                    {formData.propertyIds.length === properties.length ? 'Deselect All' : 'Select All'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.propertiesContainer}>
                {properties.map(property => {
                  const isSelected = formData.propertyIds.includes(property.id);
                  
                  return (
                    <TouchableOpacity
                      key={property.id}
                      style={[
                        styles.propertyItem,
                        isSelected && styles.selectedPropertyItem,
                      ]}
                      onPress={() => handlePropertyToggle(property.id)}
                    >
                      <View style={[styles.propertyItemBackground, isSelected && { backgroundColor: CervColors.systemGreen }]}>
                        <View style={styles.propertyInfo}>
                          <Text style={[
                            styles.propertyName,
                            { color: isSelected ? '#FFFFFF' : '#FFFFFF' }
                          ]}>
                            {getPropertyDisplayName(property)}
                          </Text>
                          <Text style={[
                            styles.propertyAddress,
                            { color: isSelected ? 'rgba(255, 255, 255, 0.8)' : '#8B9DC3' }
                          ]}>
                            {property.city}, {property.state}
                          </Text>
                        </View>
                        
                        {isSelected && (
                          <View style={styles.propertySelectedIndicator}>
                            <Check color="#FFFFFF" size={16} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Optional Message */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Message (Optional)</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="Add a personal message to the invitation..."
                placeholderTextColor="#8B9DC3"
                value={formData.message}
                onChangeText={(message) => setFormData(prev => ({ ...prev, message }))}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.sendButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <View style={styles.sendButtonBackground}>
                <UserPlus color="#FFFFFF" size={16} />
                <Text style={styles.sendButtonText}>
                  {isSubmitting ? 'Sending...' : 'Send Invitation'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: CervColors.background,
    borderTopLeftRadius: CervBorderRadius.extraLarge,
    borderTopRightRadius: CervBorderRadius.extraLarge,
    maxHeight: '90%',
    paddingTop: CervSpacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#FFFFFF',
    paddingVertical: 14,
  },
  rolesContainer: {
    gap: 12,
  },
  roleCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedRoleCard: {},
  roleCardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.lg,
    borderRadius: CervBorderRadius.large,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  roleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleName: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '700',
    marginBottom: 6,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 12,
  },
  permissionsList: {
    gap: 2,
  },
  permissionItem: {},
  permissionText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
  },
  selectAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  selectAllText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemGreen,
  },
  propertiesContainer: {
    gap: 8,
  },
  propertyItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedPropertyItem: {},
  propertyItemBackground: {
    backgroundColor: CervColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: CervSpacing.md,
    borderRadius: CervBorderRadius.medium,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    marginBottom: 2,
  },
  propertyAddress: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
  },
  propertySelectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInput: {
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    minHeight: 80,
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#8B9DC3',
  },
  sendButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  sendButtonBackground: {
    backgroundColor: CervColors.systemGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.lg,
    paddingHorizontal: CervSpacing.xl,
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.medium,
  },
  sendButtonText: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
});