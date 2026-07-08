import type {ImageSourcePropType} from 'react-native';

export type TabId = 'hub' | 'venues' | 'games' | 'tools' | 'notes';

export type RouteName =
  | 'VisitTimeline'
  | 'ArrivalPlanner'
  | 'BerlinMap'
  | 'EntryPrimer'
  | 'GameBriefing'
  | 'PrivateNoteEditor'
  | 'NotebookControlPanel'
  | 'RoutePocketCard'
  | 'ToolkitBriefing'
  | 'VenueProfile';

export type AppRoute = {
  name: RouteName;
  params?: Record<string, unknown>;
};

export type VenueLocation = {
  latitude: number;
  longitude: number;
};

export type VenueItem = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  nearestStop: string;
  entryFee: string;
  regularHours: string;
  tableHours: string[];
  games: string[];
  image: ImageSourcePropType;
  detailImage: ImageSourcePropType;
  coordinates: VenueLocation;
  summary: string;
  visitorAngle: string;
  bestFor: string;
  officialUrl: string;
  directionsQuery: string;
};

export type GameGuideItem = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType;
  summary: string;
  tempo: string;
  beginnerTip: string;
  offeredAt: string[];
  details: string[];
};

export type ToolkitItem = {
  id: string;
  icon: string;
  title: string;
  tag: string;
  summary: string;
  details: string[];
  actionLabel: string;
  action: 'arrival' | 'call' | 'guide' | 'map' | 'notes' | 'website';
};

export type ArrivalRoute = {
  id: string;
  title: string;
  icon: string;
  from: string;
  duration: string;
  cost: string;
  steps: string[];
  note: string;
};

export type GuideCard = {
  id: string;
  icon: string;
  title: string;
  eyebrow: string;
  body: string;
  details: string[];
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
};

export type PlannerCard = {
  id: string;
  issuedAt: string;
  status: string;
};

export type UserNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type ActivityUpdate = {
  id: string;
  kind: 'checklist' | 'note' | 'system' | 'venue';
  refId?: string;
  icon: string;
  title: string;
  time: string;
  body: string;
  status: string;
};
