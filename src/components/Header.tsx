import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../theme';
import {useApp} from '../context/AppContext';
import {useNavigation} from '../navigation/NavigationContext';
import {AppText} from './AppText';

type Props = {
  title: string;
  subtitle?: string;
  back?: boolean;
  updates?: boolean;
};

export function Header({title, subtitle, back, updates}: Props): React.JSX.Element {
  const navigation = useNavigation();
  const {state} = useApp();
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {back ? (
          <Pressable onPress={navigation.back} style={styles.backButton}>
            <AppText style={styles.backText}>‹</AppText>
          </Pressable>
        ) : null}
        <View style={styles.titleBlock}>
          <AppText variant="section" numberOfLines={1}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText variant="caption" muted numberOfLines={1}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>
      {updates ? (
        <Pressable onPress={() => navigation.push('ActivityLog')} style={styles.updates}>
          <AppText style={styles.bell}>!</AppText>
          {state.activity.length ? (
            <View style={styles.badge}>
              <AppText variant="caption" style={styles.badgeText}>
                {Math.min(state.activity.length, 9)}
              </AppText>
            </View>
          ) : null}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleBlock: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelStrong,
  },
  backText: {
    color: colors.red,
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
  },
  updates: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.borderRed,
  },
  bell: {
    color: colors.red,
    fontSize: 18,
    fontWeight: '900',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '800',
  },
});
