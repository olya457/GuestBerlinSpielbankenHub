import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme';
import {AppText} from './AppText';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({title, onPress, variant = 'primary', disabled, style}: Props): React.JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <AppText style={[styles.label, variant !== 'primary' && styles.outlineLabel]}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.red,
  },
  secondary: {
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.borderRed,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderRed,
  },
  danger: {
    backgroundColor: '#24070c',
    borderWidth: 1,
    borderColor: colors.redDark,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.99}],
  },
  label: {
    color: colors.white,
    fontWeight: '800',
  },
  outlineLabel: {
    color: colors.red,
  },
});
