import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Currency } from '../types';
import { useCurrencies } from '../hooks/useCurrencies';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

/** Pasa a minúsculas y quita tildes: "dolar" encuentra "Dólar" */
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function ItemSeparator(): React.JSX.Element {
  return <View style={styles.separator} />;
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [query, setQuery] = useState<string>('');

  // Datos del servidor con TanStack Query
  const { data, isLoading, isError, error, refetch, isRefetching } = useCurrencies();

  const filteredItems = useMemo<Currency[]>(() => {
    const list = data ?? [];
    const term = normalizeText(query);
    if (term === '') {
      return list;
    }
    return list.filter(
      (c) =>
        normalizeText(c.name).includes(term) ||
        normalizeText(c.code).includes(term) ||
        normalizeText(c.country).includes(term),
    );
  }, [data, query]);

  const handleItemPress = useCallback(
    (item: Currency): void => {
      navigation.navigate('HomeDetail', {
        id: item.id,
        name: item.name,
        code: item.code,
        country: item.country,
        imageUri: item.imageUri,
        buyRate: item.buyRate,
        sellRate: item.sellRate,
        trend: item.trend,
      });
    },
    [navigation],
  );

  // Estado vacío: no hay divisas en el servidor, o la búsqueda no encontró nada
  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        {query === '' ? (
          <>
            <Text style={styles.emptyText}>Aún no hay divisas registradas</Text>
            <Text style={styles.emptySubText}>Toca el + de arriba para agregar la primera.</Text>
          </>
        ) : (
          <>
            <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
            <Text style={styles.emptySubText}>
              Prueba con el nombre de la divisa, su código (USD, EUR…) o el país.
            </Text>
          </>
        )}
      </View>
    ),
    [query],
  );

  const renderItem: ListRenderItem<Currency> = useCallback(
    ({ item }) => <ItemCard item={item} onPress={handleItemPress} />,
    [handleItemPress],
  );

  // Estado de carga
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.centeredText}>Cargando divisas…</Text>
      </View>
    );
  }

  // Estado de error (solo si no hay datos que mostrar)
  if (isError && data === undefined) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>No se pudieron cargar las divisas</Text>
        <Text style={styles.centeredText}>{error.message}</Text>
        <Pressable
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
          onPress={() => {
            void refetch();
          }}
          accessibilityRole="button"
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              {filteredItems.length} de {data?.length ?? 0} divisas · precios en COP
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar divisa, código o país..."
              placeholderTextColor={COLORS.textMuted}
              value={query}
              onChangeText={setQuery}
              keyboardType="default"
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            // Pull-to-refresh: vuelve a pedir la lista al servidor
            refreshing={isRefetching}
            onRefresh={() => {
              void refetch();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kvContainer: { flex: 1, backgroundColor: COLORS.background },
  inner: { flex: 1 },
  header: { paddingHorizontal: SPACING.base, paddingTop: SPACING.md },
  subtitle: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: { paddingTop: SPACING.sm, paddingBottom: SPACING.xl, flexGrow: 1 },
  separator: { height: SPACING.xs },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.xxl,
    backgroundColor: COLORS.background,
  },
  centeredText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  retryButtonPressed: { opacity: 0.8 },
  retryText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: '600',
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