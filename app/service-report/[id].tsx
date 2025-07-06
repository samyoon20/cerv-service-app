import React from 'react';
import { 
  StyleSheet, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ServiceReportSummary from '@/components/ServiceReportSummary';
import type { ServiceReport, CervScore } from '@/types';

// Mock service report data
const MOCK_SERVICE_REPORT: ServiceReport = {
  id: '1',
  serviceId: 'pool-maintenance',
  appointmentId: 'apt-001',
  beforePhotos: [
    'https://images.pexels.com/photos/261179/pexels-photo-261179.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  afterPhotos: [
    'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  workCompleted: [
    {
      id: '1',
      task: 'Cleaned pool skimmers and baskets',
      completed: true,
      timeSpent: 15,
      notes: 'Removed significant debris buildup'
    },
    {
      id: '2',
      task: 'Tested and balanced water chemistry',
      completed: true,
      timeSpent: 20,
      notes: 'pH was slightly high, added acid'
    },
    {
      id: '3',
      task: 'Brushed pool walls and floor',
      completed: true,
      timeSpent: 25,
      notes: 'Focused on algae spots near shallow end'
    },
    {
      id: '4',
      task: 'Checked pool equipment operation',
      completed: true,
      timeSpent: 10,
      notes: 'All systems running properly'
    },
    {
      id: '5',
      task: 'Applied shock treatment',
      completed: true,
      timeSpent: 5,
      notes: 'Added calcium hypochlorite for clarity'
    }
  ],
  nextServicePlan: [
    {
      id: '1',
      task: 'Pool filter deep cleaning',
      priority: 'high',
      estimatedTime: '2 weeks',
      description: 'Replace or deep clean filter cartridges for optimal filtration'
    },
    {
      id: '2',
      task: 'Pool heater maintenance check',
      priority: 'medium',
      estimatedTime: '1 month',
      description: 'Inspect heater components and test functionality before winter'
    },
    {
      id: '3',
      task: 'Tile line cleaning',
      priority: 'low',
      estimatedTime: '6 weeks',
      description: 'Remove calcium buildup from waterline tiles'
    }
  ],
  technicianNotes: 'Pool was in good condition overall. Water clarity improved significantly after chemical balancing. Recommend more frequent skimming between services due to nearby trees. Equipment is running well with no immediate concerns.',
  serviceDate: '2024-01-12',
  duration: 75,
  rating: 5,
  userReview: 'Excellent service! Mike was thorough and left the pool sparkling clean.',
  technicianName: 'Mike Johnson'
};

const MOCK_CERV_SCORE_BEFORE: CervScore = {
  overall: 82,
  poolMaintenance: 78,
  exteriorCleaning: 80,
  landscaping: 88,
  loyalty: 85,
  engagement: 90,
  lastUpdated: '2024-01-12T09:00:00Z',
  propertyId: 'prop-1',
  trend: 'stable',
  monthlyDelta: 0,
};

const MOCK_CERV_SCORE_AFTER: CervScore = {
  overall: 87,
  poolMaintenance: 92,
  exteriorCleaning: 85,
  landscaping: 88,
  loyalty: 85,
  engagement: 90,
  lastUpdated: '2024-01-12T12:30:00Z',
  propertyId: 'prop-1',
  trend: 'improving',
  monthlyDelta: 5,
};

export default function ServiceReportScreen() {
  const handleScheduleNext = () => {
    Alert.alert('Schedule Next Service', 'This will open the scheduling flow.');
  };

  const handleExportPDF = () => {
    Alert.alert('Export PDF', 'Service report will be exported as PDF.');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ServiceReportSummary
        serviceReport={MOCK_SERVICE_REPORT}
        cervScoreBefore={MOCK_CERV_SCORE_BEFORE}
        cervScoreAfter={MOCK_CERV_SCORE_AFTER}
        onScheduleNext={handleScheduleNext}
        onExportPDF={handleExportPDF}
        onGoBack={handleGoBack}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1629',
  },
});