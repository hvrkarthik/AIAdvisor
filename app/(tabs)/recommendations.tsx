import { EmptyState } from '@/components/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProductCard } from '@/components/ProductCard';
import { useAppContext } from '@/contexts/AppContext';
import { PRODUCT_CATALOG } from '@/data/productCatalog';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { CircleAlert as AlertCircle, ArrowLeft, CircleCheck as CheckCircle, Zap } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function RecommendationsScreen() {
  const { searchQuery, recommendations, loading, error } = useAppContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <View style={styles.errorIconContainer}>
            <LinearGradient
              colors={['#dc2626', '#f43f5e']}
              style={styles.errorIconGradient}
            >
              <AlertCircle size={40} color="#ffffff" />
            </LinearGradient>
          </View>
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButtonContainer}
            onPress={() => router.push('/')}
          >
            <LinearGradient
              colors={['#c026d3', '#e879f9']}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!recommendations || recommendations.recommendations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState type="results" />
      </SafeAreaView>
    );
  }

  const getProductById = (id: string) => {
    return PRODUCT_CATALOG.find(product => product.id === id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <ArrowLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
             
              <Text style={styles.title}>AI Recommendations</Text>
            </View>
            <Text style={styles.searchQuery} numberOfLines={2}>
              "{searchQuery}"
            </Text>
          </View>
        </Animated.View>     

        {/* AI Summary */}
        {recommendations.summary && (
          <Animated.View entering={FadeInRight.delay(600)} style={styles.summaryContainer}>
            <LinearGradient
              colors={['#fef9c3', '#fef08a']}
              style={styles.summaryGradient}
            >
              <View style={styles.summaryHeader}>
                <LinearGradient
                  colors={['#d97706', '#eab308']}
                  style={styles.summaryIconContainer}
                >
                  <Zap size={20} color="#ffffff" />
                </LinearGradient>
                <Text style={styles.summaryTitle}>AI Analysis Summary</Text>
              </View>
              <Text style={styles.summaryText}>{recommendations.summary}</Text>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Results Header */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.resultsHeader}>
          <View style={styles.resultsIconContainer}>
            <LinearGradient colors={['#059669', '#10b981']} style={styles.resultsIcon}>
              <CheckCircle size={24} color="#ffffff" />
            </LinearGradient>
          </View>
          <View style={styles.resultsTextContainer}>
            <Text style={styles.resultsTitle}>
              Your Perfect Matches
            </Text>
            <Text style={styles.resultsSubtitle}>
              {recommendations.recommendations.length} product{recommendations.recommendations.length !== 1 ? 's' : ''} found based on your requirements
            </Text>
          </View>
        </Animated.View>
        
        {/* Product Cards */}
        <View style={styles.productsContainer}>
          {recommendations.recommendations.map((rec, index) => {
            const product = getProductById(rec.productId);
            if (!product) return null;

            return (
              <ProductCard
                key={rec.productId}
                product={product}
                reasoning={rec.reasoning}
                confidence={rec.confidence}
                matchedFeatures={rec.matchedFeatures}
              />
            );
          })}
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerIconGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  searchQuery: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    fontWeight: '500',
    paddingRight: 16,
  },
  statsBar: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 8,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#d97706',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400e',
    letterSpacing: -0.3,
  },
  summaryText: {
    fontSize: 14,
    color: '#a16207',
    lineHeight: 20,
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },
  resultsIconContainer: {
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  resultsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsTextContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  optionCard: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#c026d3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  optionCardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  optionCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  optionCardSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  optionCardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  optionCardButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  errorIconContainer: {
    marginBottom: 20,
  },
  errorIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  errorMessage: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    fontWeight: '500',
  },
  retryButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#c026d3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});