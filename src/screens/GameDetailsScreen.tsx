import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmptyState} from '../components/EmptyState';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {gameGuides} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

type Props = {
  gameId: string;
};

export function GameDetailsScreen({gameId}: Props): React.JSX.Element {
  const game = gameGuides.find(item => item.id === gameId);
  const navigation = useNavigation();

  if (!game) {
    return (
      <Screen>
        <Header title="Game Details" back />
        <EmptyState icon="!" title="Game not found" text="Choose another game guide item." />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <Header title="Game Details" back />
      <ImageBackground source={game.image} style={styles.hero} resizeMode="cover">
        <View style={styles.heroShade} />
        <View style={styles.heroCopy}>
          <View style={styles.categoryPill}>
            <AppText variant="caption" style={styles.categoryText}>
              {game.category}
            </AppText>
          </View>
          <AppText variant="title">{game.title}</AppText>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Card style={styles.description} accent>
          <AppText variant="eyebrow">Overview</AppText>
          <AppText muted>{game.summary}</AppText>
        </Card>
        <View style={styles.grid}>
          <Card style={styles.infoBox}>
            <AppText variant="caption" muted>
              TEMPO
            </AppText>
            <AppText style={styles.red}>{game.tempo}</AppText>
          </Card>
          <Card style={styles.infoBox}>
            <AppText variant="caption" muted>
              OFFERED AT
            </AppText>
            <AppText style={styles.red}>{game.offeredAt.join(', ')}</AppText>
          </Card>
        </View>
        <Card style={styles.tip}>
          <AppText variant="eyebrow">Beginner note</AppText>
          <AppText>{game.beginnerTip}</AppText>
        </Card>
        <Card style={styles.rules}>
          <AppText variant="eyebrow">Useful details</AppText>
          {game.details.map(detail => (
            <View key={detail} style={styles.detail}>
              <AppText style={styles.check}>OK</AppText>
              <AppText style={styles.detailText}>{detail}</AppText>
            </View>
          ))}
        </Card>
        <Button title="Compare Venues" onPress={() => navigation.setTab('venues')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 286,
    justifyContent: 'flex-end',
    backgroundColor: colors.panel,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.34)',
  },
  heroCopy: {
    padding: 16,
    gap: 10,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    backgroundColor: 'rgba(18,63,43,0.92)',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  categoryText: {
    color: colors.green,
    fontWeight: '900',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  description: {
    padding: 14,
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    minHeight: 116,
    padding: 14,
    gap: 6,
  },
  red: {
    color: colors.red,
    fontWeight: '900',
  },
  tip: {
    padding: 14,
    gap: 8,
    backgroundColor: '#071f14',
    borderColor: '#17452e',
  },
  rules: {
    padding: 14,
    gap: 9,
  },
  detail: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  check: {
    color: colors.green,
    fontWeight: '900',
    minWidth: 30,
  },
  detailText: {
    flex: 1,
  },
});
