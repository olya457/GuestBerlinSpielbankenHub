import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomTabBar} from '../components/BottomTabBar';
import {useApp} from '../context/AppContext';
import {colors} from '../theme';
import type {AppRoute, RouteName, TabId} from '../types';
import {ActivityLogScreen} from '../screens/ActivityLogScreen';
import {ArrivalGuideScreen} from '../screens/ArrivalGuideScreen';
import {CityMapScreen} from '../screens/CityMapScreen';
import {FirstVisitGuideScreen} from '../screens/FirstVisitGuideScreen';
import {GameDetailsScreen} from '../screens/GameDetailsScreen';
import {GameGuideScreen} from '../screens/GameGuideScreen';
import {HubScreen} from '../screens/HubScreen';
import {NoteComposerScreen} from '../screens/NoteComposerScreen';
import {NotebookScreen} from '../screens/NotebookScreen';
import {NotebookSettingsScreen} from '../screens/NotebookSettingsScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {RouteCardScreen} from '../screens/RouteCardScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {ToolkitDetailsScreen} from '../screens/ToolkitDetailsScreen';
import {ToolkitScreen} from '../screens/ToolkitScreen';
import {VenueDetailsScreen} from '../screens/VenueDetailsScreen';
import {VenueListScreen} from '../screens/VenueListScreen';
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
    return <SplashScreen />;
  }

  if (phase === 'onboarding') {
    return (
      <OnboardingScreen
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
    return <VenueListScreen />;
  }
  if (tab === 'games') {
    return <GameGuideScreen />;
  }
  if (tab === 'tools') {
    return <ToolkitScreen />;
  }
  if (tab === 'notes') {
    return <NotebookScreen />;
  }
  return <HubScreen />;
}

function renderRoute(route: AppRoute): React.JSX.Element {
  switch (route.name) {
    case 'ActivityLog':
      return <ActivityLogScreen />;
    case 'ArrivalGuide':
      return <ArrivalGuideScreen />;
    case 'CityMap':
      return <CityMapScreen venueId={route.params?.venueId as string | undefined} />;
    case 'FirstVisitGuide':
      return <FirstVisitGuideScreen />;
    case 'GameDetails':
      return <GameDetailsScreen gameId={route.params?.gameId as string} />;
    case 'NoteComposer':
      return <NoteComposerScreen />;
    case 'NotebookSettings':
      return <NotebookSettingsScreen />;
    case 'RouteCard':
      return <RouteCardScreen venueId={route.params?.venueId as string | undefined} />;
    case 'ToolkitDetails':
      return <ToolkitDetailsScreen toolId={route.params?.toolId as string} />;
    case 'VenueDetails':
      return <VenueDetailsScreen venueId={route.params?.venueId as string} />;
    default:
      return <HubScreen />;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
