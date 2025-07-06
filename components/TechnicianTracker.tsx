import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MapPin, Phone, Navigation, Clock } from 'lucide-react-native';
import { CervColors, CervBorderRadius } from '@/themes/appleDesignSystem';

interface TechnicianTrackerProps {
  status: {
    isActive: boolean;
    technicianName: string;
    serviceName: string;
    status: 'preparing' | 'en_route' | 'arrived' | 'working' | 'completed';
    eta: string;
    progress: number; // 0 to 1
    location: string;
    phoneNumber: string;
  };
}

export default function TechnicianTracker({ status }: TechnicianTrackerProps) {
  const getStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'preparing':
        return 'Preparing for service';
      case 'en_route':
        return 'On the way';
      case 'arrived':
        return 'Arrived at location';
      case 'working':
        return 'Service in progress';
      case 'completed':
        return 'Service completed';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'preparing':
        return '#FFB800';
      case 'en_route':
        return 'CervColors.systemGreen';
      case 'arrived':
        return 'CervColors.systemGreen';
      case 'working':
        return 'CervColors.systemGreen';
      case 'completed':
        return 'CervColors.systemGreen';
      default:
        return '#8B9DC3';
    }
  };

  const handleCallTechnician = () => {
    Alert.alert(
      'Call Technician',
      `Call ${status.technicianName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...', `Calling ${status.phoneNumber}`) }
      ]
    );
  };

  const handleTrackLocation = () => {
    Alert.alert('Track Location', `${status.technicianName} is currently near ${status.location}`);
  };

  if (!status.isActive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardBackground}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(status.status) }]} />
              <Text style={styles.statusText}>{getStatusText(status.status)}</Text>
            </View>
            <Text style={styles.serviceName}>{status.serviceName}</Text>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleTrackLocation}>
              <Navigation color="CervColors.systemGreen" size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCallTechnician}>
              <Phone color="CervColors.systemGreen" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${status.progress * 100}%`,
                  backgroundColor: getStatusColor(status.status)
                }
              ]} 
            />
          </View>
          
          <View style={styles.progressInfo}>
            <View style={styles.technicianInfo}>
              <Text style={styles.technicianName}>{status.technicianName}</Text>
              <View style={styles.locationInfo}>
                <MapPin color="#8B9DC3" size={12} />
                <Text style={styles.locationText}>{status.location}</Text>
              </View>
            </View>
            
            <View style={styles.etaInfo}>
              <Clock color="CervColors.systemGreen" size={14} />
              <Text style={styles.etaText}>ETA {status.eta}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: 'CervColors.systemGreen',
    letterSpacing: -0.1,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'CervColors.systemGreenLight',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'CervColors.systemGreenLight',
  },
  progressSection: {
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  technicianInfo: {
    flex: 1,
  },
  technicianName: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  etaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'CervColors.systemGreenLight',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  etaText: {
    fontSize: 11,
    fontFamily: 'Nunito-SemiBold',
    color: 'CervColors.systemGreen',
    letterSpacing: -0.1,
  },
  
  // Cerv dark theme style
  cardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: 20,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    borderRadius: CervBorderRadius.large,
  },
});