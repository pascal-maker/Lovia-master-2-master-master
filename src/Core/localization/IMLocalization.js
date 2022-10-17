import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../../Translations/en.json"),
  du: () => require("../../Translations/du.json"),
  // fr: () => require("../../Translations/fr.json"),
  // gr: () => require("../../Translations/gr.json"),
  // vr: () => require("../../Translations/vr.json"),
};

export const IMLocalized = memoize(
  (key, config) =>
    i18n.t(key, config).includes("missing") ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  // const { languageTag, isRTL } =
  //   RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  //   fallback;
  let localeLanguageTag = Localization.locale;
  let isRTL = Localization.isRTL;

  var langtype;
  AsyncStorage.getItem("any_key_here").then((value) => {
    if (value == null) {
      langtype = "en";

      if (localeLanguageTag) {
        localeLanguageTag = langtype;
        isRTL = false;
      }

      // i18n.fallbacks = true;

      // clear translation cache
      IMLocalized.cache.clear();
      // update layout direction
      I18nManager.forceRTL(isRTL);
      // set i18n-js config
      i18n.translations = {
        [localeLanguageTag]: translationGetters[localeLanguageTag](),
      };
      i18n.locale = localeLanguageTag;
    } else {
      langtype = value;

      if (localeLanguageTag) {
        localeLanguageTag = langtype;
        isRTL = false;
      }

      // i18n.fallbacks = true;

      // clear translation cache
      IMLocalized.cache.clear();
      // update layout direction
      I18nManager.forceRTL(isRTL);
      // set i18n-js config
      i18n.translations = {
        [localeLanguageTag]: translationGetters[localeLanguageTag](),
      };
      i18n.locale = localeLanguageTag;
    }
  });
};
