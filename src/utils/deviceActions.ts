import {Alert, Linking, Platform} from 'react-native';

const openLink = async (url: string, fallbackTitle: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return;
    }
  } catch {
    // Fall through to the user-facing alert.
  }
  Alert.alert(fallbackTitle, url);
};

export const openWebsite = (url: string) => openLink(url, 'Unable to open this website');

export const openPhone = (phone: string) => {
  const compact = phone.replace(/[^\d+]/g, '');
  return openLink(`tel:${compact}`, 'Unable to start a phone call');
};

export const openDirections = (query: string) => {
  const encoded = encodeURIComponent(query);
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${encoded}`,
    default: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
  });
  return openLink(url, 'Unable to open maps');
};
