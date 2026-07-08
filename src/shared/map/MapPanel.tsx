import React from 'react';
import {StyleSheet, View} from 'react-native';
import {venues} from '../../domain/berlinGuide';
import {colors} from '../theme';
import {AppText} from '../ui';

type Props = {
  venueId?: string;
};

export function MapPanel({venueId}: Props): React.JSX.Element {
  const selected = venues.find(item => item.id === venueId) ?? venues[0];

  return (
    <View style={[styles.map, styles.fallback]}>
      <AppText variant="section" center>
        {venueId ? selected.name : 'Spielbank Berlin venues'}
      </AppText>
      <AppText muted center>
        {venueId ? selected.address : venues.map(item => item.area).join(' / ')}
      </AppText>
      <AppText variant="caption" center style={styles.coords}>
        {selected.coordinates.latitude.toFixed(5)}, {selected.coordinates.longitude.toFixed(5)}
      </AppText>
      {!venueId ? (
        <View style={styles.venueList}>
          {venues.map(item => (
            <View key={item.id} style={styles.venueDot}>
              <AppText variant="caption" style={styles.dotText}>
                {item.area}
              </AppText>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.panel,
  },
  fallback: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  coords: {
    color: colors.green,
    marginTop: 4,
  },
  venueList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  venueDot: {
    borderRadius: 12,
    backgroundColor: colors.panelStrong,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  dotText: {
    color: colors.red,
    fontWeight: '900',
  },
});
