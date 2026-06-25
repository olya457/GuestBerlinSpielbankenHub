import {Platform} from 'react-native';

export const colors = {
  background: '#050505',
  panel: '#151515',
  panelSoft: '#1d1d1d',
  panelStrong: '#252525',
  border: '#2b2b2b',
  borderRed: '#5b1722',
  text: '#f7f2ed',
  muted: '#a59f9c',
  mutedDark: '#696969',
  red: '#df1730',
  redDark: '#8b1021',
  gold: '#d6ac60',
  green: '#6cc6a6',
  blue: '#7fb6ff',
  amber: '#ffc077',
  black: '#000000',
  white: '#ffffff',
};

export const spacing = {
  screenX: 16,
  androidEdge: 30,
  iosPanelGap: 20,
  androidPanelGap: 30,
  navHeight: 78,
};

export const fonts = {
  title: Platform.OS === 'ios' ? 'Georgia' : 'serif',
};

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 12},
  shadowOpacity: 0.28,
  shadowRadius: 18,
  elevation: 10,
};
