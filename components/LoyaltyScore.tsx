import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LoyaltyScoreProps {
  score: {
    points: number;
    level: string;
    nextLevel: string;
    pointsToNext: number;
    totalPointsForNext: number;
  };
  onPress: () => void;
}

export default function LoyaltyScore({ score, onPress }: LoyaltyScoreProps) {
  const progressPercentage = ((score.totalPointsForNext - score.pointsToNext) / score.totalPointsForNext) * 100;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      default:
        return '#00D4AA';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['rgba(0, 212, 170, 0.15)', 'rgba(0, 212, 170, 0.05)']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={[styles.starContainer, { backgroundColor: `${getLevelColor(score.level)}20` }]}>
            <Star color={getLevelColor(score.level)} size={14} fill={getLevelColor(score.level)} />
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.points}>{score.points.toLocaleString()}</Text>
            <Text style={styles.level}>{score.level}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: getLevelColor(score.level)
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {score.pointsToNext} to {score.nextLevel}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 6,
  },
  gradient: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  starContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreInfo: {
    alignItems: 'flex-start',
  },
  points: {
    fontSize: 13,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 15,
  },
  level: {
    fontSize: 9,
    fontFamily: 'Nunito-SemiBold',
    color: '#00D4AA',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  progressContainer: {
    gap: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 8,
    fontFamily: 'Nunito-Medium',
    color: '#8B9DC3',
    letterSpacing: -0.1,
  },
});