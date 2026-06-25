import React, {useMemo, useState} from 'react';
import {ImageBackground, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Card} from '../components/Card';
import {Chip} from '../components/Chip';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {gameGuides} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

const categories = ['All', 'Classic Tables', 'Poker', 'Machines'];

export function GameGuideScreen(): React.JSX.Element {
  const [category, setCategory] = useState('All');
  const navigation = useNavigation();
  const filtered = useMemo(
    () => (category === 'All' ? gameGuides : gameGuides.filter(game => game.category === category)),
    [category],
  );

  return (
    <Screen withBottomNav>
      <Header title="Game Guide" updates />
      <Card style={styles.intro} accent>
        <AppText variant="section">Spielbank Berlin game basics</AppText>
        <AppText muted>
          Official venues list roulette, blackjack, poker, baccarat, slots, Touchbet, and Ultimate Texas Holdem depending on location.
        </AppText>
      </Card>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroller}
        contentContainerStyle={styles.filters}>
        {categories.map(item => (
          <Chip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />
        ))}
      </ScrollView>
      {filtered.map(game => (
        <Pressable
          key={game.id}
          onPress={() => navigation.push('GameDetails', {gameId: game.id})}
          style={({pressed}) => [styles.pressable, pressed && styles.pressed]}>
          <Card style={styles.card}>
            <ImageBackground source={game.image} style={styles.image} imageStyle={styles.imageRadius}>
              <View style={styles.imageShade} />
              <View style={styles.categoryPill}>
                <AppText variant="caption" style={styles.categoryText}>
                  {game.category}
                </AppText>
              </View>
            </ImageBackground>
            <View style={styles.copy}>
              <View style={styles.titleRow}>
                <AppText variant="section" style={styles.title}>
                  {game.title}
                </AppText>
                <AppText style={styles.arrow}>›</AppText>
              </View>
              <AppText muted numberOfLines={2}>
                {game.summary}
              </AppText>
              <View style={styles.metaRow}>
                <View style={styles.metaChip}>
                  <AppText variant="caption" style={styles.metaText} numberOfLines={1}>
                    {game.tempo}
                  </AppText>
                </View>
                <View style={styles.metaChip}>
                  <AppText variant="caption" style={styles.metaText} numberOfLines={1}>
                    {game.offeredAt.length} venues
                  </AppText>
                </View>
              </View>
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    padding: 14,
    gap: 6,
    marginBottom: 12,
  },
  filters: {
    gap: 8,
    alignItems: 'center',
  },
  filterScroller: {
    maxHeight: 52,
    marginBottom: 12,
  },
  pressable: {
    marginBottom: 14,
  },
  pressed: {
    opacity: 0.86,
    transform: [{scale: 0.995}],
  },
  card: {
    overflow: 'hidden',
  },
  image: {
    height: 176,
    justifyContent: 'flex-start',
    backgroundColor: colors.panelStrong,
  },
  imageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    margin: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(18,63,43,0.92)',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  categoryText: {
    color: colors.green,
    fontWeight: '900',
  },
  copy: {
    padding: 14,
    gap: 9,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    flex: 1,
  },
  arrow: {
    color: colors.red,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaChip: {
    minHeight: 30,
    borderRadius: 15,
    backgroundColor: colors.panelStrong,
    paddingHorizontal: 10,
    justifyContent: 'center',
    maxWidth: '100%',
  },
  metaText: {
    color: colors.muted,
    fontWeight: '700',
  },
});
