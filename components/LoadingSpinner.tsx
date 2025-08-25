import { LinearGradient } from 'expo-linear-gradient';
import { Award, Brain, Search, Sparkles, Target, Zap } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export function LoadingSpinner() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);
  const floatY = useSharedValue(0);
  const floatX1 = useSharedValue(0);
  const floatX2 = useSharedValue(0);
  const floatX3 = useSharedValue(0);
  const floatX4 = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000 }),
      -1,
      false
    );
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(0.9, { duration: 1000 })
      ),
      -1,
      true
    );
    
    floatY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2000 }),
        withTiming(15, { duration: 2000 })
      ),
      -1,
      true
    );

    floatX1.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2500 }),
        withTiming(10, { duration: 2500 })
      ),
      -1,
      true
    );

    floatX2.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 2000 }),
        withTiming(-10, { duration: 2000 })
      ),
      -1,
      true
    );

    floatX3.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2200 }),
        withTiming(8, { duration: 2200 })
      ),
      -1,
      true
    );

    floatX4.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 2400 }),
        withTiming(-8, { duration: 2400 })
      ),
      -1,
      true
    );
    
    opacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
    
    opacity2.value = withDelay(300, withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    ));
    
    opacity3.value = withDelay(600, withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
        { translateY: floatY.value }
      ],
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0.9, 1.1], [0.15, 0.35]);
    return {
      opacity,
    };
  });

  const floatStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateX: floatX1.value }, { translateY: floatY.value }],
  }));

  const floatStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: floatX2.value }, { translateY: floatY.value }],
  }));

  const floatStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateX: floatX3.value }, { translateY: floatY.value }],
  }));

  const floatStyle4 = useAnimatedStyle(() => ({
    transform: [{ translateX: floatX4.value }, { translateY: floatY.value }],
  }));

  const dot1Style = useAnimatedStyle(() => ({ opacity: opacity1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: opacity2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: opacity3.value }));

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <Animated.View style={[styles.floatingElement, styles.element1, floatStyle1]}>
          <LinearGradient colors={['#ef4444', '#f97316']} style={styles.floatingGradient}>
            <Brain size={24} color="#ffffff" />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.element2, floatStyle2]}>
          <LinearGradient colors={['#facc15', '#fef08a']} style={styles.floatingGradient}>
            <Zap size={22} color="#ffffff" />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.element3, floatStyle3]}>
          <LinearGradient colors={['#dc2626', '#f59e0b']} style={styles.floatingGradient}>
            <Target size={20} color="#ffffff" />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.element4, floatStyle4]}>
          <LinearGradient colors={['#f59e0b', '#fed7aa']} style={styles.floatingGradient}>
            <Award size={18} color="#ffffff" />
          </LinearGradient>
        </Animated.View>
      </View>
      
      {/* Main Spinner */}
      <View style={styles.spinnerContainer}>
        <Animated.View style={[styles.pulseCircle1, pulseStyle]} />
        <Animated.View style={[styles.pulseCircle2, pulseStyle]} />
        <Animated.View style={[styles.pulseCircle3, pulseStyle]} />
        
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <LinearGradient
            colors={['#dc2626', '#f59e0b', '#facc15']}
            style={styles.iconGradient}
          >
            <Sparkles size={48} color="#ffffff" />
          </LinearGradient>
        </Animated.View>
      </View>
      
      {/* Loading Text */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>AI is analyzing products</Text>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </View>
      
      <Text style={styles.subtext}>Finding the perfect match for your needs</Text>
      
      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <LinearGradient colors={['#ef4444', '#f97316']} style={styles.stepIcon}>
            <Search size={18} color="#ffffff" />
          </LinearGradient>
        </View>
        
        <View style={styles.stepConnector} />
        
        <View style={styles.step}>
          <LinearGradient colors={['#facc15', '#fef08a']} style={styles.stepIcon}>
            <Brain size={18} color="#ffffff" />
          </LinearGradient>
        </View>
        
        <View style={styles.stepConnector} />
        
        <View style={styles.step}>
          <LinearGradient colors={['#dc2626', '#f59e0b']} style={styles.stepIcon}>
            <Award size={18} color="#ffffff" />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 32,
    width: width,
    maxWidth: 600,
    alignSelf: 'center',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  floatingGradient: {
    width: 56,
    height: 56,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  element1: {
    top: '10%',
    left: '5%',
  },
  element2: {
    top: '20%',
    right: '5%',
  },
  element3: {
    bottom: '25%',
    left: '10%',
  },
  element4: {
    bottom: '15%',
    right: '10%',
  },
  spinnerContainer: {
    position: 'relative',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  pulseCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  pulseCircle2: {
    position: 'absolute',
    width: 140,
    height: 140, 
    borderRadius: 70,
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(250, 204, 21, 0.25)',
  },
  pulseCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius:  50,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    padding: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
  },
  subtext: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
    paddingHorizontal: 16,
    maxWidth: 400,
    lineHeight: 22,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#fee2e2',
    maxWidth: 500,
    width: '100%',
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flex: 1,
    paddingHorizontal: 8,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  stepText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 100,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  stepConnector: {
    width: 28,
    height: 3,
    backgroundColor: '#fee2e2',
    marginHorizontal: 12,
  },
});