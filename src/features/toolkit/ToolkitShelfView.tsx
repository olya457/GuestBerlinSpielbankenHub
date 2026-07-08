import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '../../shared/ui';
import {Card} from '../../shared/ui';
import {Chip} from '../../shared/ui';
import {Header} from '../../shared/ui';
import {Screen} from '../../shared/ui';
import {toolkitItems} from '../../domain/berlinGuide';
import {useNavigation} from '../../app/navigation/NavigationContext';
import {colors} from '../../shared/theme';

const filters = ['All', 'Admission', 'Transport', 'Safety', 'Map', 'Hours', 'Contact'];

export function ToolkitShelfView(): React.JSX.Element {
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();
  const filtered = useMemo(
    () => (filter === 'All' ? toolkitItems : toolkitItems.filter(tool => tool.tag === filter)),
    [filter],
  );

  return (
    <Screen withBottomNav>
      <Header title="Visit Tools" updates />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroller}
        contentContainerStyle={styles.filters}>
        {filters.map(item => (
          <Chip key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />
        ))}
      </ScrollView>
      <View style={styles.grid}>
        {filtered.map(tool => (
          <Pressable
            key={tool.id}
            style={styles.press}
            onPress={() => navigation.push('ToolkitBriefing', {toolId: tool.id})}>
            <Card style={styles.card}>
              <AppText style={styles.icon}>{tool.icon}</AppText>
              <AppText style={styles.title}>{tool.title}</AppText>
              <AppText variant="caption" style={styles.tag}>
                {tool.tag}
              </AppText>
              <AppText variant="caption" muted numberOfLines={3}>
                {tool.summary}
              </AppText>
              <View style={styles.action}>
                <AppText variant="caption" style={styles.actionText}>
                  {tool.actionLabel}
                </AppText>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: {
    gap: 8,
    alignItems: 'center',
  },
  filterScroller: {
    maxHeight: 52,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  press: {
    width: '48.5%',
  },
  card: {
    minHeight: 190,
    padding: 13,
    gap: 6,
  },
  icon: {
    color: colors.gold,
    fontWeight: '900',
    lineHeight: 24,
  },
  title: {
    fontWeight: '900',
  },
  tag: {
    color: colors.red,
    fontWeight: '900',
  },
  action: {
    marginTop: 'auto',
    minHeight: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: colors.red,
    fontWeight: '900',
  },
});
