import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {appProfile} from '../../domain/berlinGuide';
import type {ActivityUpdate, PlannerCard, UserNote} from '../../domain/berlinGuide';
import {storage} from '../../shared/native/storage';

type AppModel = {
  onboardingSeen: boolean;
  plannerCard: PlannerCard;
  savedVenueIds: string[];
  checkedItemIds: string[];
  notes: UserNote[];
  activity: ActivityUpdate[];
};

type AppContextValue = {
  loaded: boolean;
  state: AppModel;
  actions: {
    clearActivity: () => void;
    clearPlannerData: () => void;
    completeOnboarding: () => void;
    deleteNote: (noteId: string) => void;
    refreshPlannerCard: () => void;
    saveNote: (input: {title: string; body: string}) => UserNote;
    toggleChecklistItem: (itemId: string, itemTitle: string) => void;
    toggleSavedVenue: (venueId: string, venueName: string) => void;
  };
};

const STORAGE_KEY = 'guest-berlin-spielbanken-hub-state-v2';

const nowLabel = () =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

const createPlannerCard = (): PlannerCard => ({
  id: `GBH-${Math.floor(10000 + Math.random() * 89999)}`,
  issuedAt: nowLabel(),
  status: 'Local planning card',
});

const initialActivity = (): ActivityUpdate[] => [
  {
    id: 'system-ready',
    kind: 'system',
    icon: 'OK',
    title: 'Spielbanken Hub is ready',
    time: 'Ready now',
    body: `${appProfile.shortName} loaded official venue basics, checklist tools, and local notes.`,
    status: 'Local',
  },
];

const createInitialState = (): AppModel => ({
  onboardingSeen: false,
  plannerCard: createPlannerCard(),
  savedVenueIds: [],
  checkedItemIds: [],
  notes: [],
  activity: initialActivity(),
});

const normalizeSavedState = (saved: Partial<AppModel> | null): AppModel => {
  const source = saved ?? {};
  return {
    onboardingSeen: source.onboardingSeen ?? false,
    plannerCard: source.plannerCard ?? createPlannerCard(),
    savedVenueIds: Array.isArray(source.savedVenueIds) ? source.savedVenueIds : [],
    checkedItemIds: Array.isArray(source.checkedItemIds) ? source.checkedItemIds : [],
    notes: Array.isArray(source.notes) ? source.notes : [],
    activity: Array.isArray(source.activity) && source.activity.length ? source.activity : initialActivity(),
  };
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({children}: {children: React.ReactNode}): React.JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<AppModel>(createInitialState);

  useEffect(() => {
    let active = true;
    storage.getJSON<Partial<AppModel> | null>(STORAGE_KEY, null).then(saved => {
      if (!active) {
        return;
      }
      setState(normalizeSavedState(saved));
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      storage.setJSON(STORAGE_KEY, state);
    }
  }, [loaded, state]);

  const actions = useMemo<AppContextValue['actions']>(
    () => ({
      clearActivity: () => {
        setState(prev => ({...prev, activity: []}));
      },
      clearPlannerData: () => {
        const next = {...createInitialState(), onboardingSeen: true};
        setState(next);
        storage.setJSON(STORAGE_KEY, next);
      },
      completeOnboarding: () => {
        setState(prev => ({...prev, onboardingSeen: true}));
      },
      deleteNote: noteId => {
        setState(prev => ({
          ...prev,
          notes: prev.notes.filter(note => note.id !== noteId),
          activity: [
            {
              id: `delete-note-${Date.now()}`,
              kind: 'note' as const,
              icon: 'NT',
              title: 'Notebook item removed',
              time: nowLabel(),
              body: 'A private note was deleted from the local visit notebook.',
              status: 'Updated',
            },
            ...prev.activity,
          ].slice(0, 30),
        }));
      },
      refreshPlannerCard: () => {
        setState(prev => ({
          ...prev,
          plannerCard: createPlannerCard(),
          activity: [
            {
              id: `card-${Date.now()}`,
              kind: 'system' as const,
              icon: 'RC',
              title: 'Route card refreshed',
              time: nowLabel(),
              body: 'A new local route card number was created for the notebook.',
              status: 'Local',
            },
            ...prev.activity,
          ].slice(0, 30),
        }));
      },
      saveNote: input => {
        const cleanTitle = input.title.trim() || 'Visit note';
        const cleanBody = input.body.trim() || 'No extra details added.';
        const note: UserNote = {
          id: `NOTE-${Math.floor(1000 + Math.random() * 8999)}`,
          title: cleanTitle,
          body: cleanBody,
          createdAt: nowLabel(),
        };
        setState(prev => ({
          ...prev,
          notes: [note, ...prev.notes],
          activity: [
            {
              id: `note-${Date.now()}`,
              kind: 'note' as const,
              refId: note.id,
              icon: 'NT',
              title: `${note.title} saved`,
              time: nowLabel(),
              body: 'A private local note was added to the visit notebook.',
              status: 'Saved',
            },
            ...prev.activity,
          ].slice(0, 30),
        }));
        return note;
      },
      toggleChecklistItem: (itemId, itemTitle) => {
        setState(prev => {
          const checked = prev.checkedItemIds.includes(itemId);
          const checkedItemIds = checked
            ? prev.checkedItemIds.filter(id => id !== itemId)
            : [itemId, ...prev.checkedItemIds];
          const activity = [
            {
              id: `check-${Date.now()}`,
              kind: 'checklist' as const,
              refId: itemId,
              icon: checked ? 'UNDO' : 'CHK',
              title: checked ? `${itemTitle} unchecked` : `${itemTitle} completed`,
              time: nowLabel(),
              body: 'The first-visit checklist was updated locally.',
              status: checked ? 'Open' : 'Done',
            },
            ...prev.activity,
          ].slice(0, 30);
          return {...prev, checkedItemIds, activity};
        });
      },
      toggleSavedVenue: (venueId, venueName) => {
        setState(prev => {
          const saved = prev.savedVenueIds.includes(venueId);
          const savedVenueIds = saved
            ? prev.savedVenueIds.filter(id => id !== venueId)
            : [venueId, ...prev.savedVenueIds];
          const activity = [
            {
              id: `venue-${Date.now()}`,
              kind: 'venue' as const,
              refId: venueId,
              icon: 'PIN',
              title: saved ? `${venueName} removed` : `${venueName} saved`,
              time: nowLabel(),
              body: saved
                ? 'The venue was removed from your local shortlist.'
                : 'The venue was added to your local shortlist.',
              status: saved ? 'Removed' : 'Saved',
            },
            ...prev.activity,
          ].slice(0, 30);
          return {...prev, savedVenueIds, activity};
        });
      },
    }),
    [],
  );

  const value = useMemo(
    () => ({loaded, state, actions}),
    [actions, loaded, state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
};
