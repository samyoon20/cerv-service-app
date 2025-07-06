import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Wrench,
  Sparkles,
  TreePine,
  Calendar,
  Target,
  Lightbulb,
  Clock,
  DollarSign,
  X,
  ChartBar as BarChart3,
  ChartPie as PieChart,
  HelpCircle,
  BookOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Line, Polyline } from 'react-native-svg';
import type { HomeScoreAnalytics } from '@/types';
import { CervColors } from '@/themes/appleDesignSystem';


// Mock data for analytics
const MOCK_ANALYTICS: HomeScoreAnalytics = {
  current: {
    overall: 87,
    poolMaintenance: 92,
    landscaping: 84,
    exteriorCleaning: 85,
    lastUpdated: new Date().toISOString(),
  },
  categories: [
    {
      id: 'poolMaintenance',
      name: 'Pool Maintenance',
      description: 'Pool cleaning, chemical balancing, and equipment care',
      currentScore: 92,
      targetScore: 95,
      explanation: 'Your pool maintenance score reflects the condition and regular upkeep of your pool systems including filtration, chemical balance, cleaning, and equipment functionality.',
      factorsAffecting: [
        'Water chemistry balance',
        'Filter and pump efficiency',
        'Pool surface cleanliness',
        'Equipment maintenance',
        'Regular debris removal'
      ],
      improvementTips: [
        'Weekly chemical testing and balancing',
        'Bi-weekly filter cleaning',
        'Monthly equipment inspection',
        'Seasonal deep cleaning'
      ],
      icon: 'droplets',
      color: '#e39ac4'
    },
    {
      id: 'exteriorCleaning',
      name: 'Exterior Cleaning',
      description: 'External surface cleaning and maintenance',
      currentScore: 85,
      targetScore: 90,
      explanation: 'Exterior cleaning encompasses the cleanliness and appearance of your home\'s exterior surfaces, including siding, windows, driveways, and outdoor areas.',
      factorsAffecting: [
        'Exterior surface cleanliness',
        'Window condition and cleanliness',
        'Driveway and walkway maintenance',
        'Outdoor furniture condition',
        'General curb appeal'
      ],
      improvementTips: [
        'Bi-annual exterior cleaning',
        'Regular window cleaning',
        'Seasonal deep cleaning',
        'Maintain outdoor spaces'
      ],
      icon: 'sparkles',
      color: '#633737'
    },
    {
      id: 'landscaping',
      name: 'Landscaping',
      description: 'Garden, lawn, and outdoor space care',
      currentScore: 84,
      targetScore: 88,
      explanation: 'Landscaping score measures the health and appearance of your outdoor spaces, including lawn care, garden maintenance, tree health, and overall outdoor aesthetics.',
      factorsAffecting: [
        'Lawn health and maintenance',
        'Garden bed condition',
        'Tree and shrub health',
        'Seasonal plant care',
        'Irrigation system efficiency'
      ],
      improvementTips: [
        'Regular lawn fertilization',
        'Seasonal pruning schedule',
        'Proper irrigation timing',
        'Weed control program'
      ],
      icon: 'tree-pine',
      color: '#196f62'
    }
  ],
  recommendations: [
    {
      id: '1',
      categoryId: 'exteriorCleaning',
      title: 'Exterior Cleaning Service',
      description: 'Deep clean exterior walls, driveway, and walkways to improve overall appearance',
      impact: 8,
      priority: 'high',
      estimatedCost: 150,
      timeToComplete: '4-6 hours',
      serviceRequired: true,
      actionType: 'professional'
    },
    {
      id: '2',
      categoryId: 'poolMaintenance',
      title: 'Pool Chemical Balancing',
      description: 'Test and adjust pool chemistry for optimal water quality and equipment protection',
      impact: 6,
      priority: 'high',
      estimatedCost: 45,
      timeToComplete: '1 hour',
      serviceRequired: true,
      actionType: 'professional'
    },
    {
      id: '3',
      categoryId: 'landscaping',
      title: 'Seasonal Landscaping Cleanup',
      description: 'Prune overgrown plants, remove weeds, and refresh mulch beds',
      impact: 5,
      priority: 'medium',
      estimatedCost: 200,
      timeToComplete: '1 day',
      serviceRequired: true,
      actionType: 'professional'
    }
  ],
  history: [
    { date: '2024-12-01', overall: 87, poolMaintenance: 92, exteriorCleaning: 85, landscaping: 84 },
    { date: '2024-11-01', overall: 85, poolMaintenance: 90, exteriorCleaning: 82, landscaping: 83 },
    { date: '2024-10-01', overall: 83, poolMaintenance: 88, exteriorCleaning: 80, landscaping: 81 },
    { date: '2024-09-01', overall: 81, poolMaintenance: 86, exteriorCleaning: 78, landscaping: 79 },
    { date: '2024-08-01', overall: 79, poolMaintenance: 84, exteriorCleaning: 76, landscaping: 77 },
    { date: '2024-07-01', overall: 77, poolMaintenance: 82, exteriorCleaning: 74, landscaping: 75 }
  ],
  trends: {
    period: '90d',
    overallTrend: 'improving',
    bestPerformingCategory: 'poolMaintenance',
    needsAttentionCategory: 'landscaping',
    averageMonthlyImprovement: 2.5
  },
  goals: {
    targetOverallScore: 95,
    targetDate: '2025-03-01',
    onTrack: true,
    requiredMonthlyImprovement: 2.0
  }
};

