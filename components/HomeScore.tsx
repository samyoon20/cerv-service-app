import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, Info, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react-native';
import { CervColors, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

interface HomeScoreProps {
  score: {
    overall: number;
    poolMaintenance: number;
    exteriorCleaning: number;
    landscaping: number;
    lastUpdated: string;
  };
  onViewDetails: () => void;
}

export default function HomeScore({ score, onViewDetails }: HomeScoreProps) {
  // Convert 0-100 scale to 0-10 scale
  const convertToTenScale = (value: number) => Math.round(value / 10);
  
  const getScoreColor = (value: number) => {
    const tenScaleValue = convertToTenScale(value);
    if (tenScaleValue >= 8) return CervColors.systemGreen; // Excellent (8-10)
    if (tenScaleValue >= 6) return '#FFB800'; // Good (6-7.9)
    return '#FF6B6B'; // Needs Attention (0-5.9)
  };

  const getScoreGrade = (value: number): string => {
    const tenScaleValue = convertToTenScale(value);
    if (tenScaleValue >= 8) return 'Excellent';
    if (tenScaleValue >= 6) return 'Good';
    return 'Needs Care';
  };

  const overallTenScale = convertToTenScale(score.overall);
  const poolMaintenanceTenScale = convertToTenScale(score.poolMaintenance);
  const exteriorCleaningTenScale = convertToTenScale(score.exteriorCleaning);
  const landscapingTenScale = convertToTenScale(score.landscaping);

  return (
    <View style={styles.container}>
      <View style={styles.cardBackground}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Home Score</Text>
            <TouchableOpacity style={styles.infoButton} onPress={onViewDetails}>
              <Info color="#8B9DC3" size={16} />
            </TouchableOpacity>
          </View>
          <Text style={styles.lastUpdated}>
            Updated {new Date(score.lastUpdated).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View style={styles.scoreSection}>
          <View style={styles.overallScore}>
            <View style={styles.scoreCircle}>
              <View style={[styles.scoreCircleBackground, { backgroundColor: getScoreColor(score.overall) }]}>
                <Text style={styles.scoreValue}>
                  {overallTenScale}.{Math.round((score.overall % 10))}
                </Text>
                <Text style={styles.scoreOutOf}>/ 10</Text>
              </View>
            </View>
            <Text style={[styles.scoreGrade, { color: getScoreColor(score.overall) }]}>
              {getScoreGrade(score.overall)}
            </Text>
          </View>

          <View style={styles.chartsPreview}>
            <TouchableOpacity style={styles.chartItem} onPress={onViewDetails}>
              <View style={styles.chartIcon}>
                <BarChart3 color={CervColors.systemGreen} size={20} />
              </View>
              <Text style={styles.chartLabel}>Trends</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.chartItem} onPress={onViewDetails}>
              <View style={styles.chartIcon}>
                <PieChart color="#FFB800" size={20} />
              </View>
              <Text style={styles.chartLabel}>Breakdown</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.breakdown}>
          <View style={styles.breakdownItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.breakdownLabel}>Pool Maintenance</Text>
              <Text style={[styles.breakdownValue, { color: getScoreColor(score.poolMaintenance) }]}>
                {poolMaintenanceTenScale}.{Math.round((score.poolMaintenance % 10))}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${score.poolMaintenance}%`,
                    backgroundColor: getScoreColor(score.poolMaintenance)
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.breakdownLabel}>Exterior Cleaning</Text>
              <Text style={[styles.breakdownValue, { color: getScoreColor(score.exteriorCleaning) }]}>
                {exteriorCleaningTenScale}.{Math.round((score.exteriorCleaning % 10))}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${score.exteriorCleaning}%`,
                    backgroundColor: getScoreColor(score.exteriorCleaning)
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.breakdownLabel}>Landscaping</Text>
              <Text style={[styles.breakdownValue, { color: getScoreColor(score.landscaping) }]}>
                {landscapingTenScale}.{Math.round((score.landscaping % 10))}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${score.landscaping}%`,
                    backgroundColor: getScoreColor(score.landscaping)
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.viewDetailsButton} onPress={onViewDetails}>
          <View style={styles.detailsButtonBackground}>
            <TrendingUp color={CervColors.systemBlue} size={16} />
            <Text style={styles.viewDetailsText}>View Detailed Analytics</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: CervSpacing.xxl,
    borderRadius: CervBorderRadius.large,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  header: {
    marginBottom: 28,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    ...CervTypography.title2,
    color: CervColors.label,
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  lastUpdated: {
    ...CervTypography.caption1,
    color: CervColors.secondaryLabel,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  overallScore: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    shadowColor: CervColors.systemGreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreCircleBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    ...CervTypography.title1,
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  scoreOutOf: {
    ...CervTypography.caption1,
    fontWeight: 600,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: -4,
  },
  scoreGrade: {
    ...CervTypography.callout,
    fontWeight: 600,
    letterSpacing: -0.3,
  },
  chartsPreview: {
    gap: 16,
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
    ...CervTypography.caption1,
    fontWeight: 600,
    color: '#8B9DC3',
  },
  breakdown: {
    gap: 20,
    marginBottom: 28,
  },
  breakdownItem: {
    gap: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breakdownLabel: {
    ...CervTypography.subheadline,
    fontWeight: 600,
    color: '#FFFFFF',
    letterSpacing: -0.2,
    flex: 1,
    marginRight: 8,
  },
  scoreBar: {
    height: 6,
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  breakdownValue: {
    ...CervTypography.subheadline,
    fontWeight: 700,
    letterSpacing: -0.3,
    width: 40,
    textAlign: 'right',
    flexShrink: 0,
  },
  viewDetailsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsButtonBackground: {
    backgroundColor: CervColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.md,
    paddingHorizontal: CervSpacing.lg,
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.medium,
    borderWidth: 0.5,
    borderColor: CervColors.systemBlue,
  },
  viewDetailsText: {
    ...CervTypography.subheadline,
    fontWeight: 600,
    color: CervColors.systemBlue,
  },
});