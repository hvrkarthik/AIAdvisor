import { useAppContext } from '@/contexts/AppContext';
import { PRODUCT_CATALOG } from '@/data/productCatalog';
import { AIService } from '@/services/aiService';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Search, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export function SearchInput() {
  const [localQuery, setLocalQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { setSearchQuery, setRecommendations, setLoading, setError } = useAppContext();

  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderWidth: borderWidth.value,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleSearch = async () => {
    if (!localQuery.trim()) {
      scale.value = withSpring(0.98, {}, () => {
        scale.value = withSpring(1);
      });
      Alert.alert('Search Required', 'Please describe what you\'re looking for to get AI recommendations.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchQuery(localQuery);

    try {
      const aiResponse = await AIService.getProductRecommendations(localQuery, PRODUCT_CATALOG);
      setRecommendations(aiResponse);
      router.push('/recommendations');
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'Search failed');
      Alert.alert('Search Error', 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.01);
    borderWidth.value = withTiming(2);
    buttonScale.value = withSpring(1.03);
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1);
    borderWidth.value = withTiming(1);
    buttonScale.value = withSpring(1);
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Text style={styles.searchTitle}>What are you looking for?</Text>
        <Text style={styles.searchSubtitle}>Describe your perfect product</Text>
      </View>

      {/* Main Search Input and Button */}
      <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
        <View style={styles.inputWrapper}>
          <View style={styles.searchIconContainer}>
            <LinearGradient
              colors={isFocused ? ['#ef4444', '#f97316'] : ['#fee2e2', '#fed7aa']}
              style={styles.searchIconGradient}
            >
              <Search size={18} color="#ffffff" />
            </LinearGradient>
          </View>

          <TextInput
            style={styles.input}
            placeholder="e.g., Lightweight laptop for travel..."
            placeholderTextColor="#94a3b8"
            value={localQuery}
            onChangeText={setLocalQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        {/* Search Button */}
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity onPress={handleSearch}>
            <LinearGradient
              colors={['#ef4444', '#f97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <View style={styles.buttonContent}>
                <Search size={16} color="#ffffff" />
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Quick Suggestions */}
      <View style={styles.suggestionsContainer}>
        <View style={styles.suggestionsHeader}>
          <Sparkles size={14} color="#ef4444" />
          <Text style={styles.suggestionsTitle}>Popular searches:</Text>
        </View>
        <View style={styles.suggestions}>
          {[
            'Lightweight laptop for travel',
            'Noise-canceling headphones',
            'Professional camera for photography',
            'Gaming laptop under $2000',
            'Wireless earbuds for workouts'
          ].map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => setLocalQuery(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  searchHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  searchSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderColor: '#fee2e2',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    paddingBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIconContainer: {
    marginTop: 4,
    marginRight: 12,
  },
  searchIconGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 20,
    minHeight: 48,
    fontWeight: '500',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  suggestionsContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  suggestionsTitle: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  suggestionText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
});