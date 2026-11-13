import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';

// ============================================
// STACK INTERNO — para la pestaña Home
// ============================================
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: TYPOGRAPHY.weight.semibold },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Casa de Cambio' }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

// ============================================
// TAB NAVIGATOR — raíz de la app
// ============================================
const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  // Selector específico: solo se re-renderiza cuando cambia la CANTIDAD de guardadas
  const savedCount = useSavedStore((state) => state.savedIds.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === 'Home'
              ? focused
                ? 'swap-horizontal'
                : 'swap-horizontal-outline'
              : focused
                ? 'bookmark'
                : 'bookmark-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: TYPOGRAPHY.weight.semibold },
        sceneStyle: { backgroundColor: COLORS.background },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Divisas', headerShown: false }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Guardadas',
          title: 'Divisas guardadas',
          // Badge en tiempo real: undefined oculta el círculo cuando no hay guardadas
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.primary,
            color: COLORS.background,
          },
        }}
      />
    </Tab.Navigator>
  );
}