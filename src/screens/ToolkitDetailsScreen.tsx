import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmptyState} from '../components/EmptyState';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {appProfile, toolkitItems} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {openPhone, openWebsite} from '../utils/deviceActions';

type Props = {
  toolId: string;
};

export function ToolkitDetailsScreen({toolId}: Props): React.JSX.Element {
  const tool = toolkitItems.find(item => item.id === toolId);
  const navigation = useNavigation();

  if (!tool) {
    return (
      <Screen>
        <Header title="Tool Details" back />
        <EmptyState icon="!" title="Tool not found" text="Choose another visit tool." />
      </Screen>
    );
  }

  const runAction = () => {
    if (tool.action === 'arrival') {
      navigation.push('ArrivalGuide');
      return;
    }
    if (tool.action === 'call') {
      openPhone(appProfile.supportPhone);
      return;
    }
    if (tool.action === 'guide') {
      navigation.push('FirstVisitGuide');
      return;
    }
    if (tool.action === 'map') {
      navigation.push('CityMap');
      return;
    }
    if (tool.action === 'notes') {
      navigation.popToTabs('notes');
      return;
    }
    openWebsite(appProfile.locationsWebsite);
  };

  return (
    <Screen>
      <Header title="Visit Tool" back />
      <View style={styles.hero}>
        <AppText style={styles.icon}>{tool.icon}</AppText>
        <AppText variant="title">{tool.title}</AppText>
        <View style={styles.tag}>
          <AppText variant="caption" style={styles.tagText}>
            {tool.tag}
          </AppText>
        </View>
        <AppText muted>{tool.summary}</AppText>
      </View>
      <Card style={styles.details}>
        <AppText variant="eyebrow">Details</AppText>
        {tool.details.map(detail => (
          <View key={detail} style={styles.detailLine}>
            <AppText style={styles.check}>OK</AppText>
            <AppText style={styles.detailText}>{detail}</AppText>
          </View>
        ))}
      </Card>
      <Card style={styles.notice}>
        <AppText style={styles.noticeText}>
          This hub stores notes locally and opens official channels for current venue information.
        </AppText>
      </Card>
      <Button title={tool.actionLabel} onPress={runAction} style={styles.button} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 10,
    paddingTop: 8,
    marginBottom: 14,
  },
  icon: {
    color: colors.gold,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '900',
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#123f2b',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: colors.green,
    fontWeight: '900',
  },
  details: {
    padding: 14,
    gap: 9,
    marginBottom: 12,
  },
  detailLine: {
    minHeight: 38,
    borderRadius: 10,
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  check: {
    color: colors.green,
    fontWeight: '900',
    minWidth: 30,
  },
  detailText: {
    flex: 1,
  },
  notice: {
    backgroundColor: '#071f14',
    borderColor: '#17452e',
    padding: 14,
  },
  noticeText: {
    color: colors.green,
  },
  button: {
    marginTop: 'auto',
  },
});
