import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateCurrency } from '../hooks/useCurrencies';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { CreateCurrencyPayload } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type CreateNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CreateCurrency'>;

interface FieldProps extends TextInputProps {
  label: string;
}

/** Campo de formulario: etiqueta + input con el estilo del tema */
function Field({ label, ...inputProps }: FieldProps): React.JSX.Element {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textMuted}
        autoCorrect={false}
        {...inputProps}
      />
    </View>
  );
}

/** Convierte "3.910,5" o "3910.5" en número; devuelve NaN si no es válido */
function parseRate(text: string): number {
  return Number(text.trim().replace(',', '.'));
}

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavigationProp>();
  const { mutate, isPending } = useCreateCurrency();

  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [flagIso, setFlagIso] = useState<string>('');
  const [buyRate, setBuyRate] = useState<string>('');
  const [sellRate, setSellRate] = useState<string>('');

  const buy = parseRate(buyRate);
  const sell = parseRate(sellRate);
  const canSubmit =
    name.trim() !== '' &&
    code.trim() !== '' &&
    country.trim() !== '' &&
    Number.isFinite(buy) &&
    buy > 0 &&
    Number.isFinite(sell) &&
    sell > 0;

  function handleSubmit(): void {
    const iso = flagIso.trim().toLowerCase();
    const payload: CreateCurrencyPayload = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      country: country.trim(),
      imageUri: `https://flagcdn.com/w160/${iso === '' ? 'un' : iso}.png`,
      buyRate: buy,
      sellRate: sell,
      trend: 'estable',
    };

    mutate(payload, {
      // La invalidación de la lista ocurre en el onSuccess del hook; aquí solo cerramos
      onSuccess: () => navigation.goBack(),
      onError: (error) => Alert.alert('No se pudo crear la divisa', error.message),
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Field
          label="Nombre de la divisa"
          placeholder="Ej. Dólar australiano"
          value={name}
          onChangeText={setName}
        />
        <Field
          label="Código"
          placeholder="Ej. AUD"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
          maxLength={4}
        />
        <Field
          label="País o región"
          placeholder="Ej. Australia"
          value={country}
          onChangeText={setCountry}
        />
        <Field
          label="Código del país para la bandera (2 letras)"
          placeholder="Ej. au"
          value={flagIso}
          onChangeText={setFlagIso}
          autoCapitalize="none"
          maxLength={2}
        />
        <Field
          label="Precio de compra (COP)"
          placeholder="Ej. 2500"
          value={buyRate}
          onChangeText={setBuyRate}
          keyboardType="decimal-pad"
        />
        <Field
          label="Precio de venta (COP)"
          placeholder="Ej. 2600"
          value={sellRate}
          onChangeText={setSellRate}
          keyboardType="decimal-pad"
        />

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            (!canSubmit || isPending) && styles.submitButtonDisabled,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={handleSubmit}
          disabled={!canSubmit || isPending}
          accessibilityRole="button"
        >
          {isPending ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitText}>Crear divisa</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.base, gap: SPACING.md },
  field: { gap: SPACING.xs },
  label: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  submitButton: {
    marginTop: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonPressed: { opacity: 0.8 },
  submitText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.background,
  },
});