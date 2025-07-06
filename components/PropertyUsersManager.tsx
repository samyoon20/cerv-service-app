import React, { useState } from 'react';
import { CervColors, CervSpacing, CervBorderRadius } from '@/themes/appleDesignSystem';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Users,
  X,
  Crown,
  Shield,
  Eye,
  MoreVertical,
  UserMinus,
  Settings,
  Mail,
} from 'lucide-react-native';
import type { User, Property, UserRole } from '@/types';

interface PropertyUser extends User {
  lastActive: string;
  propertyAccess: string[];
}

interface PropertyUsersManagerProps {
  visible: boolean;
  onClose: () => void;
  property: Property;
  currentUserRole: UserRole;
  onInviteUser: () => void;
  onRemoveUser: (userId: string) => void;
  onUpdateUserRole: (userId: string, role: UserRole) => void;
}

const MOCK_PROPERTY_USERS: PropertyUser[] = [
  {
    id: 'user-1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    role: 'owner',
    permissions: [
      { resource: 'property', actions: ['view', 'edit', 'invite', 'manage'] },
      { resource: 'services', actions: ['view', 'schedule', 'cancel'] },
      { resource: 'billing', actions: ['view', 'edit'] },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    lastActive: '2024-01-15T10:30:00Z',
    propertyAccess: ['prop-1', 'prop-2'],
  },
  {
    id: 'user-2',
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    role: 'household_member',
    permissions: [
      { resource: 'property', actions: ['view'] },
      { resource: 'services', actions: ['view', 'schedule'] },
    ],
    createdAt: '2024-01-05T00:00:00Z',
    lastActive: '2024-01-14T15:20:00Z',
    propertyAccess: ['prop-1'],
  },
  {
    id: 'user-3',
    fullName: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'viewer',
    permissions: [
      { resource: 'property', actions: ['view'] },
      { resource: 'services', actions: ['view'] },
    ],
    createdAt: '2024-01-10T00:00:00Z',
    lastActive: '2024-01-13T09:15:00Z',
    propertyAccess: ['prop-1'],
  },
];

const ROLE_INFO = {
  owner: {
    name: 'Owner',
    icon: Crown,
    color: CervColors.systemGreen,
    description: 'Full access & billing',
  },
  household_member: {
    name: 'Household Member',
    icon: Shield,
    color: '#FFB800',
    description: 'Scheduling & reviews',
  },
  viewer: {
    name: 'Viewer',
    icon: Eye,
    color: '#8B9DC3',
    description: 'Read-only access',
  },
};

export default function PropertyUsersManager({
  visible,
  onClose,
  property,
  currentUserRole,
  onInviteUser,
  onRemoveUser,
  onUpdateUserRole,
}: PropertyUsersManagerProps) {
  const [selectedUser, setSelectedUser] = useState<PropertyUser | null>(null);
  const [showUserActions, setShowUserActions] = useState(false);

  const canManageUsers = currentUserRole === 'owner';
  const propertyUsers = MOCK_PROPERTY_USERS.filter(user => 
    user.propertyAccess.includes(property.id)
  );

  const handleUserAction = (action: 'remove' | 'changeRole' | 'resendInvite', user: PropertyUser) => {
    setShowUserActions(false);
    setSelectedUser(null);

    switch (action) {
      case 'remove':
        Alert.alert(
          'Remove User',
          `Are you sure you want to remove ${user.fullName} from this property?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Remove', 
              style: 'destructive',
              onPress: () => onRemoveUser(user.id) 
            },
          ]
        );
        break;
      case 'changeRole':
        Alert.alert(
          'Change Role',
          `Change role for ${user.fullName}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Make Viewer', onPress: () => onUpdateUserRole(user.id, 'viewer') },
            { text: 'Make Household Member', onPress: () => onUpdateUserRole(user.id, 'household_member') },
            { text: 'Make Owner', onPress: () => onUpdateUserRole(user.id, 'owner') },
          ]
        );
        break;
      case 'resendInvite':
        Alert.alert('Invitation Sent', `Invitation resent to ${user.email}`);
        break;
    }
  };

  const getLastActiveText = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Active now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

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
            <View style={styles.headerInfo}>
              <Text style={styles.modalTitle}>Property Users</Text>
              <Text style={styles.propertyName}>
                {property.nickname || property.address}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X color="#8B9DC3" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.usersHeader}>
            <View style={styles.usersCount}>
              <Users color={CervColors.systemGreen} size={16} />
              <Text style={styles.usersCountText}>
                {propertyUsers.length} user{propertyUsers.length !== 1 ? 's' : ''} with access
              </Text>
            </View>
            
            {canManageUsers && (
              <TouchableOpacity style={styles.inviteButton} onPress={onInviteUser}>
                <View style={styles.inviteButtonBackground}>
                  <Mail color="#FFFFFF" size={14} />
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
            {propertyUsers.map(user => {
              const roleInfo = ROLE_INFO[user.role];
              const RoleIcon = roleInfo.icon;
              const isCurrentUser = user.id === 'user-1'; // Assuming current user

              return (
                <View key={user.id} style={styles.userCard}>
                  <View style={styles.userCardBackground}>
                    <View style={styles.userInfo}>
                      <View style={styles.userAvatar}>
                        <Text style={styles.userInitials}>
                          {user.fullName.split(' ').map(n => n[0]).join('')}
                        </Text>
                      </View>
                      
                      <View style={styles.userDetails}>
                        <View style={styles.userNameRow}>
                          <Text style={styles.userName}>{user.fullName}</Text>
                          {isCurrentUser && (
                            <View style={styles.currentUserBadge}>
                              <Text style={styles.currentUserText}>You</Text>
                            </View>
                          )}
                        </View>
                        
                        <Text style={styles.userEmail}>{user.email}</Text>
                        
                        <View style={styles.userMeta}>
                          <View style={styles.roleInfo}>
                            <View style={[styles.roleIcon, { backgroundColor: `${roleInfo.color}20` }]}>
                              <RoleIcon color={roleInfo.color} size={12} />
                            </View>
                            <Text style={[styles.roleName, { color: roleInfo.color }]}>
                              {roleInfo.name}
                            </Text>
                          </View>
                          
                          <View style={styles.lastActiveInfo}>
                            <Text style={styles.lastActive}>
                              {getLastActiveText(user.lastActive)}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.roleDescription}>{roleInfo.description}</Text>
                      </View>

                      {canManageUsers && !isCurrentUser && (
                        <TouchableOpacity
                          style={styles.userActionsButton}
                          onPress={() => {
                            setSelectedUser(user);
                            setShowUserActions(true);
                          }}
                        >
                          <MoreVertical color="#8B9DC3" size={16} />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.userPermissions}>
                      <Text style={styles.permissionsTitle}>Access</Text>
                      <View style={styles.permissionsList}>
                        {user.permissions.map((permission, index) => (
                          <View key={index} style={styles.permissionItem}>
                            <Text style={styles.permissionResource}>{permission.resource}:</Text>
                            <Text style={styles.permissionActions}>
                              {permission.actions.join(', ')}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* User Actions Modal */}
        {selectedUser && (
          <Modal
            visible={showUserActions}
            transparent
            animationType="fade"
            onRequestClose={() => setShowUserActions(false)}
          >
            <TouchableOpacity 
              style={styles.actionsOverlay}
              activeOpacity={1}
              onPress={() => setShowUserActions(false)}
            >
              <View style={styles.actionsModal}>
                <Text style={styles.actionsTitle}>
                  Manage {selectedUser.fullName}
                </Text>
                
                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => handleUserAction('changeRole', selectedUser)}
                >
                  <Settings color="#8B9DC3" size={16} />
                  <Text style={styles.actionText}>Change Role</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => handleUserAction('resendInvite', selectedUser)}
                >
                  <Mail color="#8B9DC3" size={16} />
                  <Text style={styles.actionText}>Resend Invitation</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionItem, styles.destructiveAction]}
                  onPress={() => handleUserAction('remove', selectedUser)}
                >
                  <UserMinus color="#FF6B6B" size={16} />
                  <Text style={[styles.actionText, styles.destructiveText]}>
                    Remove User
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        )}
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
    maxHeight: '85%',
    paddingTop: CervSpacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  headerInfo: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  propertyName: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  usersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  usersCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  usersCountText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  inviteButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  inviteButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  inviteButtonText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  usersList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  userCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  userCardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CervColors.systemGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitials: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  currentUserBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  currentUserText: {
    fontSize: 10,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  roleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleName: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  lastActiveInfo: {},
  lastActive: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  roleDescription: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  userActionsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPermissions: {
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  permissionsTitle: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#8B9DC3',
    marginBottom: 6,
  },
  permissionsList: {
    gap: 2,
  },
  permissionItem: {
    flexDirection: 'row',
    gap: 4,
  },
  permissionResource: {
    fontSize: 11,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  permissionActions: {
    fontSize: 11,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  // Actions Modal
  actionsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsModal: {
    backgroundColor: CervColors.background,
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    minWidth: 200,
    marginHorizontal: 40,
  },
  actionsTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
  },
  destructiveAction: {},
  destructiveText: {
    color: '#FF6B6B',
  },
  
  // Cerv dark theme styles
  userCardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.lg,
    borderRadius: CervBorderRadius.large,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  
  inviteButtonBackground: {
    backgroundColor: CervColors.systemGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.sm,
    paddingHorizontal: CervSpacing.md,
    borderRadius: CervBorderRadius.small,
    gap: CervSpacing.xs,
  },
});