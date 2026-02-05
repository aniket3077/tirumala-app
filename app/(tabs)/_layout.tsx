import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 30,
              overflow: 'hidden',
              backgroundColor: 'rgba(255,255,255,0.7)'
            }}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'transparent', // Important for BlurView
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          paddingBottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
              <Ionicons size={24} name={focused ? "home" : "home-outline"} color={color} />
              {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
              <Ionicons size={24} name={focused ? "person" : "person-outline"} color={color} />
              {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: 'Agri Experts',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
              <Ionicons size={24} name={focused ? "headset" : "headset-outline"} color={color} />
              {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
              <Ionicons size={24} name={focused ? "settings" : "settings-outline"} color={color} />
              {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, marginTop: 4 }} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
