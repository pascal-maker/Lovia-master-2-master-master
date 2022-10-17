"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _IMLocalization = require("../localization/IMLocalization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var monthNames = [(0, _IMLocalization.IMLocalized)('Jan'), (0, _IMLocalization.IMLocalized)('Feb'), (0, _IMLocalization.IMLocalized)('Mar'), (0, _IMLocalization.IMLocalized)('Apr'), (0, _IMLocalization.IMLocalized)('May'), (0, _IMLocalization.IMLocalized)('Jun'), (0, _IMLocalization.IMLocalized)('Jul'), (0, _IMLocalization.IMLocalized)('Aug'), (0, _IMLocalization.IMLocalized)('Sep'), (0, _IMLocalization.IMLocalized)('Oct'), (0, _IMLocalization.IMLocalized)('Nov'), (0, _IMLocalization.IMLocalized)('Dec')];

var TNDateFormattedTimestamp = function TNDateFormattedTimestamp(timestamp) {
  if (timestamp) {
    var time = (0, _moment["default"])(timestamp.toDate());

    if ((0, _moment["default"])().diff(time, 'days') == 0) {
      return time.format('H:mm');
    } else if ((0, _moment["default"])().diff(time, 'week') == 0) {
      return time.fromNow();
    } else {
      return "".concat(monthNames[timestamp.toDate().getMonth()], " ").concat(time.format('D, Y'));
    }
  }

  return '';
};

var _default = TNDateFormattedTimestamp;
exports["default"] = _default;