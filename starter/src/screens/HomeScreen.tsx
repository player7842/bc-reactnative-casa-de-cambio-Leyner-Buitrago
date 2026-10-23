import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Currency } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

const DOMAIN_TITLE = 'Casa de Cambio';
const DOMAIN_SUBTITLE = 'Cotizaciones del día en pesos colombianos (COP)';

export function HomeScreen(): React.JSX.Element {
  function handleItemPress(item: Currency): void {
    Alert.alert(
      `${item.name} (${item.code})`,
      `Compramos a ${item.buyRate} y vendemos a ${item.sellRate} COP.`,
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d1117' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 14, color: '#8b949e', marginTop: 4 },
  listContainer: { flex: 1 },
  listContent: { padding: 16 },
});