// Pie Chart Component
const CustomPieChart = ({ data, size = 200 }: { data: any[], size?: number }) => {
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;
  
  let cumulativePercentage = 0;
  
  return (
    <Svg width={size} height={size}>
      {data.map((item, index) => {
        const percentage = item.value / 100;
        const startAngle = cumulativePercentage * 2 * Math.PI - Math.PI / 2;
        const endAngle = (cumulativePercentage + percentage) * 2 * Math.PI - Math.PI / 2;
        
        const startX = centerX + radius * Math.cos(startAngle);
        const startY = centerY + radius * Math.sin(startAngle);
        const endX = centerX + radius * Math.cos(endAngle);
        const endY = centerY + radius * Math.sin(endAngle);
        
        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        
        const pathData = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z'
        ].join(' ');
        
        cumulativePercentage += percentage;
        
        return (
          <Path
            key={index}
            d={pathData}
            fill={item.color}
            opacity={0.8}
          />
        );
      })}
    </Svg>
  );
};

// Line Chart Component
const CustomLineChart = ({ data, width = 300, height = 200 }: { data: any[], width?: number, height?: number }) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const maxValue = Math.max(...data.map(d => d.overall));
  const minValue = Math.min(...data.map(d => d.overall));
  const valueRange = maxValue - minValue || 1;
  
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + ((maxValue - item.overall) / valueRange) * chartHeight;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <Svg width={width} height={height}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
        <Line
          key={index}
          x1={padding}
          y1={padding + ratio * chartHeight}
          x2={padding + chartWidth}
          y2={padding + ratio * chartHeight}
          stroke="rgba(139, 157, 195, 0.2)"
          strokeWidth="1"
        />
      ))}
      
      {/* Line */}
      <Polyline
        points={points}
        fill="none"
        stroke={CervColors.systemGreen}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points */}
      {data.map((item, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + ((maxValue - item.overall) / valueRange) * chartHeight;
        return (
          <Circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            fill={CervColors.systemGreen}
          />
        );
      })}
    </Svg>
  );
};

