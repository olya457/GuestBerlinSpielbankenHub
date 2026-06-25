import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {useApp} from '../context/AppContext';
import {appProfile, visitorZones} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {openWebsite} from '../utils/deviceActions';

export function NotebookSettingsScreen(): React.JSX.Element {
  const {state, actions} = useApp();
  const navigation = useNavigation();

  const confirmClear = () => {
    Alert.alert('Clear local visit data?', 'Saved venues, notes, checklist marks, and activity will be reset.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          actions.clearPlannerData();
          navigation.popToTabs('hub');
        },
      },
    ]);
  };

  return (
    <Screen>
      <Header title="Notebook Settings" back />
      <Card style={styles.details} accent>
        <View style={styles.line}>
          <AppText muted>Route card</AppText>
          <AppText style={styles.red}>{state.plannerCard.id}</AppText>
        </View>
        <View style={styles.line}>
          <AppText muted>Status</AppText>
          <AppText>{state.plannerCard.status}</AppText>
        </View>
        <View style={styles.line}>
          <AppText muted>Created</AppText>
          <AppText>{state.plannerCard.issuedAt}</AppText>
        </View>
      </Card>
      <Card style={styles.areas}>
        <AppText variant="eyebrow">Venue checkpoints</AppText>
        {visitorZones.map(area => (
          <View key={area} style={styles.areaLine}>
            <AppText style={styles.check}>OK</AppText>
            <AppText>{area}</AppText>
          </View>
        ))}
      </Card>
      <Card style={styles.notice}>
        <AppText style={styles.noticeText}>
          This card is only a local planning reference. It is not a casino ticket, Player Card, or access credential.
        </AppText>
      </Card>
      <View style={styles.row}>
        <Button title="Refresh Card" variant="secondary" onPress={actions.refreshPlannerCard} style={styles.rowButton} />
        <Button title="Activity" variant="secondary" onPress={() => navigation.push('ActivityLog')} style={styles.rowButton} />
      </View>
      <Button title="Official Rules" variant="ghost" onPress={() => openWebsite(appProfile.rulesWebsite)} style={styles.button} />
      <Button title="Clear Local Data" variant="danger" onPress={confirmClear} style={styles.button} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  details: {
    padding: 14,
    gap: 12,
    marginBottom: 14,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  red: {
    color: colors.red,
    fontWeight: '900',
  },
  areas: {
    padding: 14,
    gap: 8,
    marginBottom: 14,
  },
  areaLine: {
    minHeight: 38,
    borderRadius: 10,
    backgroundColor: '#111',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  check: {
    color: colors.green,
    fontWeight: '900',
    minWidth: 30,
  },
  notice: {
    backgroundColor: '#071f14',
    borderColor: '#17452e',
    padding: 14,
    marginBottom: 14,
  },
  noticeText: {
    color: colors.green,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  rowButton: {
    flex: 1,
  },
  button: {
    marginTop: 12,
  },
});
