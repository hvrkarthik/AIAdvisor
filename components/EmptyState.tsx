import { LinearGradient } from 'expo-linear-gradient';
import { Search, ShoppingBag, TrendingUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface EmptyStateProps {
  type: 'search' | 'results';
}

export function EmptyState({ type }: EmptyStateProps) {
  const isSearch = type === 'search';
  const [showToast, setShowToast] = useState(false);

  const handleSearchClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      {showToast && (
        <Animated.View
          entering={FadeInUp.duration(300)}
          exiting={FadeOut.duration(300)}
          style={styles.toastContainer}
        >
          <LinearGradient
            colors={['#dc2626', '#f59e0b']}
            style={styles.toastGradient}
          >
            <Text style={styles.toastText}>
              Kindly search from the search tab
            </Text>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Main Icon */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.iconContainer}>
        <LinearGradient
          colors={isSearch ? ['#ef4444', '#f97316'] : ['#facc15', '#fef08a']}
          style={styles.iconGradient}
        >
          {isSearch ? (
            <Search size={36} color="#ffffff" />
          ) : (
            <ShoppingBag size={36} color="#ffffff" />
          )}
        </LinearGradient>
        <View style={styles.iconShadow} />
      </Animated.View>
      
      {/* Title and Description */}
      <Animated.View entering={FadeInUp.delay(400)} style={styles.textContainer}>
        <Text style={styles.title}>
          {isSearch ? 'Ready to Find Your Perfect Product?' : 'No Recommendations Yet'}
        </Text>
        
        <Text style={styles.description}>
          {isSearch 
            ? 'Our advanced AI will analyze thousands of products to find exactly what you need. Just describe your requirements in natural language.'
            : 'Head back to search and tell us what you need. Our AI will provide personalized recommendations with detailed explanations.'
          }
        </Text>
      </Animated.View>
      
      {/* Example Queries */}
      <Animated.View entering={FadeInDown.delay(isSearch ? 1200 : 800)} style={styles.exampleContainer}>
        <View style={styles.exampleHeader}>
          <LinearGradient
            colors={['#f59e0b', '#fed7aa']}
            style={styles.exampleIconContainer}
          >
            <TrendingUp size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.exampleTitle}>Try these popular searches:</Text>
        </View>
        
        <View style={styles.examples}>
          {[
            { text: "Lightweight laptop for digital nomads", icon: "💻" },
            { text: "Noise-canceling headphones for focus", icon: "🎧" },
            { text: "Professional camera for content creation", icon: "📸" },
            { text: "Gaming setup under $1500", icon: "🎮" },
           
          ].map((example, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.exampleChip}
              onPress={handleSearchClick}
            >
              <Text style={styles.exampleEmoji}>{example.icon}</Text>
              <Text style={styles.exampleText}>{example.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  toastContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -30 }],
    width: '90%',
    maxWidth: width - 32,
    zIndex: 1000,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastGradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  toastText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  iconGradient: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    marginTop:10,
    shadowRadius: 12,
    elevation: 8,
  },
  iconShadow: {
    position: 'absolute',
    bottom: -8,
    left: 15,
    right: 15,
    height: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 50,
    transform: [{ scaleX: 0.7 }],
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
    maxWidth: width - 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  miniFeature: {
    alignItems: 'center',
    gap: 8,
    minWidth: 80,
  },
  miniFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  miniFeatureText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center',
  },
  exampleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: width - 32,
    marginBottom: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#fee2e2',
   
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  exampleIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: -0.2,
  },
  examples: {
    gap: 8,
  },
  exampleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
    gap: 8,
  },
  exampleEmoji: {
    fontSize: 18,
  },
  exampleText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
    flex: 1,
  },
});