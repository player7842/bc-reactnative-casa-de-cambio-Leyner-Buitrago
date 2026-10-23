import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Currency, Trend } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';


interface ItemCardProps {
  item: Currency;
  onPress: (item: Currency) => void;
}

/** Valores >= 100 sin decimales y con punto de miles; los menores, con 2 decimales */
export function formatCOP(value: number): string {
  if (value >= 100) {
    return '$ ' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '$ ' + value.toFixed(2).replace('.', ',');
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <View style={styles.topRow}>
        <Image source={{ uri: item.imageUri }} style={styles.flag} resizeMode="cover" />
        <View style={styles.titleColumn}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.fieldText}>{item.country}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.code}</Text>
        </View>
      </View>

      <View style={styles.ratesRow}>
        <View style={styles.rateBox}>
          <Text style={styles.rateLabel}>Compramos</Text>
          <Text style={styles.rateValue}>{formatCOP(item.buyRate)}</Text>
        </View>
        <View style={styles.rateBox}>
          <Text style={styles.rateLabel}>Vendemos</Text>
          <Text style={styles.rateValue}>{formatCOP(item.sellRate)}</Text>
        </View>
        <Text style={[styles.trendText, TREND_TEXT[item.trend]]}>{TREND_LABEL[item.trend]}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: RADIUS.sm,
  },
  titleColumn: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
    letterSpacing: 1,
  },
  ratesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  rateBox: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rateLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  rateValue: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  trendText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    minWidth: 70,
    textAlign: 'right',
  },
  trendUp: { color: COLORS.success },
  trendDown: { color: COLORS.error },
  trendFlat: { color: COLORS.textSecondary },
});

const TREND_TEXT: Record<Trend, StyleProp<TextStyle>> = {
  sube: styles.trendUp,
  baja: styles.trendDown,
  estable: styles.trendFlat,
};

const TREND_LABEL: Record<Trend, string> = {
  sube: '▲ Sube',
  baja: '▼ Baja',
  estable: '● Estable',
};