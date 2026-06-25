import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../theme';
import {AppText} from './AppText';

type Props = {
  title: string;
  action?: string;
  onPress?: () => void;
};

export function SectionHeader({title, action, onPress}: Props): React.JSX.Element {
  return (
    <View style={styles.row}>
      <AppText variant="section">{title}</AppText>
      {action && onPress ? (
        <Pressable onPress={onPress} hitSlop={10}>
          <AppText variant="caption" style={styles.action}>
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    color: colors.red,
    fontWeight: '800',
  },
});
