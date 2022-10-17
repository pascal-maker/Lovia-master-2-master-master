"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setI18nConfig = exports.IMLocalized = exports.translationGetters = void 0;

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _i18nJs = _interopRequireDefault(require("i18n-js"));

var Localization = _interopRequireWildcard(require("expo-localization"));

var _reactNative = require("react-native");

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: function en() {
    return require("../../Translations/en.json");
  },
  du: function du() {
    return require("../../Translations/du.json");
  } // fr: () => require("../../Translations/fr.json"),
  // gr: () => require("../../Translations/gr.json"),
  // vr: () => require("../../Translations/vr.json"),

};
exports.translationGetters = translationGetters;
var IMLocalized = (0, _lodash["default"])(function (key, config) {
  return _i18nJs["default"].t(key, config).includes("missing") ? key : _i18nJs["default"].t(key, config);
}, function (key, config) {
  return config ? key + JSON.stringify(config) : key;
});
exports.IMLocalized = IMLocalized;

var setI18nConfig = function setI18nConfig() {
  // fallback if no available language fits
  var fallback = {
    languageTag: "en",
    isRTL: false
  }; // const { languageTag, isRTL } =
  //   RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  //   fallback;

  var localeLanguageTag = Localization.locale;
  var isRTL = Localization.isRTL;
  var langtype;

  _asyncStorage["default"].getItem("any_key_here").then(function (value) {
    if (value == null) {
      langtype = "en";

      if (localeLanguageTag) {
        localeLanguageTag = langtype;
        isRTL = false;
      } // i18n.fallbacks = true;
      // clear translation cache


      IMLocalized.cache.clear(); // update layout direction

      _reactNative.I18nManager.forceRTL(isRTL); // set i18n-js config


      _i18nJs["default"].translations = _defineProperty({}, localeLanguageTag, translationGetters[localeLanguageTag]());
      _i18nJs["default"].locale = localeLanguageTag;
    } else {
      langtype = value;

      if (localeLanguageTag) {
        localeLanguageTag = langtype;
        isRTL = false;
      } // i18n.fallbacks = true;
      // clear translation cache


      IMLocalized.cache.clear(); // update layout direction

      _reactNative.I18nManager.forceRTL(isRTL); // set i18n-js config


      _i18nJs["default"].translations = _defineProperty({}, localeLanguageTag, translationGetters[localeLanguageTag]());
      _i18nJs["default"].locale = localeLanguageTag;
    }
  });
};

exports.setI18nConfig = setI18nConfig;