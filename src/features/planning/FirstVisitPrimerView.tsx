import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {Button} from '../../shared/ui';
import {Card} from '../../shared/ui';
import {Header} from '../../shared/ui';
import {Screen} from '../../shared/ui';
import {useApp} from '../../app/providers/AppContext';
import {appProfile, checklistItems, guideCards} from '../../domain/berlinGuide';
import {colors} from '../../shared/theme';
import {openWebsite} from '../../shared/native/deviceActions';

export function FirstVisitPrimerView(): React.JSX.Element {
  const {state, actions} = useApp();

  return (
    <Screen>
      <Header title="First Visit Guide" back />
      <Card style={styles.hero} accent>
        <AppText variant="section">Official basics</AppText>
        <AppText muted>{appProfile.admission}</AppText>
        <AppText muted>{appProfile.dressCode}</AppText>
        <AppText variant="caption" style={styles.green}>
          {appProfile.regularClosingNote}
        </AppText>
        <View style={styles.row}>
          <Button title="Locations" variant="secondary" onPress={() => openWebsite(appProfile.locationsWebsite)} style={styles.rowButton} />
          <Button title="House Rules" variant="secondary" onPress={() => openWebsite(appProfile.rulesWebsite)} style={styles.rowButton} />
        </View>
      </Card>
      {guideCards.map(card => (
        <Card key={card.id} style={styles.card}>
          <View style={styles.top}>
            <AppText style={styles.icon}>{card.icon}</AppText>
            <View style={styles.copy}>
              <AppText variant="eyebrow">{card.eyebrow}</AppText>
              <AppText variant="section">{card.title}</AppText>
            </View>
          </View>
          <AppText muted>{card.body}</AppText>
          {card.details.map(detail => (
            <View key={detail} style={styles.detail}>
              <AppText style={styles.check}>OK</AppText>
              <AppText style={styles.detailText}>{detail}</AppText>
            </View>
          ))}
        </Card>
      ))}
      <Card style={styles.card}>
        <AppText variant="section">Checklist</AppText>
        {checklistItems.map(item => {
          const checked = state.checkedItemIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              style={[styles.checkLine, checked && styles.checkLineDone]}
              onPress={() => actions.toggleChecklistItem(item.id, item.title)}>
              <View style={[styles.checkBox, checked && styles.checkBoxDone]}>
                <AppText variant="caption" style={styles.checkMark}>
                  {checked ? 'OK' : ''}
                </AppText>
              </View>
              <View style={styles.detailText}>
                <AppText style={styles.bold}>{item.title}</AppText>
                <AppText variant="caption" muted>
                  {item.description}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 14,
    gap: 10,
    marginBottom: 12,
  },
  green: {
    color: colors.green,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  rowButton: {
    flex: 1,
  },
  card: {
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  icon: {
    color: colors.gold,
    fontWeight: '900',
    lineHeight: 30,
    width: 34,
  },
  copy: {
    flex: 1,
  },
  detail: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  check: {
    color: colors.green,
    fontWeight: '900',
    minWidth: 30,
  },
  detailText: {
    flex: 1,
  },
  checkLine: {
    minHeight: 58,
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
  },
  checkBoxDone: {
    backgroundColor: '#123f2b',
    borderColor: '#17452e',
  },
  checkMark: {
    color: colors.green,
    fontWeight: '900',
  },
  bold: {
    fontWeight: '900',
  },
});
