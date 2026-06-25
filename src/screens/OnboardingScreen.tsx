import React, {useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {onboardingSlides} from '../data/content';
import {colors, spacing} from '../theme';

type Props = {
  onDone: () => void;
};

export function OnboardingScreen({onDone}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const {height, width} = useWindowDimensions();
  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;
  const tiny = height < 680;
  const compact = height < 740;
  const contentWidth = Math.max(280, width - spacing.screenX * 2);
  const imageHeight = Math.min(
    contentWidth * 1.22,
    height * (tiny ? 0.39 : compact ? 0.43 : 0.49),
    compact ? 330 : 430,
  );
  const topInset = Platform.OS === 'android' ? spacing.androidEdge : tiny ? 22 : compact ? 38 : 58;
  const bottomInset = Platform.OS === 'android' ? spacing.androidEdge : tiny ? 18 : 30;

  return (
    <View style={[styles.root, {paddingTop: topInset, paddingBottom: bottomInset}]}>
      <Pressable onPress={onDone} style={[styles.skip, compact && styles.skipCompact]}>
        <AppText variant="caption" style={styles.skipText}>
          Skip
        </AppText>
      </Pressable>
      <Image source={slide.image} style={[styles.image, {height: imageHeight}]} resizeMode="cover" />
      <View style={[styles.copy, tiny ? styles.copyTiny : compact && styles.copyCompact]}>
        <AppText
          variant="title"
          center
          style={compact && styles.titleCompact}>
          {slide.title}
        </AppText>
        <AppText muted center style={[styles.body, compact && styles.bodyCompact]}>
          {slide.text}
        </AppText>
      </View>
      <View style={[styles.dots, compact && styles.dotsCompact]}>
        {onboardingSlides.map((item, dotIndex) => (
          <View key={item.title} style={[styles.dot, dotIndex === index && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.buttons}>
        {index > 0 ? (
          <Button title="Back" variant="ghost" onPress={() => setIndex(index - 1)} style={styles.back} />
        ) : null}
        <Button
          title={isLast ? 'Start Exploring' : 'Next'}
          onPress={() => (isLast ? onDone() : setIndex(index + 1))}
          style={styles.next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenX,
  },
  skip: {
    alignSelf: 'flex-end',
    minHeight: 36,
    justifyContent: 'center',
    marginBottom: 8,
  },
  skipCompact: {
    minHeight: 30,
    marginBottom: 4,
  },
  skipText: {
    color: colors.red,
    fontWeight: '900',
  },
  image: {
    width: '100%',
    borderRadius: 22,
    backgroundColor: colors.panel,
  },
  copy: {
    minHeight: 164,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  copyCompact: {
    minHeight: 136,
  },
  copyTiny: {
    minHeight: 118,
  },
  titleCompact: {
    fontSize: 23,
    lineHeight: 28,
  },
  body: {
    marginTop: 16,
  },
  bodyCompact: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginTop: 'auto',
    marginBottom: 22,
  },
  dotsCompact: {
    marginBottom: 14,
  },
  dot: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.redDark,
  },
  dotActive: {
    backgroundColor: colors.red,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  back: {
    flex: 0.95,
  },
  next: {
    flex: 1.9,
  },
});
