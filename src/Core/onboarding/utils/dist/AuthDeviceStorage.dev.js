"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SHOULD_SHOW_ONBOARDING_FLOW = 'SHOULD_SHOW_ONBOARDING_FLOW';
/**
 * Get Should Show Onboarding
 * @param {String} value
 * @returns {Boolean}
 */

var getShouldShowOnboardingFlow = function getShouldShowOnboardingFlow() {
  var result;
  return regeneratorRuntime.async(function getShouldShowOnboardingFlow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_asyncStorage["default"].getItem(SHOULD_SHOW_ONBOARDING_FLOW));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result !== null ? false : true);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * Get Should Show OnBoarding Flow
 * @param {String} value
 *
 */


var setShouldShowOnboardingFlow = function setShouldShowOnboardingFlow(value) {
  return regeneratorRuntime.async(function setShouldShowOnboardingFlow$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_asyncStorage["default"].setItem(SHOULD_SHOW_ONBOARDING_FLOW, value));

        case 3:
          _context2.next = 8;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var authDeviceStorage = {
  getShouldShowOnboardingFlow: getShouldShowOnboardingFlow,
  setShouldShowOnboardingFlow: setShouldShowOnboardingFlow
};
var _default = authDeviceStorage;
exports["default"] = _default;