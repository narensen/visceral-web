/**
 * Hook to get theme colors based on color scheme
 */

import { useColorScheme, ColorScheme } from "./useColorScheme";

export interface ThemeColors {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

const light: ThemeColors = {
  text: "#000",
  background: "#fff",
  tint: "#0a7ea4",
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#0a7ea4",
};

const dark: ThemeColors = {
  text: "#fff",
  background: "#000",
  tint: "#fff",
  icon: "#9BA1A6",
  tabIconDefault: "#9BA1A6",
  tabIconSelected: "#fff",
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ThemeColors
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme === "light" ? light[colorName] : dark[colorName];
  }
}

export function useThemeColors(): ThemeColors {
  const theme = useColorScheme();
  return theme === "light" ? light : dark;
}
