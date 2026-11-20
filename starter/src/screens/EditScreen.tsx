import React, { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../components/FormField';
import { currencySchema } from '../schemas/currencySchema';
import type { CurrencyFormData, CurrencyFormInput } from '../schemas/currencySchema';
import { useCurrencyById, useUpdateCurrency } from '../hooks/useCurrencies';
import { currencyToFormValues, formToPayload } from '../utils/currencyForm';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type EditNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EditCurrency'>;
type EditRouteProp = RouteProp<HomeStackParamList, 'EditCurrency'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavigationProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  // Divisa actual, pedida al servidor
  const { data: item, isLoading, isError, error, refetch } = useCurrencyById(id);
  const { mutate, isPending } = useUpdateCurrency();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
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

  // Cuando la divisa llega del servidor, rellena el formulario con sus valores
  useEffect(() => {
    if (item) {
      reset(currencyToFormValues(item));
    }
  }, [item, reset]);

  function onSubmit(data: CurrencyFormData): void {
    if (!item) return;
    mutate(
      // Se conserva la tendencia que ya tenía la divisa
      { id, payload: { ...formToPayload(data), trend: item.trend } },
      {
        // Vuelve a la lista (que ya se refrescó por la invalidación)
        onSuccess: () => navigation.popToTop(),
        onError: (mutationError) =>
          Alert.alert('No se pudo guardar los cambios', mutationError.message),
      },
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.centeredText}>Cargando divisa…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>No se pudo cargar la divisa</Text>
        <Text style={styles.centeredText}>{error.message}</Text>
        <Pressable
          style={({ pressed }) => [styles.retryButton, pressed && styles.submitButtonPressed]}
          onPress={() => {
            void refetch();
          }}
          accessibilityRole="button"
        >
          <Text style={styles.submitText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const isBusy = isSubmitting || isPending;
  // Solo se puede guardar si cambió algo
  const isDisabled = isBusy || !isDirty;

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
            isDisabled && styles.submitButtonDisabled,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          disabled={isDisabled}
          accessibilityRole="button"
        >
          {isBusy ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitText}>Guardar cambios</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.base, gap: SPACING.xs },
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