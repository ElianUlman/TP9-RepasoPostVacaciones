import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  bg: '#14161f',
  bgElevated: '#1d2030',
  surface: '#262a3d',
  text: '#ede9e0',
  textMuted: '#a9a6b0',
  accent: '#e3b23c',
  accentHover: '#f0c65a',
  border: '#34384e',
};

export const SIZES = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  pagePadding: 16,
  cardMargin: 12,
};

export const FONTS = {
  title: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '400' },
};

export default { COLORS, SIZES, FONTS };
