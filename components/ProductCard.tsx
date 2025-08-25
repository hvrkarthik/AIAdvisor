import { Product } from '@/data/productCatalog';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, CircleCheck as CheckCircle, Star, TrendingUp, Zap } from 'lucide-react-native';
import React from 'react';
import type { ColorValue } from 'react-native';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 32, 400);

interface ProductCardProps {
  product: Product;
  reasoning?: string;
  confidence?: number;
  matchedFeatures?: string[];
}

export function ProductCard({ product, reasoning, confidence, matchedFeatures }: ProductCardProps) {
  const hover = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(hover.value, [0, 1], [1, 1.02]) }],
  }));

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i < fullStars ? '#facc15' : '#e5e7eb'}
          fill={i < fullStars ? '#facc15' : 'transparent'}
        />
      );
    }
    return stars;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return '#22c55e';
      case 'limited': return '#f59e0b';
      case 'out-of-stock': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'In Stock';
      case 'limited': return 'Limited Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const getConfidenceColor = (confidence: number): [ColorValue, ColorValue] => {
    if (confidence >= 90) return ['#22c55e', '#4ade80'];
    if (confidence >= 75) return ['#ef4444', '#f87171'];
    return ['#f59e0b', '#fbbf24'];
  };

  return (
    <Animated.View 
      style={[styles.container, animatedContainerStyle]}
      onTouchStart={() => (hover.value = withSpring(1))}
      onTouchEnd={() => (hover.value = withSpring(0))}
    >
      {/* Confidence Badge */}
      {confidence && (
        <View style={styles.confidenceContainer}>
          <LinearGradient
            colors={getConfidenceColor(confidence)}
            style={styles.confidenceBadge}
          >
            <TrendingUp size={16} color="#ffffff" />
            <Text style={styles.confidenceText}>{confidence}% Match</Text>
            <Award size={14} color="#ffffff" />
          </LinearGradient>
        </View>
      )}

      <View style={styles.content}>
        {/* Product Image */}
        <Animated.View entering={FadeInUp} style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
          />

          {/* Category Badge */}
          <View style={styles.categoryContainer}>
            <LinearGradient
              colors={['#dc2626', '#f59e0b']}
              style={styles.categoryBadge}
            >
              <Text style={styles.category}>{product.category}</Text>
            </LinearGradient>
          </View>
        </Animated.View>
        
        {/* Product Details */}
        <View style={styles.details}>
          {/* Header with Rating */}
          <View style={styles.header}>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>{renderStars(product.rating)}</View>
              <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
              <Text style={styles.reviews}>({product.reviews.toLocaleString()})</Text>
            </View>
            <View style={[styles.availability, { backgroundColor: getAvailabilityColor(product.availability) + '20' }]}>
              <View style={[styles.availabilityDot, { backgroundColor: getAvailabilityColor(product.availability) }]} />
              <Text style={[styles.availabilityText, { color: getAvailabilityColor(product.availability) }]}>
                {getAvailabilityText(product.availability)}
              </Text>
            </View>
          </View>

          {/* Product Name and Description */}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {product.description}
          </Text>

          {/* Price and CTA */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
          </View>

          {/* AI Reasoning */}
          {reasoning && (
            <Animated.View entering={FadeInUp.delay(100)} style={styles.reasoningContainer}>
              <LinearGradient
                colors={['#fef2f2', '#fee2e2']}
                style={styles.reasoningGradient}
              >
                <View style={styles.reasoningHeader}>
                  <View style={styles.reasoningIcon}>
                    <Zap size={16} color="#dc2626" />
                  </View>
                  <Text style={styles.reasoningTitle}>Why this matches your needs:</Text>
                </View>
                <Text style={styles.reasoning} numberOfLines={3} ellipsizeMode="tail">
                  {reasoning}
                </Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Matched Features */}
          {matchedFeatures && matchedFeatures.length > 0 && (
            <Animated.View entering={FadeInUp.delay(200)} style={styles.featuresContainer}>
              <View style={styles.featuresHeader}>
                <CheckCircle size={16} color="#22c55e" />
                <Text style={styles.featuresTitle}>Key Features:</Text>
              </View>
              <View style={styles.features}>
                {matchedFeatures.slice(0, 3).map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <CheckCircle size={12} color="#22c55e" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
    overflow: 'hidden',
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  confidenceContainer: {
    margin: 16,
    marginBottom: 0,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f8fafc',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  categoryContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  category: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  details: {
    flex: 1,
    paddingHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviews: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '400',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  reasoningContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  reasoningGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  reasoningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  reasoningIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reasoningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reasoning: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#15803d',
  },
});