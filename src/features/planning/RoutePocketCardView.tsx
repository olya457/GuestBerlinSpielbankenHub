import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {Button} from '../../shared/ui';
import {useApp} from '../../app/providers/AppContext';
import {venues} from '../../domain/berlinGuide';
import {useNavigation} from '../../app/navigation/NavigationContext';
import {colors, spacing} from '../../shared/theme';
import {openDirections} from '../../shared/native/deviceActions';

type Props = {
  venueId?: string;
};

export function RoutePocketCardView({venueId}: Props): React.JSX.Element {
  const {state} = useApp();
  const navigation = useNavigation();
  const venue = venues.find(item => item.id === venueId) ?? venues[0];

  return (
    <View style={styles.root}>
      <View style={styles.center}>
        <AppText variant="eyebrow" center>
          Local route card
        </AppText>
        <View style={styles.card}>
          <AppText style={styles.area}>{venue.area}</AppText>
          <AppText variant="title" center style={styles.dark}>
            {venue.name}
          </AppText>
          <AppText center style={styles.darkMuted}>
            {venue.nearestStop}
          </AppText>
          <AppText center style={styles.darkMuted}>
            {venue.address}
          </AppText>
          <View style={styles.cardLine} />
          <AppText center style={styles.darkSmall}>
            {venue.regularHours} · {venue.entryFee}
          </AppText>
        </View>
        <AppText variant="eyebrow" center style={styles.cardId}>
          {state.plannerCard.id}
        </AppText>
        <AppText muted center>
          This card is a private planning reference only.
        </AppText>
        <View style={styles.actions}>
          <Button title="Directions" variant="secondary" onPress={() => openDirections(venue.directionsQuery)} style={styles.action} />
          <Button title="Close" onPress={navigation.back} style={styles.action} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? spacing.androidEdge : 46,
    paddingBottom: Platform.OS === 'android' ? spacing.androidEdge : 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  card: {
    width: '84%',
    minHeight: 282,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 22,
  },
  area: {
    color: colors.redDark,
    fontWeight: '900',
  },
  dark: {
    color: colors.black,
  },
  darkMuted: {
    color: '#333',
    fontWeight: '700',
  },
  darkSmall: {
    color: '#333',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  cardLine: {
    width: '70%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  cardId: {
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  action: {
    minWidth: 130,
  },
});
