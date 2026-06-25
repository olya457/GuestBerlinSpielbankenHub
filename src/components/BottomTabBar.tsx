import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {colors, shadow, spacing} from '../theme';
import type {TabId} from '../types';
import {useNavigation} from '../navigation/NavigationContext';
import {AppText} from './AppText';

const tabs: Array<{id: TabId; label: string; icon: string}> = [
  {id: 'hub', label: 'Hub', icon: 'H'},
  {id: 'venues', label: 'Venues', icon: 'V'},
  {id: 'games', label: 'Games', icon: 'G'},
  {id: 'tools', label: 'Tools', icon: 'T'},
  {id: 'notes', label: 'Notes', icon: 'N'},
];

export function BottomTabBar(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      {tabs.map(tab => {
        const active = navigation.activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => navigation.setTab(tab.id)}
            style={({pressed}) => [styles.item, pressed && styles.pressed]}>
            <View style={[styles.iconWrap, active && styles.iconActive]}>
              <AppText style={[styles.icon, active && styles.activeText]}>{tab.icon}</AppText>
            </View>
            <AppText variant="caption" style={[styles.label, active && styles.activeText]}>
              {tab.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'android' ? spacing.androidPanelGap : spacing.iosPanelGap,
    height: spacing.navHeight,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    ...shadow,
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressed: {
    opacity: 0.78,
  },
  iconWrap: {
    width: 38,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    backgroundColor: '#2b0c12',
    borderWidth: 1,
    borderColor: colors.borderRed,
  },
  icon: {
    color: colors.mutedDark,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '800',
  },
  label: {
    color: colors.mutedDark,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
  },
  activeText: {
    color: colors.red,
  },
});
