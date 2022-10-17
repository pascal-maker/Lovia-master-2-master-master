"use strict";

var _reactNative = require("react-native");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _setTimeout = global.setTimeout;
var _clearTimeout = global.clearTimeout;
var MAX_TIMER_DURATION_MS = 60 * 1000;

if (_reactNative.Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  var timerFix = {};

  var runTask = function runTask(id, fn, ttl, args) {
    var waitingTime = ttl - Date.now();

    if (waitingTime <= 1) {
      _reactNative.InteractionManager.runAfterInteractions(function () {
        if (!timerFix[id]) {
          return;
        }

        delete timerFix[id];
        fn.apply(void 0, _toConsumableArray(args));
      });

      return;
    }

    var afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(function () {
      return runTask(id, fn, ttl, args);
    }, afterTime);
  };

  global.setTimeout = function (fn, time) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (MAX_TIMER_DURATION_MS < time) {
      var ttl = Date.now() + time;
      var id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }

    return _setTimeout.apply(void 0, [fn, time].concat(args));
  };

  global.clearTimeout = function (id) {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);

      delete timerFix[id];
      return;
    }

    _clearTimeout(id);
  };
}