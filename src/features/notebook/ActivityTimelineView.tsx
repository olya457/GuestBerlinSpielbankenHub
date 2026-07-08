import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {Button} from '../../shared/ui';
import {Card} from '../../shared/ui';
import {EmptyState} from '../../shared/ui';
import {Header} from '../../shared/ui';
import {Screen} from '../../shared/ui';
import {useApp} from '../../app/providers/AppContext';
import {useNavigation} from '../../app/navigation/NavigationContext';
import {colors} from '../../shared/theme';

export function ActivityTimelineView(): React.JSX.Element {
  const {state, actions} = useApp();
  const navigation = useNavigation();
  const activity = state.activity;

  const openActivity = (kind: string, refId?: string) => {
    if (kind === 'venue' && refId) {
      navigation.push('VenueProfile', {venueId: refId});
      return;
    }
    if (kind === 'system') {
      navigation.push('NotebookControlPanel');
      return;
    }
    navigation.popToTabs('notes');
  };

  return (
    <Screen>
      <Header title="Activity Log" back />
      {activity.length ? (
        <>
          {activity.map(update => (
            <Pressable key={update.id} onPress={() => openActivity(update.kind, update.refId)}>
              <Card style={styles.update}>
                <AppText style={styles.icon}>{update.icon}</AppText>
                <View style={styles.updateBody}>
                  <View style={styles.updateTop}>
                    <AppText style={styles.bold}>{update.title}</AppText>
                    <AppText variant="caption" style={styles.open}>
                      Open
                    </AppText>
                  </View>
                  <AppText variant="caption" muted>
                    {update.time}
                  </AppText>
                  <AppText muted>{update.body}</AppText>
                  <View style={styles.status}>
                    <AppText variant="caption" style={styles.statusText}>
                      {update.status}
                    </AppText>
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
          <Button title="Clear Activity" variant="danger" onPress={actions.clearActivity} style={styles.clear} />
        </>
      ) : (
        <EmptyState
          icon="LOG"
          title="No activity yet"
          text="Saved venues, notes, checklist marks, and route card changes will appear here."
          action="Back to Hub"
          onPress={() => navigation.popToTabs('hub')}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  update: {
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    color: colors.gold,
    fontWeight: '900',
    lineHeight: 30,
    width: 42,
  },
  updateBody: {
    flex: 1,
    gap: 4,
  },
  updateTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  bold: {
    flex: 1,
    fontWeight: '900',
  },
  open: {
    color: colors.red,
    fontWeight: '900',
  },
  status: {
    alignSelf: 'flex-start',
    marginTop: 5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#263d32',
  },
  statusText: {
    color: colors.green,
    fontWeight: '900',
  },
  clear: {
    marginTop: 8,
  },
});
