import React, {useMemo, useState} from 'react';
import {ImageBackground, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Chip} from '../components/Chip';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {useApp} from '../context/AppContext';
import {venues} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {openDirections} from '../utils/deviceActions';
import {getRegularVenueStatus} from '../utils/venueStatus';

const filters = ['All', 'Central', 'City West', 'Spandau'];

const venueMatches = (area: string, filter: string) => {
  if (filter === 'All') {
    return true;
  }
  if (filter === 'Central') {
    return area === 'Potsdamer Platz' || area === 'Alexanderplatz';
  }
  return area === filter;
};

export function VenueListScreen(): React.JSX.Element {
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();
  const {state, actions} = useApp();
  const status = getRegularVenueStatus();
  const filtered = useMemo(
    () => venues.filter(venue => venueMatches(venue.area, filter)),
    [filter],
  );

  return (
    <Screen withBottomNav>
      <Header title="Spielbank Venues" updates />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroller}
        contentContainerStyle={styles.filters}>
        {filters.map(item => (
          <Chip key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />
        ))}
      </ScrollView>
      {filtered.map(venue => {
        const saved = state.savedVenueIds.includes(venue.id);
        return (
          <Card key={venue.id} style={styles.card}>
            <ImageBackground source={venue.image} style={styles.image} imageStyle={styles.imageRadius}>
              <View style={styles.imageShade} />
              <View style={styles.imageTop}>
                <View style={styles.areaPill}>
                  <AppText variant="caption" style={styles.areaText}>
                    {venue.area}
                  </AppText>
                </View>
                <View style={styles.statusPill}>
                  <AppText variant="caption" style={styles.statusText}>
                    {status.label}
                  </AppText>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.body}>
              <Pressable onPress={() => navigation.push('VenueDetails', {venueId: venue.id})}>
                <AppText variant="section">{venue.name}</AppText>
                <AppText muted>{venue.summary}</AppText>
              </Pressable>
              <View style={styles.metaGrid}>
                <View style={styles.metaBox}>
                  <AppText variant="caption" style={styles.metaLabel}>
                    HOURS
                  </AppText>
                  <AppText>{venue.regularHours}</AppText>
                </View>
                <View style={styles.metaBox}>
                  <AppText variant="caption" style={styles.metaLabel}>
                    NEAREST
                  </AppText>
                  <AppText>{venue.nearestStop}</AppText>
                </View>
              </View>
              <View style={styles.gamesRow}>
                {venue.games.slice(0, 4).map(game => (
                  <View key={game} style={styles.gamePill}>
                    <AppText variant="caption" muted>
                      {game}
                    </AppText>
                  </View>
                ))}
              </View>
              <View style={styles.actions}>
                <Button
                  title="Details"
                  variant="secondary"
                  onPress={() => navigation.push('VenueDetails', {venueId: venue.id})}
                  style={styles.action}
                />
                <Button
                  title={saved ? 'Saved' : 'Save'}
                  variant={saved ? 'ghost' : 'primary'}
                  onPress={() => actions.toggleSavedVenue(venue.id, venue.name)}
                  style={styles.action}
                />
              </View>
              <Button title="Directions" variant="secondary" onPress={() => openDirections(venue.directionsQuery)} />
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: {
    gap: 8,
    alignItems: 'center',
  },
  filterScroller: {
    maxHeight: 52,
    marginBottom: 12,
  },
  card: {
    marginBottom: 14,
    overflow: 'hidden',
  },
  image: {
    height: 166,
  },
  imageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.16)',
  },
  imageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  areaPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#123f2b',
  },
  areaText: {
    color: colors.green,
    fontWeight: '900',
  },
  statusPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.red,
  },
  statusText: {
    color: colors.white,
    fontWeight: '900',
  },
  body: {
    padding: 14,
    gap: 10,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  metaBox: {
    flex: 1,
    minHeight: 76,
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 10,
    gap: 5,
  },
  metaLabel: {
    color: colors.red,
    fontWeight: '900',
  },
  gamesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gamePill: {
    borderRadius: 14,
    backgroundColor: colors.panelStrong,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flex: 1,
  },
});
