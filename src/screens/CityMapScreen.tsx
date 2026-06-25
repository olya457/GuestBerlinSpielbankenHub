import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {MapPanel} from '../components/MapPanel';
import {Screen} from '../components/Screen';
import {venues} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {openDirections} from '../utils/deviceActions';

type Props = {
  venueId?: string;
};

export function CityMapScreen({venueId}: Props): React.JSX.Element {
  const navigation = useNavigation();
  const selected = venues.find(venue => venue.id === venueId);

  return (
    <Screen>
      <Header title={selected ? selected.area : 'Venue Map'} subtitle={selected?.address ?? 'Spielbank Berlin'} back />
      <MapPanel venueId={venueId} />
      <Card style={styles.address} accent>
        <AppText variant="eyebrow">Map focus</AppText>
        <AppText variant="section">{selected ? selected.name : 'All four venues'}</AppText>
        <AppText muted>
          {selected ? selected.nearestStop : venues.map(item => item.area).join(' / ')}
        </AppText>
        {selected ? (
          <Button title="Directions" onPress={() => openDirections(selected.directionsQuery)} style={styles.button} />
        ) : null}
      </Card>
      <View style={styles.grid}>
        {venues.map(venue => (
          <Pressable
            key={venue.id}
            onPress={() => navigation.push('VenueDetails', {venueId: venue.id})}
            style={styles.card}>
            <AppText variant="caption" style={styles.link}>
              {venue.area}
            </AppText>
            <AppText style={styles.bold}>{venue.name}</AppText>
            <AppText variant="caption" muted>
              {venue.address}
            </AppText>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  address: {
    padding: 14,
    gap: 8,
    marginTop: 12,
  },
  button: {
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  card: {
    width: '48.5%',
    padding: 13,
    minHeight: 154,
    borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  bold: {
    fontWeight: '900',
  },
  link: {
    color: colors.red,
    fontWeight: '900',
  },
});
