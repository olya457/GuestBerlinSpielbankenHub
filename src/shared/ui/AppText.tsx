import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors, fonts} from '../theme';

type Props = TextProps & {
  variant?: 'title' | 'section' | 'body' | 'caption' | 'eyebrow';
  muted?: boolean;
  center?: boolean;
};

export function AppText({variant = 'body', muted, center, style, ...props}: Props): React.JSX.Element {
  return (
    <Text
      {...props}
      allowFontScaling
      style={[
        styles.base,
        styles[variant],
        muted && styles.muted,
        center && styles.center,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '700',
  },
  section: {
    fontFamily: fonts.title,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  caption: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  eyebrow: {
    color: colors.red,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  muted: {
    color: colors.muted,
  },
  center: {
    textAlign: 'center',
  },
});
