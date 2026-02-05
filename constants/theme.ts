/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2E7D32'; // Deep Green
const tintColorDark = '#81C784'; // Lighter Green

export const Colors = {
  light: {
    text: '#1B5E20', // Dark Green Text
    background: '#FAFFF5', // Very light green/white tint
    tint: tintColorLight,
    icon: '#43A047',
    tabIconDefault: '#A5D6A7',
    tabIconSelected: tintColorLight,
    surface: '#FFFFFF',
    border: '#E8F5E9',
    primary: '#2E7D32',
    secondary: '#FBC02D', // Golden Yellow
    error: '#D32F2F',
  },
  dark: {
    text: '#E8F5E9',
    background: '#1B3022', // Dark Green background
    tint: tintColorDark,
    icon: '#81C784',
    tabIconDefault: '#2E7D32',
    tabIconSelected: tintColorDark,
    surface: '#233E2C',
    border: '#2E7D32',
    primary: '#4CAF50',
    secondary: '#FDD835',
    error: '#EF5350',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
