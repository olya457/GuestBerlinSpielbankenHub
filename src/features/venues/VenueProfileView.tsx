import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {Button} from '../../shared/ui';
import {Card} from '../../shared/ui';
import {EmptyState} from '../../shared/ui';
import {Header} from '../../shared/ui';
import {MapPanel} from '../../shared/map';
import {Screen} from '../../shared/ui';
import {useApp} from '../../app/providers/AppContext';
import {appProfile, venues} from '../../domain/berlinGuide';
import {useNavigation} from '../../app/navigation/NavigationContext';
import {colors} from '../../shared/theme';
import {openDirections, openPhone, openWebsite} from '../../shared/native/deviceActions';
import {getRegularVenueStatus} from '../../domain/berlinGuide';

type Props = {
  venueId: string;
};

export function VenueProfileView({venueId}: Props): React.JSX.Element {
  const venue = venues.find(item => item.id === venueId);
  const navigation = useNavigation();
  const {state, actions} = useApp();
  const status = getRegularVenueStatus();

  if (!venue) {
    return (
      <Screen>
        <Header title="Venue Details" back />
        <EmptyState icon="!" title="Venue not found" text="Choose another Spielbank Berlin venue." />
      </Screen>
    );
  }

  const saved = state.savedVenueIds.includes(venue.id);

  return (
    <Screen padded={false}>
      <Header title={venue.area} back />
      <ImageBackground source={venue.detailImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroShade} />
        <View style={styles.heroTop}>
          <View style={styles.statusPill}>
            <AppText variant="caption" style={styles.statusText}>
              {status.label}
            </AppText>
          </View>
        </View>
        <View style={styles.heroCopy}>
          <AppText variant="title">{venue.name}</AppText>
          <AppText muted>{venue.address}</AppText>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Card style={styles.summary} accent>
          <AppText variant="eyebrow">Visitor angle</AppText>
          <AppText>{venue.visitorAngle}</AppText>
          <AppText variant="caption" style={styles.green}>
            {appProfile.regularClosingNote}
          </AppText>
        </Card>
        <View style={styles.grid}>
          <Card style={styles.infoBox}>
            <AppText variant="caption" muted>
              ENTRY
            </AppText>
            <AppText style={styles.red}>{venue.entryFee}</AppText>
            <AppText variant="caption" muted>
              18+ with ID
            </AppText>
          </Card>
          <Card style={styles.infoBox}>
            <AppText variant="caption" muted>
              NEAREST
            </AppText>
            <AppText style={styles.red}>{venue.nearestStop}</AppText>
          </Card>
        </View>
        <Card style={styles.hours}>
          <AppText variant="eyebrow">Hours</AppText>
          <View style={styles.hourLine}>
            <AppText style={styles.check}>REG</AppText>
            <AppText style={styles.hourText}>{venue.regularHours}</AppText>
          </View>
          {venue.tableHours.map(item => (
            <View key={item} style={styles.hourLine}>
              <AppText style={styles.check}>TAB</AppText>
              <AppText style={styles.hourText}>{item}</AppText>
            </View>
          ))}
        </Card>
        <Card style={styles.games}>
          <AppText variant="eyebrow">Game mix</AppText>
          <View style={styles.gamesRow}>
            {venue.games.map(game => (
              <View key={game} style={styles.gamePill}>
                <AppText variant="caption" muted>
                  {game}
                </AppText>
              </View>
            ))}
          </View>
        </Card>
        <MapPanel venueId={venue.id} />
        <View style={styles.actions}>
          <Button
            title={saved ? 'Remove Saved' : 'Save Venue'}
            onPress={() => actions.toggleSavedVenue(venue.id, venue.name)}
            style={styles.action}
          />
          <Button title="Route Card" variant="secondary" onPress={() => navigation.push('RoutePocketCard', {venueId: venue.id})} style={styles.action} />
        </View>
        <View style={styles.actions}>
          <Button title="Directions" variant="secondary" onPress={() => openDirections(venue.directionsQuery)} style={styles.action} />
          <Button title="Call" variant="secondary" onPress={() => openPhone(venue.phone)} style={styles.action} />
        </View>
        <Button title="Official Page" variant="ghost" onPress={() => openWebsite(venue.officialUrl)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 286,
    justifyContent: 'space-between',
    backgroundColor: colors.panel,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  heroTop: {
    alignItems: 'flex-end',
    padding: 16,
  },
  statusPill: {
    borderRadius: 14,
    backgroundColor: colors.red,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  statusText: {
    color: colors.white,
    fontWeight: '900',
  },
  heroCopy: {
    padding: 16,
    gap: 8,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  summary: {
    padding: 14,
    gap: 8,
  },
  green: {
    color: colors.green,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    minHeight: 96,
    padding: 12,
    gap: 5,
  },
  red: {
    color: colors.red,
    fontWeight: '900',
  },
  hours: {
    padding: 14,
    gap: 9,
  },
  hourLine: {
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
    minWidth: 34,
  },
  hourText: {
    flex: 1,
  },
  games: {
    padding: 14,
    gap: 10,
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
    paddingVertical: 7,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flex: 1,
  },
});
