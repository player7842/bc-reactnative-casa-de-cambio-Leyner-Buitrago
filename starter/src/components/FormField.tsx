import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Genérico: sirve para cualquier formulario. TFieldValues = lo que escribe el usuario,
// TTransformed = lo que sale después de pasar por el schema Zod.
interface FormFieldProps<TFieldValues extends FieldValues, TTransformed = TFieldValues>
  extends TextInputProps {
  control: Control<TFieldValues, unknown, TTransformed>;
  name: FieldPath<TFieldValues>;
  label: string;
  errorMessage?: string;
}

/** Controller + TextInput + mensaje de error, listo para reutilizar en cualquier pantalla */
export function FormField<TFieldValues extends FieldValues, TTransformed = TFieldValues>({
  control,
  name,
  label,
  errorMessage,
  ...textInputProps
}: FormFieldProps<TFieldValues, TTransformed>): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errorMessage !== undefined && styles.inputError]}
            // Los campos numéricos pueden traer un number: el TextInput siempre necesita texto
            value={value === undefined || value === null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            autoCorrect={false}
            {...textInputProps}
          />
        )}
      />

      {/* Reserva espacio para el error y evita saltos en el layout */}
      <Text style={styles.error} numberOfLines={2}>
        {errorMessage ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.xs },
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
    paddingVertical: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  inputError: { borderColor: COLORS.error },
  error: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.error,
    minHeight: 16,
  },
});