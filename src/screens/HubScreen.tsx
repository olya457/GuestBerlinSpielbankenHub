import React from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {SectionHeader} from '../components/SectionHeader';
import {useApp} from '../context/AppContext';
import {appProfile, assets, checklistItems, gameGuides, toolkitItems, venues} from '../data/content';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {getRegularVenueStatus} from '../utils/venueStatus';

export function HubScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const {state} = useApp();
  const status = getRegularVenueStatus();
  const checklistProgress = `${state.checkedItemIds.length}/${checklistItems.length}`;
  const savedVenues = venues.filter(venue => state.savedVenueIds.includes(venue.id));

  return (
    <Screen withBottomNav>
      <Header title="Guest Berlin Hub" updates />
      <ImageBackground source={assets.hubHero} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroShade} />
        <View style={styles.heroCopy}>
          <AppText variant="title">{appProfile.name}</AppText>
          <AppText muted>{appProfile.tagline}</AppText>
        </View>
        <View style={styles.heroGrid}>
          <Pressable onPress={() => navigation.setTab('venues')} style={styles.heroLink}>
            <AppText style={styles.heroLinkText}>Venues</AppText>
          </Pressable>
          <Pressable onPress={() => navigation.setTab('games')} style={styles.heroLink}>
            <AppText style={styles.heroLinkText}>Games</AppText>
          </Pressable>
          <Pressable onPress={() => navigation.push('ArrivalGuide')} style={styles.heroLink}>
            <AppText style={styles.heroLinkText}>Arrival</AppText>
          </Pressable>
          <Pressable onPress={() => navigation.setTab('notes')} style={styles.heroLink}>
            <AppText style={styles.heroLinkText}>Notes</AppText>
          </Pressable>
        </View>
      </ImageBackground>

      <Card style={styles.facts} accent>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, status.tone === 'green' ? styles.greenDot : styles.amberDot]} />
          <View style={styles.statusCopy}>
            <AppText style={styles.bold}>{status.label}</AppText>
            <AppText variant="caption" muted>
              {status.detail}
            </AppText>
          </View>
          <AppText style={styles.progress}>{checklistProgress}</AppText>
        </View>
        <View style={styles.factGrid}>
          <View style={styles.factBox}>
            <AppText variant="caption" style={styles.factLabel}>
              ENTRY
            </AppText>
            <AppText>{appProfile.admission}</AppText>
          </View>
          <View style={styles.factBox}>
            <AppText variant="caption" style={styles.factLabel}>
              STYLE
            </AppText>
            <AppText>{appProfile.dressCode}</AppText>
          </View>
        </View>
        <Button title="First Visit Guide" onPress={() => navigation.push('FirstVisitGuide')} />
      </Card>

      <SectionHeader title="Four Berlin Venues" action="All" onPress={() => navigation.setTab('venues')} />
      <View style={styles.venueGrid}>
        {venues.map(venue => (
          <Pressable
            key={venue.id}
            style={styles.venueCard}
            onPress={() => navigation.push('VenueDetails', {venueId: venue.id})}>
            <AppText variant="caption" style={styles.area}>
              {venue.area}
            </AppText>
            <AppText style={styles.bold} numberOfLines={2}>
              {venue.name}
            </AppText>
            <AppText variant="caption" muted numberOfLines={2}>
              {venue.nearestStop}
            </AppText>
          </Pressable>
        ))}
      </View>

      <Card style={styles.saved}>
        <View style={styles.savedTop}>
          <View>
            <AppText variant="section">Notebook Snapshot</AppText>
            <AppText variant="caption" muted>
              {savedVenues.length ? savedVenues.map(item => item.area).join(' / ') : 'No venue saved yet'}
            </AppText>
          </View>
          <Pressable onPress={() => navigation.setTab('notes')}>
            <AppText style={styles.link}>Open</AppText>
          </Pressable>
        </View>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{state.savedVenueIds.length}</AppText>
            <AppText variant="caption" muted>
              saved venues
            </AppText>
          </View>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{state.notes.length}</AppText>
            <AppText variant="caption" muted>
              notes
            </AppText>
          </View>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{state.activity.length}</AppText>
            <AppText variant="caption" muted>
              activity
            </AppText>
          </View>
        </View>
      </Card>

      <SectionHeader title="Game Basics" action="Browse" onPress={() => navigation.setTab('games')} />
      <View style={styles.gameRow}>
        {gameGuides.slice(0, 3).map(game => (
          <Pressable
            key={game.id}
            style={styles.gameCard}
            onPress={() => navigation.push('GameDetails', {gameId: game.id})}>
            <AppText variant="caption" style={styles.area}>
              {game.category}
            </AppText>
            <AppText style={styles.bold} numberOfLines={2}>
              {game.title}
            </AppText>
            <AppText variant="caption" muted numberOfLines={2}>
              {game.tempo}
            </AppText>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Useful Tools" action="All" onPress={() => navigation.setTab('tools')} />
      <View style={styles.toolGrid}>
        {toolkitItems.slice(0, 4).map(tool => (
          <Pressable
            key={tool.id}
            style={styles.toolCard}
            onPress={() => navigation.push('ToolkitDetails', {toolId: tool.id})}>
            <AppText style={styles.toolIcon}>{tool.icon}</AppText>
            <AppText style={styles.bold} numberOfLines={2}>
              {tool.title}
            </AppText>
            <AppText variant="caption" muted numberOfLines={2}>
              {tool.tag}
            </AppText>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 252,
    overflow: 'hidden',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderRadius: 18,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroCopy: {
    padding: 16,
    paddingBottom: 86,
  },
  heroGrid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(10,10,10,0.72)',
  },
  heroLink: {
    width: '50%',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  heroLinkText: {
    color: colors.red,
    fontWeight: '900',
    fontSize: 13,
  },
  facts: {
    padding: 14,
    marginTop: 14,
    gap: 12,
  },
  statusRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  greenDot: {
    backgroundColor: colors.green,
  },
  amberDot: {
    backgroundColor: colors.amber,
  },
  statusCopy: {
    flex: 1,
  },
  progress: {
    color: colors.red,
    fontWeight: '900',
  },
  factGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  factBox: {
    flex: 1,
    minHeight: 118,
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 12,
    gap: 6,
  },
  factLabel: {
    color: colors.red,
    fontWeight: '900',
  },
  venueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  venueCard: {
    width: '48.5%',
    minHeight: 132,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 13,
    justifyContent: 'space-between',
  },
  area: {
    color: colors.red,
    fontWeight: '900',
  },
  saved: {
    padding: 14,
    gap: 12,
    marginTop: 16,
  },
  savedTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  link: {
    color: colors.red,
    fontWeight: '900',
  },
  statRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#111',
    padding: 10,
  },
  statValue: {
    color: colors.red,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },
  gameRow: {
    flexDirection: 'row',
    gap: 10,
  },
  gameCard: {
    flex: 1,
    minHeight: 124,
    borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    justifyContent: 'space-between',
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toolCard: {
    width: '48.5%',
    minHeight: 118,
    borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 6,
  },
  toolIcon: {
    color: colors.gold,
    fontWeight: '900',
  },
  bold: {
    fontWeight: '900',
  },
});
