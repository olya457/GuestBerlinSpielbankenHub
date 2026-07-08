import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomTabBar} from '../../shared/ui';
import {useApp} from '../providers/AppContext';
import {colors} from '../../shared/theme';
import type {AppRoute, RouteName, TabId} from '../../domain/berlinGuide';
import {ActivityTimelineView} from '../../features/notebook/ActivityTimelineView';
import {ArrivalPlannerView} from '../../features/planning/ArrivalPlannerView';
import {CityRouteMapView} from '../../features/planning/CityRouteMapView';
import {FirstVisitPrimerView} from '../../features/planning/FirstVisitPrimerView';
import {GameBriefingView} from '../../features/games/GameBriefingView';
import {GameLibraryView} from '../../features/games/GameLibraryView';
import {BerlinGuestHubView} from '../../features/hub/BerlinGuestHubView';
import {PrivateNoteEditorView} from '../../features/notebook/PrivateNoteEditorView';
import {VisitNotebookView} from '../../features/notebook/VisitNotebookView';
import {NotebookControlPanelView} from '../../features/notebook/NotebookControlPanelView';
import {OnboardingJourneyView} from '../../features/welcome/OnboardingJourneyView';
import {RoutePocketCardView} from '../../features/planning/RoutePocketCardView';
import {SplashIntroView} from '../../features/welcome/SplashIntroView';
import {ToolkitBriefingView} from '../../features/toolkit/ToolkitBriefingView';
import {ToolkitShelfView} from '../../features/toolkit/ToolkitShelfView';
import {VenueProfileView} from '../../features/venues/VenueProfileView';
import {VenueDirectoryView} from '../../features/venues/VenueDirectoryView';
import {NavigationContext} from './NavigationContext';

type Phase = 'splash' | 'onboarding' | 'app';

export function RootNavigator(): React.JSX.Element {
  const {loaded, state, actions} = useApp();
  const [phase, setPhase] = useState<Phase>('splash');
  const [activeTab, setActiveTab] = useState<TabId>('hub');
  const [stack, setStack] = useState<AppRoute[]>([]);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    const timer = setTimeout(() => {
      setPhase(state.onboardingSeen ? 'app' : 'onboarding');
    }, 1800);
    return () => clearTimeout(timer);
  }, [loaded, state.onboardingSeen]);

  const navigation = useMemo(
    () => ({
      activeTab,
      currentRoute: stack[stack.length - 1],
      setTab: (tab: TabId) => {
        setActiveTab(tab);
        setStack([]);
      },
      push: (name: RouteName, params?: Record<string, unknown>) => {
        setStack(prev => [...prev, {name, params}]);
      },
      replace: (name: RouteName, params?: Record<string, unknown>) => {
        setStack(prev => [...prev.slice(0, -1), {name, params}]);
      },
      back: () => {
        setStack(prev => prev.slice(0, -1));
      },
      popToTabs: (tab?: TabId) => {
        if (tab) {
          setActiveTab(tab);
        }
        setStack([]);
      },
    }),
    [activeTab, stack],
  );

  if (phase === 'splash') {
    return <SplashIntroView />;
  }

  if (phase === 'onboarding') {
    return (
      <OnboardingJourneyView
        onDone={() => {
          actions.completeOnboarding();
          setPhase('app');
        }}
      />
    );
  }

  const route = stack[stack.length - 1];

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={styles.root}>
        {route ? renderRoute(route) : renderTab(activeTab)}
        {!route ? <BottomTabBar /> : null}
      </View>
    </NavigationContext.Provider>
  );
}

function renderTab(tab: TabId): React.JSX.Element {
  if (tab === 'venues') {
    return <VenueDirectoryView />;
  }
  if (tab === 'games') {
    return <GameLibraryView />;
  }
  if (tab === 'tools') {
    return <ToolkitShelfView />;
  }
  if (tab === 'notes') {
    return <VisitNotebookView />;
  }
  return <BerlinGuestHubView />;
}

function renderRoute(route: AppRoute): React.JSX.Element {
  switch (route.name) {
    case 'VisitTimeline':
      return <ActivityTimelineView />;
    case 'ArrivalPlanner':
      return <ArrivalPlannerView />;
    case 'BerlinMap':
      return <CityRouteMapView venueId={route.params?.venueId as string | undefined} />;
    case 'EntryPrimer':
      return <FirstVisitPrimerView />;
    case 'GameBriefing':
      return <GameBriefingView gameId={route.params?.gameId as string} />;
    case 'PrivateNoteEditor':
      return <PrivateNoteEditorView />;
    case 'NotebookControlPanel':
      return <NotebookControlPanelView />;
    case 'RoutePocketCard':
      return <RoutePocketCardView venueId={route.params?.venueId as string | undefined} />;
    case 'ToolkitBriefing':
      return <ToolkitBriefingView toolId={route.params?.toolId as string} />;
    case 'VenueProfile':
      return <VenueProfileView venueId={route.params?.venueId as string} />;
    default:
      return <BerlinGuestHubView />;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
