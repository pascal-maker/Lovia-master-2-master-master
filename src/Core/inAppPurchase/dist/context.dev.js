"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIap = exports.IAPContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IAPContext = _react["default"].createContext({
  processing: false,
  setProcessing: function setProcessing() {},
  activePlan: 0,
  subscriptionVisible: false,
  setSubscriptionVisible: function setSubscriptionVisible() {}
});

exports.IAPContext = IAPContext;

var useIap = function useIap() {
  return _react["default"].useContext(IAPContext);
};

exports.useIap = useIap;