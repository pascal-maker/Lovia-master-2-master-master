"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserSubscription = exports.updateUserSubscription = void 0;

var _config = require("../api/firebase/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = _config.firebase.firestore();

var subscriptionsRef = db.collection('subscriptions');

var updateUserSubscription = function updateUserSubscription(userID, subscriptionPlan) {
  return regeneratorRuntime.async(function updateUserSubscription$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          subscriptionsRef.doc(userID).set(_objectSpread({}, subscriptionPlan), {
            merge: true
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateUserSubscription = updateUserSubscription;

var getUserSubscription = function getUserSubscription(userID) {
  var subscription;
  return regeneratorRuntime.async(function getUserSubscription$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(subscriptionsRef.doc(userID).get());

        case 3:
          subscription = _context2.sent;

          if (!subscription.data()) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", {
            sucess: true,
            subscription: _objectSpread({}, subscription.data(), {
              id: subscription.id
            })
          });

        case 6:
          return _context2.abrupt("return", {
            sucess: false
          });

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            sucess: false,
            error: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getUserSubscription = getUserSubscription;