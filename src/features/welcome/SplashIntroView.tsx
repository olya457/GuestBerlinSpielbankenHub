import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {appProfile, assets} from '../../domain/berlinGuide';
import {colors} from '../../shared/theme';

export function SplashIntroView(): React.JSX.Element {
  return (
    <ImageBackground source={assets.splash} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.center}>
        <Image source={assets.mark} style={styles.logo} resizeMode="contain" />
        <AppText variant="title" center style={styles.title}>
          {appProfile.name}
        </AppText>
        <AppText variant="eyebrow" center>
          Venues / Games / Routes / Notes
        </AppText>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.13)',
  },
  center: {
    width: '78%',
    alignItems: 'center',
  },
  logo: {
    width: 172,
    height: 112,
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 34,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.redDark,
  },
  dotActive: {
    backgroundColor: colors.red,
  },
});
