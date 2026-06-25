import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {colors} from '../theme';

type Props = ViewProps & {
  accent?: boolean;
};

export function Card({accent, style, ...props}: Props): React.JSX.Element {
  return <View {...props} style={[styles.card, accent && styles.accent, style]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  accent: {
    borderColor: colors.borderRed,
  },
});
