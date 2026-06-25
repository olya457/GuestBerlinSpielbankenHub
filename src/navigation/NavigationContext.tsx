import {createContext, useContext} from 'react';
import type {AppRoute, RouteName, TabId} from '../types';

type NavigationValue = {
  activeTab: TabId;
  currentRoute?: AppRoute;
  setTab: (tab: TabId) => void;
  push: (name: RouteName, params?: Record<string, unknown>) => void;
  replace: (name: RouteName, params?: Record<string, unknown>) => void;
  back: () => void;
  popToTabs: (tab?: TabId) => void;
};

export const NavigationContext = createContext<NavigationValue | undefined>(undefined);

export function useNavigation(): NavigationValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used inside NavigationContext');
  }
  return context;
}
