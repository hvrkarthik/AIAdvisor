import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Search, Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 16,
          paddingTop: 12,
          position: 'absolute',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -6,
          },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 12,
          borderWidth: 1,
          borderColor: '#f1f5f9',
        },
        tabBarActiveTintColor: '#ef4444',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          marginTop: 12,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarBackground: () => (
          <View style={{ 
            flex: 1, 
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: focused ? '#ef4444' : '#f8fafc',
              shadowColor: focused ? '#ef4444' : '#000',
              shadowOffset: {
                width: 0,
                height: focused ? 6 : 2,
              },
              shadowOpacity: focused ? 0.25 : 0.08,
              shadowRadius: focused ? 12 : 4,
              elevation: focused ? 6 : 2,
              borderWidth: focused ? 0 : 1,
              borderColor: '#fee2e2',
            }}>
              {focused ? (
                <LinearGradient
                  colors={['#ef4444', '#f97316']}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Search size={20} color="#ffffff" />
                </LinearGradient>
              ) : (
                <Search size={18} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: 'Results',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: focused ? '#ef4444' : '#f8fafc',
              shadowColor: focused ? '#ef4444' : '#000',
              shadowOffset: {
                width: 0,
                height: focused ? 6 : 2,
              },
              shadowOpacity: focused ? 0.25 : 0.08,
              shadowRadius: focused ? 12 : 4,
              elevation: focused ? 6 : 2,
              borderWidth: focused ? 0 : 1,
              borderColor: '#fee2e2',
            }}>
              {focused ? (
                <LinearGradient
                  colors={['#ef4444', '#f97316']}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Sparkles size={20} color="#ffffff" />
                </LinearGradient>
              ) : (
                <Sparkles size={18} color={color} />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}