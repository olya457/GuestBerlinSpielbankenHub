import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {appProfile, arrivalRoutes, venues} from '../data/content';
import {colors} from '../theme';
import {openDirections, openWebsite} from '../utils/deviceActions';

const routeVenueIds: Record<string, string> = {
  'route-potsdamer-central': 'potsdamer-platz-flagship',
  'route-tv-tower': 'fernsehturm-alexanderplatz',
  'route-kudamm-west': 'kudamm-west-berlin',
  'route-spandau-ellipse': 'ellipse-spandau',
};

export function ArrivalGuideScreen(): React.JSX.Element {
  return (
    <Screen>
      <Header title="Arrival Guide" subtitle="Berlin routes" back />
      <Card style={styles.summary} accent>
        <AppText variant="section">Choose by neighborhood</AppText>
        <AppText muted>
          Public transport costs depend on BVG/VBB fare zone, ticket type, and active tariff. Confirm current fares before travel.
        </AppText>
        <Button title="Official Locations Page" variant="secondary" onPress={() => openWebsite(appProfile.locationsWebsite)} />
      </Card>
      {arrivalRoutes.map(route => {
        const matchedVenue = venues.find(venue => venue.id === routeVenueIds[route.id]);
        return (
          <Card key={route.id} style={styles.route}>
            <View style={styles.routeTop}>
              <AppText style={styles.icon}>{route.icon}</AppText>
              <View style={styles.routeCopy}>
                <AppText variant="section">{route.title}</AppText>
                <AppText muted>From {route.from} · {route.duration}</AppText>
              </View>
            </View>
            <View style={styles.cost}>
              <AppText variant="caption" style={styles.costText}>
                {route.cost}
              </AppText>
            </View>
            {route.steps.map((step, index) => (
              <View key={step} style={styles.step}>
                <View style={styles.stepDot}>
                  <AppText variant="caption" style={styles.stepNumber}>
                    {index + 1}
                  </AppText>
                </View>
                <AppText style={styles.stepText}>{step}</AppText>
              </View>
            ))}
            <AppText variant="caption" muted style={styles.routeNote}>
              {route.note}
            </AppText>
            {matchedVenue ? (
              <Button title="Open Directions" onPress={() => openDirections(matchedVenue.directionsQuery)} />
            ) : null}
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 14,
    gap: 10,
    marginBottom: 12,
  },
  route: {
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  routeTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  icon: {
    color: colors.gold,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '900',
    minWidth: 36,
  },
  routeCopy: {
    flex: 1,
  },
  cost: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#2c2415',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  costText: {
    color: colors.amber,
    fontWeight: '900',
  },
  step: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#132d24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: colors.green,
    fontWeight: '900',
  },
  stepText: {
    flex: 1,
  },
  routeNote: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
});
