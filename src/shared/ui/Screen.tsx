import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {colors, spacing} from '../theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  withBottomNav?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

export function Screen({
  children,
  scroll = true,
  withBottomNav,
  padded = true,
  style,
  contentStyle,
}: Props): React.JSX.Element {
  const bottomPadding = withBottomNav
    ? spacing.navHeight + (Platform.OS === 'android' ? spacing.androidPanelGap : spacing.iosPanelGap) + 20
    : Platform.OS === 'android'
      ? spacing.androidEdge
      : 18;

  return (
    <SafeAreaView style={[styles.safe, style]}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            padded && styles.padded,
            {paddingBottom: bottomPadding},
            contentStyle,
          ]}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.flex,
            padded && styles.padded,
            {paddingBottom: bottomPadding},
            contentStyle,
          ]}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? spacing.androidEdge : 0,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    paddingHorizontal: spacing.screenX,
  },
});
