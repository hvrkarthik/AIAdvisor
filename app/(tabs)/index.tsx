import { EmptyState } from '@/components/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SearchInput } from '@/components/SearchInput';
import { useAppContext } from '@/contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Brain, Shield, Sparkles } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { loading } = useAppContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>


        {/* Search Section */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.searchSection}>
          <SearchInput />
        </Animated.View>

        {/* Hero Section with Rich Background */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.heroSection}>
          <LinearGradient
            colors={['#dc2626', '#f59e0b', '#facc15']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroOverlay} />

            {/* Floating Elements */}
            <View style={styles.floatingElements}>
              <Animated.View entering={FadeInLeft.delay(800)} style={[styles.floatingCard, styles.float1]}>
                <LinearGradient colors={['#ef4444', '#f87171']} style={styles.floatingCardGradient}>
                  <Brain size={20} color="#ffffff" />
                  <Text style={styles.floatingText}>AI Powered</Text>
                </LinearGradient>
              </Animated.View>

              <Animated.View entering={FadeInRight.delay(1000)} style={[styles.floatingCard, styles.float2]}>
                <LinearGradient colors={['#facc15', '#fef08a']} style={styles.floatingCardGradient}>
                  <Shield size={18} color="#ffffff" />
                  <Text style={styles.floatingText}>Trusted</Text>
                </LinearGradient>
              </Animated.View>

              <Animated.View entering={FadeInLeft.delay(1200)} style={[styles.floatingCard, styles.float3]}>
                <LinearGradient colors={['#f59e0b', '#fed7aa']} style={styles.floatingCardGradient}>
                  <Award size={16} color="#ffffff" />
                  <Text style={styles.floatingText}>Premium</Text>
                </LinearGradient>
              </Animated.View>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#dc2626', '#f59e0b']}
                  style={styles.logoGradient}
                >
                  <Sparkles size={36} color="#ffffff" />
                </LinearGradient>
                <View style={styles.logoShadow} />
              </View>

              <Text style={styles.heroTitle}>AI Product Advisor</Text>
              <Text style={styles.heroTagline}>Discover Your Perfect Match</Text>
              <Text style={styles.heroSubtitle}>
                Let our intelligent AI find products that perfectly align with your unique needs and preferences
              </Text>


            </View>
          </LinearGradient>
        </Animated.View>

        {/* Empty State */}
        <Animated.View entering={FadeInDown.delay(1200)} style={styles.emptyStateContainer}>
          <EmptyState type="search" />
        </Animated.View>
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
  heroSection: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  heroGradient: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCard: {
    position: 'absolute',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  floatingCardGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  floatingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  float1: {
    top: 20,
    right: 20,
  },
  float2: {
    top: 80,
    left: 20,
  },
  float3: {
    bottom: 20,
    right: 40,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  logoShadow: {
    position: 'absolute',
    bottom: -8,
    left: 10,
    right: 10,
    height: 20,
    backgroundColor: 'rgba(220, 38, 38, 0.3)',
    borderRadius: 50,
    transform: [{ scaleX: 0.8 }],
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroTagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  searchSection: {
    marginTop: 32,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  featureIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '400',
  },
  featureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureFooterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  emptyStateContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
});