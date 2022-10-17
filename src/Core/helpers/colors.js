import { Appearance } from "react-native-appearance";
import { Platform } from "react-native";

export const modedColor = (lightModeColor, darkModeColor) => {
  return Appearance.getColorScheme() === "dark"
    ? Platform.OS == "ios"
      ? lightModeColor
      : darkModeColor
    : lightModeColor;
};
