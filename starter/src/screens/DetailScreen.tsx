import React from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import { formatCOP } from '../components/ItemCard';
import type { HomeStackParamList } from '../navigation/types';

// Tipos del route (params que llegan) y del navigation (para goBack)
type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;
type DetailNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeDetail'>;

const TREND_LABEL = {
  sube: '▲ Sube',
  baja: '▼ Baja',
  estable: '● Estable',
} as const;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<DetailNavigationProp>();
  const { id, name, code, country, imageUri, buyRate, sellRate, trend } = route.params;

  // Margen de la casa de cambio: diferencia entre lo que vende y lo que compra
  const spread = sellRate - buyRate;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: imageUri }} style={styles.flag} resizeMode="cover" />

      <Text style={styles.name}>{name}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {code} · ID {id}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>País o región</Text>
        <Text style={styles.fieldValue}>{country}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Compramos a</Text>
        <Text style={styles.fieldValue}>{formatCOP(buyRate)}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Vendemos a</Text>
        <Text style={styles.fieldValue}>{formatCOP(sellRate)}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Margen</Text>
        <Text style={styles.fieldValue}>{formatCOP(spread)}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tendencia del día</Text>
        <Text style={styles.fieldValue}>{TREND_LABEL[trend]}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Volver a la lista</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
  },
  flag: {
    width: '100%',
    height: 160,
    borderRadius: RADIUS.lg,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.textPrimary,
  },
  backButton: {
    marginTop: SPACING.sm,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  backButtonPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.primary,
  },
});