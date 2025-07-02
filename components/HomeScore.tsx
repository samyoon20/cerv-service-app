import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, Info, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeScoreProps {
  score: {
    overall: number;
    maintenance: number;
    cleanliness: number;
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
    if (tenScaleValue >= 8) return '#00D4AA'; // Excellent (8-10)
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
  const maintenanceTenScale = convertToTenScale(score.maintenance);
  const cleanlinessTenScale = convertToTenScale(score.cleanliness);
  const landscapingTenScale = convertToTenScale(score.landscaping);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E2A3A', '#243447']}
        style={styles.gradient}
      >
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
              <LinearGradient
                colors={[getScoreColor(score.overall), `${getScoreColor(score.overall)}80`]}
                style={styles.scoreGradient}
              >
                <Text style={styles.scoreValue}>
                  {overallTenScale}.{Math.round((score.overall % 10))}
                </Text>
                <Text style={styles.scoreOutOf}>/ 10</Text>
              </LinearGradient>
            </View>
            <Text style={[styles.scoreGrade, { color: getScoreColor(score.overall) }]}>
              {getScoreGrade(score.overall)}
            </Text>
          </View>

          <View style={styles.chartsPreview}>
            <TouchableOpacity style={styles.chartItem} onPress={onViewDetails}>
              <View style={styles.chartIcon}>
                <BarChart3 color="#00D4AA" size={20} />
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
              <Text style={styles.breakdownLabel}>Maintenance</Text>
              <Text style={[styles.breakdownValue, { color: getScoreColor(score.maintenance) }]}>
                {maintenanceTenScale}.{Math.round((score.maintenance % 10))}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${score.maintenance}%`,
                    backgroundColor: getScoreColor(score.maintenance)
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.breakdownLabel}>Exterior Care</Text>
              <Text style={[styles.breakdownValue, { color: getScoreColor(score.cleanliness) }]}>
                {cleanlinessTenScale}.{Math.round((score.cleanliness % 10))}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${score.cleanliness}%`,
                    backgroundColor: getScoreColor(score.cleanliness)
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
          <LinearGradient
            colors={['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.05)']}
            style={styles.detailsGradient}
          >
            <TrendingUp color="#00D4AA" size={16} />
            <Text style={styles.viewDetailsText}>View Detailed Analytics</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
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
  gradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
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
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
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
    fontSize: 13,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
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
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: -4,
  },
  scoreGrade: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
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
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
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
  },
  breakdownLabel: {
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
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
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    letterSpacing: -0.3,
  },
  viewDetailsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#00D4AA',
    letterSpacing: -0.2,
  },
});