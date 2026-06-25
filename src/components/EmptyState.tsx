import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme';
import {AppText} from './AppText';
import {Button} from './Button';

type Props = {
  icon: string;
  title: string;
  text: string;
  action?: string;
  onPress?: () => void;
};

export function EmptyState({icon, title, text, action, onPress}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      <AppText style={styles.icon}>{icon}</AppText>
      <AppText variant="section" center>
        {title}
      </AppText>
      <AppText muted center>
        {text}
      </AppText>
      {action && onPress ? <Button title={action} onPress={onPress} style={styles.button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
  },
  icon: {
    fontSize: 34,
    lineHeight: 44,
  },
  button: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
});
