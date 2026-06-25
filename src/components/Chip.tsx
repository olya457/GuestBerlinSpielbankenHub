import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme';
import {AppText} from './AppText';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function Chip({label, active, onPress, style}: Props): React.JSX.Element {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        active && styles.active,
        pressed && styles.pressed,
        style,
      ]}>
      <AppText variant="caption" style={[styles.label, active && styles.activeLabel]}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.borderRed,
    paddingHorizontal: 14,
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
  },
  active: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    color: colors.red,
    fontWeight: '800',
  },
  activeLabel: {
    color: colors.white,
  },
});
