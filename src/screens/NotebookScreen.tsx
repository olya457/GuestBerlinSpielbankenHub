import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {useApp} from '../context/AppContext';
import {checklistItems, venues} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function NotebookScreen(): React.JSX.Element {
  const {state, actions} = useApp();
  const navigation = useNavigation();
  const savedVenues = venues.filter(venue => state.savedVenueIds.includes(venue.id));

  return (
    <Screen withBottomNav>
      <Header title="Visit Notebook" updates />
      <Card style={styles.cardHeader} accent>
        <View style={styles.cardTop}>
          <View>
            <AppText variant="eyebrow">Local route card</AppText>
            <AppText variant="title">{state.plannerCard.id}</AppText>
          </View>
          <View style={styles.localBadge}>
            <AppText variant="caption" style={styles.localText}>
              Local
            </AppText>
          </View>
        </View>
        <AppText muted>
          {state.plannerCard.status} · created {state.plannerCard.issuedAt}
        </AppText>
        <View style={styles.row}>
          <Button title="Route Card" onPress={() => navigation.push('RouteCard')} style={styles.rowButton} />
          <Button title="Settings" variant="secondary" onPress={() => navigation.push('NotebookSettings')} style={styles.rowButton} />
        </View>
      </Card>

      <Card style={styles.section}>
        <View style={styles.sectionTop}>
          <AppText variant="section">First Visit Checklist</AppText>
          <AppText style={styles.count}>{state.checkedItemIds.length}/{checklistItems.length}</AppText>
        </View>
        {checklistItems.map(item => {
          const checked = state.checkedItemIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => actions.toggleChecklistItem(item.id, item.title)}
              style={[styles.checkLine, checked && styles.checkLineDone]}>
              <View style={[styles.checkBox, checked && styles.checkBoxDone]}>
                <AppText variant="caption" style={styles.checkMark}>
                  {checked ? 'OK' : ''}
                </AppText>
              </View>
              <View style={styles.checkCopy}>
                <AppText style={styles.bold}>{item.title}</AppText>
                <AppText variant="caption" muted>
                  {item.description}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </Card>

      <Card style={styles.section}>
        <View style={styles.sectionTop}>
          <AppText variant="section">Saved Venues</AppText>
          <Pressable onPress={() => navigation.setTab('venues')}>
            <AppText style={styles.link}>Add</AppText>
          </Pressable>
        </View>
        {savedVenues.length ? (
          savedVenues.map(venue => (
            <Pressable
              key={venue.id}
              style={styles.savedLine}
              onPress={() => navigation.push('VenueDetails', {venueId: venue.id})}>
              <View>
                <AppText style={styles.bold}>{venue.area}</AppText>
                <AppText variant="caption" muted>
                  {venue.name}
                </AppText>
              </View>
              <AppText style={styles.link}>Open</AppText>
            </Pressable>
          ))
        ) : (
          <AppText muted>No venues saved yet.</AppText>
        )}
      </Card>

      <Card style={styles.section}>
        <View style={styles.sectionTop}>
          <AppText variant="section">Private Notes</AppText>
          <Pressable onPress={() => navigation.push('NoteComposer')}>
            <AppText style={styles.link}>New</AppText>
          </Pressable>
        </View>
        {state.notes.length ? (
          state.notes.map(note => (
            <View key={note.id} style={styles.noteLine}>
              <View style={styles.noteCopy}>
                <AppText style={styles.bold}>{note.title}</AppText>
                <AppText variant="caption" muted>
                  {note.createdAt}
                </AppText>
                <AppText muted numberOfLines={3}>
                  {note.body}
                </AppText>
              </View>
              <Pressable onPress={() => actions.deleteNote(note.id)} style={styles.delete}>
                <AppText variant="caption" style={styles.deleteText}>
                  DEL
                </AppText>
              </Pressable>
            </View>
          ))
        ) : (
          <AppText muted>No private notes saved yet.</AppText>
        )}
      </Card>
      <Button title="Add Private Note" onPress={() => navigation.push('NoteComposer')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    minHeight: 214,
    padding: 18,
    gap: 14,
    backgroundColor: '#190608',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  localBadge: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    backgroundColor: '#243b31',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  localText: {
    color: colors.green,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  rowButton: {
    flex: 1,
  },
  section: {
    marginTop: 14,
    padding: 14,
    gap: 10,
  },
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  count: {
    color: colors.red,
    fontWeight: '900',
  },
  checkLine: {
    minHeight: 62,
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkLineDone: {
    borderWidth: 1,
    borderColor: '#17452e',
  },
  checkBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkBoxDone: {
    backgroundColor: '#123f2b',
    borderColor: '#17452e',
  },
  checkMark: {
    color: colors.green,
    fontWeight: '900',
  },
  checkCopy: {
    flex: 1,
    gap: 3,
  },
  savedLine: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  noteLine: {
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 11,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noteCopy: {
    flex: 1,
    gap: 4,
  },
  delete: {
    minWidth: 42,
    minHeight: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: colors.red,
    fontWeight: '900',
  },
  bold: {
    fontWeight: '900',
  },
  link: {
    color: colors.red,
    fontWeight: '900',
  },
});
