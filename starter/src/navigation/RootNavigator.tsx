import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
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
        // El título del header sale de los params que se enviaron al navegar
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
                ? 'heart'
                : 'heart-outline';
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
      {/* La pestaña Home usa el Stack interno, que ya trae su propio header */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Divisas', headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favoritas', title: 'Divisas favoritas' }}
      />
    </Tab.Navigator>
  );
}