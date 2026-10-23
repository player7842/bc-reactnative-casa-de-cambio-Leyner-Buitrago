import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Currency, Trend } from '../types';

interface ItemCardProps {
  item: Currency;
  onPress: (item: Currency) => void;
}

function formatCOP(value: number): string {
  return '$ ' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.country}</Text>
          </View>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
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
        </View>

        <View style={styles.footerRow}>
          <View style={[styles.trendBadge, TREND_BADGE[item.trend]]}>
            <Text style={[styles.trendText, TREND_TEXT[item.trend]]}>{TREND_LABEL[item.trend]}</Text>
          </View>
          <Text style={styles.actionText}>Toca para cotizar →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardPressed: { backgroundColor: '#21262d', opacity: 0.9 },
  cardImage: { width: '100%', height: 140 },
  cardBody: { padding: 16, gap: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleColumn: { flex: 1, gap: 2 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  cardSubtitle: { fontSize: 14, color: '#8b949e' },
  codeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#e3b34133',
    marginLeft: 12,
  },
  codeText: { fontSize: 14, fontWeight: 'bold', color: '#e3b341', letterSpacing: 1 },
  ratesRow: { flexDirection: 'row', gap: 12 },
  rateBox: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#0d1117',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  rateLabel: { fontSize: 12, color: '#8b949e', marginBottom: 2 },
  rateValue: { fontSize: 17, fontWeight: '600', color: '#e6edf3' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trendBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  trendText: { fontSize: 12, fontWeight: '600' },
  trendUp: { backgroundColor: '#3fb95033' },
  trendDown: { backgroundColor: '#f8514933' },
  trendFlat: { backgroundColor: '#8b949e33' },
  trendUpText: { color: '#3fb950' },
  trendDownText: { color: '#f85149' },
  trendFlatText: { color: '#8b949e' },
  actionText: { fontSize: 13, color: '#58a6ff' },
});

const TREND_BADGE: Record<Trend, StyleProp<ViewStyle>> = {
  sube: styles.trendUp,
  baja: styles.trendDown,
  estable: styles.trendFlat,
};

const TREND_TEXT: Record<Trend, StyleProp<TextStyle>> = {
  sube: styles.trendUpText,
  baja: styles.trendDownText,
  estable: styles.trendFlatText,
};

const TREND_LABEL: Record<Trend, string> = {
  sube: '▲ Sube',
  baja: '▼ Baja',
  estable: '● Estable',
};