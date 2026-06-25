import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '../theme';

export function Field(props: TextInputProps): React.JSX.Element {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.mutedDark}
      style={[styles.field, props.multiline && styles.multiline, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '600',
  },
  multiline: {
    height: 84,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
