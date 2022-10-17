"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inAppPurchase = exports.setPlans = exports.setSubscriptionPlan = exports.setIsPlanActive = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_SUBSCRIPTION_PLAN = 'SET_SUBSCRIPTION_PLAN';
var SET_PLANS = 'SET_PLANS';
var IS_PLAN_ACTIVE = 'IS_PLAN_ACTIVE';

var setIsPlanActive = function setIsPlanActive(data) {
  return {
    type: IS_PLAN_ACTIVE,
    data: data
  };
};

exports.setIsPlanActive = setIsPlanActive;

var setSubscriptionPlan = function setSubscriptionPlan(data) {
  return {
    type: SET_SUBSCRIPTION_PLAN,
    data: data
  };
};

exports.setSubscriptionPlan = setSubscriptionPlan;

var setPlans = function setPlans(data) {
  return {
    type: SET_PLANS,
    data: data
  };
};

exports.setPlans = setPlans;
var initialState = {
  planId: '',
  plans: [],
  isPlanActive: false
};

var inAppPurchase = function inAppPurchase() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_SUBSCRIPTION_PLAN:
      return _objectSpread({}, state, {
        planId: action.data.planId
      });

    case SET_PLANS:
      return _objectSpread({}, state, {
        plans: action.data.plans
      });

    case IS_PLAN_ACTIVE:
      return _objectSpread({}, state, {
        isPlanActive: action.data
      });

    case 'LOG_OUT':
      return initialState;

    default:
      return state;
  }
};

exports.inAppPurchase = inAppPurchase;