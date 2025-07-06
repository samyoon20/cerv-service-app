import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Home,
  ChevronDown,
  Plus,
  MapPin,
  Star,
  AlertCircle,
  X,
} from 'lucide-react-native';
import type { Property, PropertyPortfolio, CervScore } from '@/types';
import { CervColors } from '@/themes/appleDesignSystem';

interface PropertySelectorProps {
  portfolio: PropertyPortfolio;
  activeProperty: Property;
  onPropertySelect: (property: Property) => void;
  onAddProperty?: () => void;
  propertyScores: { [propertyId: string]: CervScore };
  propertyIssues: { [propertyId: string]: number };
}

export default function PropertySelector({
  portfolio,
  activeProperty,
  onPropertySelect,
  onAddProperty,
  propertyScores,
  propertyIssues,
}: PropertySelectorProps) {
  const [showModal, setShowModal] = useState(false);

  const handlePropertySelect = (property: Property) => {
    onPropertySelect(property);
    setShowModal(false);
  };

  const getPropertyDisplayName = (property: Property) => {
    return property.nickname || `${property.address.split(',')[0]}`;
  };

  const formatAddress = (property: Property) => {
    return `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return CervColors.systemGreen;
    if (score >= 60) return '#FFB800';
    return '#FF6B6B';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setShowModal(true)}
      >
        <View style={styles.selectorBackground}>
          <View style={styles.selectorContent}>
            <View style={styles.propertyInfo}>
              <View style={styles.propertyIcon}>
                <Home color={CervColors.systemGreen} size={20} />
              </View>
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyName}>
                  {getPropertyDisplayName(activeProperty)}
                </Text>
                <View style={styles.propertyMeta}>
                  <MapPin color="#8B9DC3" size={12} />
                  <Text style={styles.propertyAddress}>
                    {activeProperty.city}, {activeProperty.state}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.selectorActions}>
              {portfolio.totalProperties > 1 && (
                <View style={styles.propertyCount}>
                  <Text style={styles.propertyCountText}>
                    {portfolio.properties.findIndex(p => p.id === activeProperty.id) + 1} of {portfolio.totalProperties}
                  </Text>
                </View>
              )}
              <ChevronDown color="#8B9DC3" size={16} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Property Selection Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Property</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X color="#8B9DC3" size={24} />
              </TouchableOpacity>
            </View>

            {/* Portfolio Overview */}
            <View style={styles.portfolioCardBackground}>
              <View style={styles.portfolioHeader}>
                <Text style={styles.portfolioTitle}>Portfolio Overview</Text>
              </View>
              
              <View style={styles.portfolioStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{portfolio.averageCervScore}</Text>
                  <Text style={styles.statLabel}>Avg Cerv Score</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{portfolio.totalOpenIssues}</Text>
                  <Text style={styles.statLabel}>Open Issues</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>${portfolio.monthlySpend}</Text>
                  <Text style={styles.statLabel}>Monthly Spend</Text>
                </View>
              </View>
            </View>

            <ScrollView style={styles.propertiesList} showsVerticalScrollIndicator={false}>
              {portfolio.properties.map((property) => {
                const score = propertyScores[property.id];
                const issues = propertyIssues[property.id] || 0;
                const isActive = property.id === activeProperty.id;

                return (
                  <TouchableOpacity
                    key={property.id}
                    style={[
                      styles.propertyCard,
                      isActive && styles.activePropertyCard,
                    ]}
                    onPress={() => handlePropertySelect(property)}
                  >
                    <View style={[
                      styles.propertyCardBackground,
                      isActive && styles.activePropertyCardBackground
                    ]}>
                      <View style={styles.propertyCardHeader}>
                        <View style={styles.propertyCardInfo}>
                          <View style={styles.propertyCardIcon}>
                            {property.primaryPhoto ? (
                              <Image
                                source={{ uri: property.primaryPhoto }}
                                style={styles.propertyPhoto}
                              />
                            ) : (
                              <Home 
                                color={isActive ? '#0F1629' : CervColors.systemGreen} 
                                size={20} 
                              />
                            )}
                          </View>
                          <View style={styles.propertyCardDetails}>
                            <Text style={[
                              styles.propertyCardName,
                              isActive && styles.activePropertyCardName
                            ]}>
                              {getPropertyDisplayName(property)}
                            </Text>
                            <Text style={[
                              styles.propertyCardAddress,
                              isActive && styles.activePropertyCardAddress
                            ]}>
                              {formatAddress(property)}
                            </Text>
                          </View>
                        </View>

                        {isActive && (
                          <View style={styles.activeIndicator}>
                            <Text style={styles.activeIndicatorText}>Active</Text>
                          </View>
                        )}
                      </View>

                      <View style={styles.propertyCardStats}>
                        <View style={styles.propertyCardStat}>
                          <View style={styles.scoreIndicator}>
                            <Star
                              color={getScoreColor(score?.overall || 0)}
                              size={12}
                              fill={getScoreColor(score?.overall || 0)}
                            />
                            <Text style={[
                              styles.scoreText,
                              isActive && styles.activeScoreText
                            ]}>
                              {score?.overall || 0}
                            </Text>
                          </View>
                          <Text style={[
                            styles.scoreLabel,
                            isActive && styles.activeScoreLabel
                          ]}>
                            Cerv Score
                          </Text>
                        </View>

                        {issues > 0 && (
                          <View style={styles.propertyCardStat}>
                            <View style={styles.issuesIndicator}>
                              <AlertCircle
                                color={isActive ? '#FFB800' : '#FF6B6B'}
                                size={12}
                              />
                              <Text style={[
                                styles.issuesText,
                                isActive && styles.activeIssuesText
                              ]}>
                                {issues}
                              </Text>
                            </View>
                            <Text style={[
                              styles.issuesLabel,
                              isActive && styles.activeIssuesLabel
                            ]}>
                              Issues
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Add Property Button */}
              {onAddProperty && (
                <TouchableOpacity
                  style={styles.addPropertyButton}
                  onPress={() => {
                    setShowModal(false);
                    onAddProperty();
                  }}
                >
                  <LinearGradient
                    colors={['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.05)']}
                    style={styles.addPropertyGradient}
                  >
                    <Plus color={CervColors.systemGreen} size={20} />
                    <Text style={styles.addPropertyText}>Add New Property</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selectorButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectorGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  propertyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  propertyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  propertyAddress: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  selectorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  propertyCount: {
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  propertyCountText: {
    fontSize: 10,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: CervColors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingTop: 24,
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
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  portfolioCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  portfolioHeader: {
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: CervColors.systemGreen,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  propertiesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  propertyCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  activePropertyCard: {},
  propertyCardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.1)',
  },
  propertyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  propertyCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  propertyCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  propertyPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  propertyCardDetails: {
    flex: 1,
  },
  propertyCardName: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activePropertyCardName: {
    color: CervColors.white,
  },
  propertyCardAddress: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  activePropertyCardAddress: {
    color: 'rgba(15, 22, 41, 0.7)',
  },
  activeIndicator: {
    backgroundColor: 'rgba(15, 22, 41, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeIndicatorText: {
    fontSize: 10,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.white,
  },
  propertyCardStats: {
    flexDirection: 'row',
    gap: 20,
  },
  propertyCardStat: {
    alignItems: 'center',
  },
  scoreIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  activeScoreText: {
    color: CervColors.white,
  },
  scoreLabel: {
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  activeScoreLabel: {
    color: 'rgba(15, 22, 41, 0.7)',
  },
  issuesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  issuesText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#FF6B6B',
  },
  activeIssuesText: {
    color: '#FFB800',
  },
  issuesLabel: {
    fontSize: 10,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  activeIssuesLabel: {
    color: 'rgba(15, 22, 41, 0.7)',
  },
  addPropertyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  addPropertyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
    borderStyle: 'dashed',
    gap: 8,
  },
  addPropertyText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  
  // New Cerv dark theme styles
  selectorBackground: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    padding: 20,
  },
  
  portfolioCardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  
  propertyCardBackground: {
    backgroundColor: CervColors.cardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  
  activePropertyCardBackground: {
    backgroundColor: CervColors.systemBlue,
  },
});