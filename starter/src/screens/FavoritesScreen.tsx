import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Currency } from '../types';
import { FAVORITES } from '../data/mockData';
import { formatCOP } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

function ItemSeparator(): React.JSX.Element {
  return <View style={styles.separator} />;
}

const renderFavorite: ListRenderItem<Currency> = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.imageUri }} style={styles.flag} resizeMode="cover" />
    <View style={styles.cardContent}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemInfo}>
        {item.code} · compra {formatCOP(item.buyRate)} · venta {formatCOP(item.sellRate)}
      </Text>
    </View>
    <Ionicons name="heart" size={22} color={COLORS.error} />
  </View>
);

export function FavoritesScreen(): React.JSX.Element {
  return (
    <FlatList
      style={styles.container}
      data={FAVORITES}
      keyExtractor={(item) => item.id}
      renderItem={renderFavorite}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Todavía no tienes divisas favoritas</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.base,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: RADIUS.sm,
  },
  cardContent: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemInfo: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});