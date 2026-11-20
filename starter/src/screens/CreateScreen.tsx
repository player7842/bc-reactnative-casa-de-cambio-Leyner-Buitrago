import React from 'react';
import {
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../components/FormField';
import { currencySchema } from '../schemas/currencySchema';
import type { CurrencyFormData, CurrencyFormInput } from '../schemas/currencySchema';
import { useCreateCurrency } from '../hooks/useCurrencies';
import { formToPayload } from '../utils/currencyForm';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type CreateNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CreateCurrency'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavigationProp>();
  const { mutate, isPending } = useCreateCurrency();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyFormInput, unknown, CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      name: '',
      code: '',
      country: '',
      flagIso: '',
      buyRate: '',
      sellRate: '',
    },
  });

  // Solo se ejecuta si el formulario pasó la validación de Zod: `data` ya viene tipado y convertido
  function onSubmit(data: CurrencyFormData): void {
    mutate(formToPayload(data), {
      onSuccess: () => navigation.goBack(),
      onError: (error) => Alert.alert('No se pudo crear la divisa', error.message),
    });
  }

  const isBusy = isSubmitting || isPending;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField
          control={control}
          name="name"
          label="Nombre de la divisa"
          placeholder="Ej. Dólar australiano"
          errorMessage={errors.name?.message}
        />
        <FormField
          control={control}
          name="code"
          label="Código"
          placeholder="Ej. AUD"
          autoCapitalize="characters"
          maxLength={3}
          errorMessage={errors.code?.message}
        />
        <FormField
          control={control}
          name="country"
          label="País o región"
          placeholder="Ej. Australia"
          errorMessage={errors.country?.message}
        />
        <FormField
          control={control}
          name="flagIso"
          label="Código del país para la bandera (2 letras)"
          placeholder="Ej. au"
          autoCapitalize="none"
          maxLength={2}
          errorMessage={errors.flagIso?.message}
        />
        <FormField
          control={control}
          name="buyRate"
          label="Precio de compra (COP)"
          placeholder="Ej. 2500"
          keyboardType="decimal-pad"
          errorMessage={errors.buyRate?.message}
        />
        <FormField
          control={control}
          name="sellRate"
          label="Precio de venta (COP)"
          placeholder="Ej. 2600"
          keyboardType="decimal-pad"
          errorMessage={errors.sellRate?.message}
        />

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            isBusy && styles.submitButtonDisabled,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          disabled={isBusy}
          accessibilityRole="button"
        >
          {isBusy ? (
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
  content: { padding: SPACING.base, gap: SPACING.xs },
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