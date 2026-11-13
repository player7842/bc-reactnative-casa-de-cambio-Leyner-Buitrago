import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Alert,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Currency } from '../types';
import { useSavedStore } from '../stores/savedStore';
import { formatCOP } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

function ItemSeparator(): React.JSX.Element {
  return <View style={styles.separator} />;
}

/** Fila de una divisa guardada: lee la acción removeItem directamente del store */
function SavedRow({ item }: { item: Currency }): React.JSX.Element {
  const removeItem = useSavedStore((state) => state.removeItem);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.flag} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>
          {item.code} · compra {formatCOP(item.buyRate)} · venta {formatCOP(item.sellRate)}
        </Text>
      </View>
      <Pressable
        onPress={() => removeItem(item.id)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Quitar ${item.name} de guardadas`}
      >
        <Ionicons name="close-circle" size={24} color={COLORS.error} />
      </Pressable>
    </View>
  );
}

const renderSaved: ListRenderItem<Currency> = ({ item }) => <SavedRow item={item} />;

export function SavedScreen(): React.JSX.Element {
  // Selectores específicos: la lista y la acción de vaciar
  const items = useSavedStore((state) => state.items);
  const clearAll = useSavedStore((state) => state.clearAll);
  
  // Pide confirmación antes de borrar todo
  function handleClearAll(): void {
    Alert.alert('Limpiar guardadas', '¿Quitar todas las divisas guardadas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Quitar todas', style: 'destructive', onPress: clearAll },
    ]);
  }

  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderSaved}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        items.length > 0 ? (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>
              {items.length} {items.length === 1 ? 'divisa guardada' : 'divisas guardadas'}
            </Text>
            <Pressable
              onPress={handleClearAll}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Limpiar todas las divisas guardadas"
            >
              <Text style={styles.clearText}>Limpiar todo</Text>
            </Pressable>
          </View>
        ) : undefined
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no has guardado divisas</Text>
          <Text style={styles.emptySubText}>
            Ve a la pestaña Divisas y toca el marcador de una tarjeta, o guárdala desde su detalle.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.base, flexGrow: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerText: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
  clearText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.error,
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
  flag: { width: 48, height: 32, borderRadius: RADIUS.sm },
  cardContent: { flex: 1 },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemInfo: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
  separator: { height: SPACING.sm },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});