export default function AnalyticsScreen() {
  const [showBreakdownChart, setShowBreakdownChart] = useState(false);
  const [showTrendsChart, setShowTrendsChart] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const getScoreColor = (value: number) => {
    if (value >= 80) return CervColors.systemGreen;
    if (value >= 60) return '#FFB800';
    return '#FF6B6B';
  };

  const getScoreGrade = (value: number): string => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    return 'Needs Care';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp color={CervColors.systemGreen} size={16} />;
      case 'declining':
        return <TrendingDown color="#FF6B6B" size={16} />;
      default:
        return <Minus color="#8B9DC3" size={16} />;
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'wrench':
        return <Wrench color={CervColors.systemGreen} size={20} />;
      case 'sparkles':
        return <Sparkles color="#FFB800" size={20} />;
      case 'tree-pine':
        return <TreePine color="#28B946" size={20} />;
      default:
        return <Wrench color="#8B9DC3" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFB800';
      case 'low':
        return CervColors.systemGreen;
      default:
        return '#8B9DC3';
    }
  };

  const showInfoPopup = (title: string, content: string) => {
    setModalContent({ title, content });
    setShowInfoModal(true);
  };

  const pieChartData = MOCK_ANALYTICS.categories.map(cat => ({
    name: cat.name,
    value: cat.currentScore,
    color: cat.color
  }));

  const CTAChip = ({ title, onPress, icon }: { title: string, onPress: () => void, icon?: React.ReactNode }) => (
    <TouchableOpacity style={styles.ctaChip} onPress={onPress}>
      <LinearGradient
        colors={['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.05)']}
        style={styles.ctaChipGradient}
      >
        {icon}
        <Text style={styles.ctaChipText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F1629', '#1A2332']}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Home Score Analytics</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Overall Score Section */}
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.overallScoreCard}
            >
              <View style={styles.overallScoreHeader}>
                <Text style={styles.sectionTitle}>Overall Performance</Text>
                <View style={styles.trendIndicator}>
                  {getTrendIcon(MOCK_ANALYTICS.trends.overallTrend)}
                  <Text style={[styles.trendText, { color: getScoreColor(MOCK_ANALYTICS.current.overall) }]}>
                    {MOCK_ANALYTICS.trends.overallTrend}
                  </Text>
                </View>
              </View>

              <View style={styles.scoreDisplay}>
                <View style={styles.scoreCircle}>
                  <LinearGradient
                    colors={[getScoreColor(MOCK_ANALYTICS.current.overall), `${getScoreColor(MOCK_ANALYTICS.current.overall)}80`]}
                    style={styles.scoreGradient}
                  >
                    <Text style={styles.scoreValue}>
                      {Math.round(MOCK_ANALYTICS.current.overall / 10)}.{MOCK_ANALYTICS.current.overall % 10}
                    </Text>
                    <Text style={styles.scoreOutOf}>/ 10</Text>
                  </LinearGradient>
                </View>
                <Text style={[styles.scoreGrade, { color: getScoreColor(MOCK_ANALYTICS.current.overall) }]}>
                  {getScoreGrade(MOCK_ANALYTICS.current.overall)}
                </Text>
              </View>

              <View style={styles.chartsPreview}>
                <TouchableOpacity style={styles.chartItem} onPress={() => setShowBreakdownChart(true)}>
                  <View style={styles.chartIcon}>
                    <PieChart color="#FFB800" size={20} />
                  </View>
                  <Text style={styles.chartLabel}>Breakdown</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.chartItem} onPress={() => setShowTrendsChart(true)}>
                  <View style={styles.chartIcon}>
                    <BarChart3 color={CervColors.systemGreen} size={20} />
                  </View>
                  <Text style={styles.chartLabel}>Trends</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.ctaContainer}>
                <CTAChip 
                  title="Learn More" 
                  icon={<BookOpen color={CervColors.systemGreen} size={14} />}
                  onPress={() => showInfoPopup(
                    'Home Score Explained',
                    'Your Home Score is calculated based on three key areas:\n\n• Pool Maintenance (40%): Pool chemistry, equipment, and cleanliness\n• Exterior Cleaning (30%): Surface cleaning and appearance\n• Landscaping (30%): Outdoor space and garden condition\n\nScores are updated after each service and range from 0-100. Higher scores indicate better home health and can increase property value.'
                  )}
                />
              </View>

              <View style={styles.goalSection}>
                <View style={styles.goalItem}>
                  <Target color={CervColors.systemGreen} size={16} />
                  <Text style={styles.goalLabel}>Target: {MOCK_ANALYTICS.goals.targetOverallScore}/100</Text>
                </View>
                <View style={styles.goalItem}>
                  <Calendar color="#8B9DC3" size={16} />
                  <Text style={styles.goalLabel}>
                    By {new Date(MOCK_ANALYTICS.goals.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Category Breakdown */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category Breakdown</Text>
              {MOCK_ANALYTICS.categories.map((category) => (
                <LinearGradient
                  key={category.id}
                  colors={['#1E2A3A', '#243447']}
                  style={styles.categoryCard}
                >
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <View style={styles.categoryIconContainer}>
                        {getCategoryIcon(category.icon)}
                      </View>
                      <View style={styles.categoryDetails}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryDescription}>{category.description}</Text>
                      </View>
                    </View>
                    <Text style={[styles.categoryScore, { color: getScoreColor(category.currentScore) }]}>
                      {Math.round(category.currentScore / 10)}.{category.currentScore % 10}
                    </Text>
                  </View>

                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${category.currentScore}%`,
                          backgroundColor: category.color
                        }
                      ]} 
                    />
                  </View>

                  <Text style={styles.categoryExplanation}>{category.explanation}</Text>

                  <View style={styles.improvementTips}>
                    <Text style={styles.tipsTitle}>Quick Wins:</Text>
                    {category.improvementTips.slice(0, 2).map((tip, index) => (
                      <View key={index} style={styles.tipItem}>
                        <Lightbulb color="#FFB800" size={12} />
                        <Text style={styles.tipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.ctaContainer}>
                    <CTAChip 
                      title="How to Improve" 
                      icon={<HelpCircle color={CervColors.systemGreen} size={14} />}
                      onPress={() => showInfoPopup(
                        `Improve ${category.name}`,
                        `To boost your ${category.name.toLowerCase()} score:\n\n${category.improvementTips.map(tip => `• ${tip}`).join('\n')}\n\nFocus on the factors that most impact your score:\n${category.factorsAffecting.slice(0, 3).map(factor => `• ${factor}`).join('\n')}`
                      )}
                    />
                  </View>
                </LinearGradient>
              ))}
            </View>

            {/* Recommendations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Actions</Text>
              {MOCK_ANALYTICS.recommendations.map((rec) => (
                <LinearGradient
                  key={rec.id}
                  colors={['#1E2A3A', '#243447']}
                  style={styles.recommendationCard}
                >
                  <View style={styles.recommendationHeader}>
                    <View style={styles.recommendationInfo}>
                      <Text style={styles.recommendationTitle}>{rec.title}</Text>
                      <View style={styles.priorityBadge}>
                        <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(rec.priority) }]} />
                        <Text style={[styles.priorityText, { color: getPriorityColor(rec.priority) }]}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.impactText}>+{rec.impact} pts</Text>
                  </View>

                  <Text style={styles.recommendationDescription}>{rec.description}</Text>

                  <View style={styles.recommendationDetails}>
                    {rec.timeToComplete && (
                      <View style={styles.detailItem}>
                        <Clock color="#8B9DC3" size={14} />
                        <Text style={styles.detailText}>{rec.timeToComplete}</Text>
                      </View>
                    )}
                    {rec.estimatedCost && (
                      <View style={styles.detailItem}>
                        <DollarSign color="#8B9DC3" size={14} />
                        <Text style={styles.detailText}>${rec.estimatedCost}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.recommendationActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <LinearGradient
                        colors={['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.05)']}
                        style={styles.actionButtonGradient}
                      >
                        <Text style={styles.actionButtonText}>
                          {rec.serviceRequired ? 'Book Service' : 'Learn More'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <CTAChip 
                      title="Learn More" 
                      icon={<BookOpen color={CervColors.systemGreen} size={12} />}
                      onPress={() => showInfoPopup(
                        rec.title,
                        `${rec.description}\n\n• Impact: +${rec.impact} points to your score\n• Time needed: ${rec.timeToComplete}\n• Estimated cost: $${rec.estimatedCost}\n• Type: ${rec.actionType}\n\nThis ${rec.priority} priority task will help improve your ${rec.categoryId} score significantly.`
                      )}
                    />
                  </View>
                </LinearGradient>
              ))}
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>

        {/* Breakdown Chart Modal */}
        <Modal
          visible={showBreakdownChart}
          transparent
          animationType="fade"
          onRequestClose={() => setShowBreakdownChart(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.chartModal}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Score Breakdown</Text>
                <TouchableOpacity onPress={() => setShowBreakdownChart(false)}>
                  <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.chartContainer}>
                <CustomPieChart data={pieChartData} size={250} />
              </View>
              
              <View style={styles.chartLegend}>
                {pieChartData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>{item.name}: {item.value}%</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </Modal>

        {/* Trends Chart Modal */}
        <Modal
          visible={showTrendsChart}
          transparent
          animationType="fade"
          onRequestClose={() => setShowTrendsChart(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.chartModal}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Score Trends</Text>
                <TouchableOpacity onPress={() => setShowTrendsChart(false)}>
                  <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.chartContainer}>
                <CustomLineChart data={MOCK_ANALYTICS.history} width={300} height={200} />
              </View>
              
              <Text style={styles.chartSubtitle}>
                Overall score improvement over the last 6 months
              </Text>
            </LinearGradient>
          </View>
        </Modal>

        {/* Info Modal */}
        <Modal
          visible={showInfoModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowInfoModal(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={['#1E2A3A', '#243447']}
              style={styles.infoModal}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{modalContent.title}</Text>
                <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                  <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalContent}>
                <Text style={styles.modalText}>{modalContent.content}</Text>
              </ScrollView>
            </LinearGradient>
          </View>
        </Modal>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  overallScoreCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  overallScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    shadowColor: CervColors.systemGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 36,
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: -4,
  },
  scoreGrade: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  chartsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  chartItem: {
    alignItems: 'center',
    gap: 8,
  },
  chartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#8B9DC3',
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ctaChip: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  ctaChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  ctaChipText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemGreen,
  },
  goalSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#8B9DC3',
  },
  section: {
    marginBottom: 32,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
  },
  categoryScore: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryExplanation: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    lineHeight: 20,
    marginBottom: 16,
  },
  improvementTips: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    flex: 1,
  },
  recommendationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  recommendationInfo: {
    flex: 1,
    marginRight: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  impactText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '700',
    color: CervColors.systemGreen,
  },
  recommendationDescription: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#8B9DC3',
  },
  recommendationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
  },
  actionButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: CervColors.systemGreen,
    letterSpacing: -0.2,
  },
  bottomSpacing: {
    height: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  chartModal: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  infoModal: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartLegend: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#8B9DC3',
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    textAlign: 'center',
  },
  modalContent: {
    maxHeight: 300,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: '#8B9DC3',
    lineHeight: 20,
  },
});