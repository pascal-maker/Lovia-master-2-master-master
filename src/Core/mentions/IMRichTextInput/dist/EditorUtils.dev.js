"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.EU = exports.displayTextWithMentions = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * EditorUtils contains helper
 * functions for our Editor
 */
var displayTextWithMentions = function displayTextWithMentions(inputText, formatMentionNode) {
  var formatNonMentionNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  /**
   * Use this function to parse mentions markup @[username](id) in the string value.
   */
  if (inputText === '') return null;
  var retLines = inputText.split('\n');
  var formattedText = [];
  retLines.forEach(function (retLine, rowIndex) {
    var mentions = EU.findMentions(retLine);

    if (mentions.length) {
      var lastIndex = 0;
      mentions.forEach(function (men, index) {
        var initialStr = retLine.substring(lastIndex, men.start);
        lastIndex = men.end + 1;
        formattedText.push(initialStr);
        var formattedMention = formatMentionNode("@".concat(men.username), "".concat(index, "-").concat(men.id, "-").concat(rowIndex));
        formattedText.push(formattedMention);

        if (mentions.length - 1 === index) {
          var lastStr = retLine.substr(lastIndex); //remaining string

          formattedText.push(lastStr);
        }
      });
    } else {
      formatNonMentionNode("".concat(retLine), "".concat(retLine));
      formattedText.push(retLine);
    }

    formattedText.push('\n');
  });
  return formattedText;
};

exports.displayTextWithMentions = displayTextWithMentions;
var EU = {
  specialTagsEnum: {
    mention: 'mention',
    strong: 'strong',
    italic: 'italic',
    underline: 'underline'
  },
  isKeysAreSame: function isKeysAreSame(src, dest) {
    return src.toString() === dest.toString();
  },
  getLastItemInMap: function getLastItemInMap(map) {
    return Array.from(map)[map.size - 1];
  },
  getLastKeyInMap: function getLastKeyInMap(map) {
    return Array.from(map.keys())[map.size - 1];
  },
  getLastValueInMap: function getLastValueInMap(map) {
    return Array.from(map.values())[map.size - 1];
  },
  updateRemainingMentionsIndexes: function updateRemainingMentionsIndexes(map, _ref, diff, shouldAdd) {
    var start = _ref.start,
        end = _ref.end;
    var newMap = new Map(map);
    var keys = EU.getSelectedMentionKeys(newMap, {
      start: start,
      end: end
    });
    keys.forEach(function (key) {
      var newKey = shouldAdd ? [key[0] + diff, key[1] + diff] : [key[0] - diff, key[1] - diff];
      var value = newMap.get(key);
      newMap["delete"](key); //ToDo+ push them in the same order.

      newMap.set(newKey, value);
    });
    return newMap;
  },
  getSelectedMentionKeys: function getSelectedMentionKeys(map, _ref2) {
    var start = _ref2.start,
        end = _ref2.end;

    // mention [2, 5],
    // selection [3, 6]
    var mantionKeys = _toConsumableArray(map.keys());

    var keys = mantionKeys.filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          a = _ref4[0],
          b = _ref4[1];

      return EU.between(a, start, end) || EU.between(b, start, end);
    });
    return keys;
  },
  findMentionKeyInMap: function findMentionKeyInMap(map, cursorIndex) {
    // const keys = Array.from(map.keys())
    // OR
    var keys = _toConsumableArray(map.keys());

    var key = keys.filter(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          a = _ref6[0],
          b = _ref6[1];

      return EU.between(cursorIndex, a, b);
    })[0];
    return key;
  },
  addMenInSelection: function addMenInSelection(selection, prevSelc, mentions) {
    /**
     * Both Mentions and Selections are 0-th index based in the strings
     * meaning their indexes in the string start from 0
     * While user made a selection automatically add mention in the selection.
     */
    var sel = _objectSpread({}, selection);

    mentions.forEach(function (value, _ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          menStart = _ref8[0],
          menEnd = _ref8[1];

      if (EU.diff(prevSelc.start, prevSelc.end) < EU.diff(sel.start, sel.end)) {
        //user selecting.
        if (EU.between(sel.start, menStart, menEnd)) {
          //move sel to the start of mention
          sel.start = menStart; //both men and selection is 0th index
        }

        if (EU.between(sel.end - 1, menStart, menEnd)) {
          //move sel to the end of mention
          sel.end = menEnd + 1;
        }
      } else {
        //previousSelection.diff > currentSelection.diff //user deselecting.
        if (EU.between(sel.start, menStart, menEnd)) {
          //deselect mention to the end of mention
          sel.start = menEnd + 1;
        }

        if (EU.between(sel.end, menStart, menEnd)) {
          //deselect mention to the start of mention
          sel.end = menStart;
        }
      }
    });
    return sel;
  },
  moveCursorToMentionBoundry: function moveCursorToMentionBoundry(selection, prevSelc, mentions, isTrackingStarted) {
    /**
     * Both Mentions and Selections are 0-th index based in the strings
     * moveCursorToMentionBoundry will move cursor to the start
     * or to the end of mention based on user traverse direction.
     */
    var sel = _objectSpread({}, selection);

    if (isTrackingStarted) return sel;
    mentions.forEach(function (value, _ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          menStart = _ref10[0],
          menEnd = _ref10[1];

      if (prevSelc.start > sel.start) {
        //traversing Right -to- Left  <=
        if (EU.between(sel.start, menStart, menEnd)) {
          //move cursor to the start of mention
          sel.start = menStart;
          sel.end = menStart;
        }
      } else {
        //traversing Left -to- Right =>
        if (EU.between(sel.start - 1, menStart, menEnd)) {
          //move cursor to the end of selection
          sel.start = menEnd + 1;
          sel.end = menEnd + 1;
        }
      }
    });
    return sel;
  },
  between: function between(x, min, max) {
    return x >= min && x <= max;
  },
  sum: function sum(x, y) {
    return x + y;
  },
  diff: function diff(x, y) {
    return Math.abs(x - y);
  },
  isEmpty: function isEmpty(str) {
    return str === '';
  },
  getMentionsWithInputText: function getMentionsWithInputText(inputText) {
    /**
     * translate provided string e.g. `Hey @[mrazadar](id:1) this is good work.`
     * populate mentions map with [start, end] : {...user}
     * translate inputText to desired format; `Hey @mrazadar this is good work.`
     */
    var map = new Map();
    var newValue = '';
    if (inputText === '') return null;
    var retLines = inputText.split('\n');
    retLines.forEach(function (retLine, rowIndex) {
      var mentions = EU.findMentions(retLine);

      if (mentions.length) {
        var lastIndex = 0;
        var endIndexDiff = 0;
        mentions.forEach(function (men, index) {
          newValue = newValue.concat(retLine.substring(lastIndex, men.start));
          var username = "@".concat(men.username);
          newValue = newValue.concat(username);
          var menEndIndex = men.start + (username.length - 1);
          map.set([men.start - endIndexDiff, menEndIndex - endIndexDiff], {
            id: men.id,
            username: men.username
          }); //indexes diff with the new formatted string.

          endIndexDiff = endIndexDiff + Math.abs(men.end - menEndIndex); //update last index

          lastIndex = men.end + 1;

          if (mentions.length - 1 === index) {
            var lastStr = retLine.substr(lastIndex); //remaining string

            newValue = newValue.concat(lastStr);
          }
        });
      } else {
        newValue = newValue.concat(retLine);
      }

      if (rowIndex !== retLines.length - 1) {
        newValue = newValue.concat('\n');
      }
    });
    return {
      map: map,
      newValue: newValue
    };
  },
  findMentions: function findMentions(val) {
    /**
     * Both Mentions and Selections are 0-th index based in the strings
     * meaning their indexes in the string start from 0
     * findMentions finds starting and ending positions of mentions in the given text
     * @param val string to parse to find mentions
     * @returns list of found mentions
     */
    var reg = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/gim;
    var indexes = [];

    while (match = reg.exec(val)) {
      indexes.push({
        start: match.index,
        end: reg.lastIndex - 1,
        username: match[1],
        id: match[2],
        type: EU.specialTagsEnum.mention
      });
    }

    return indexes;
  },
  whenTrue: function whenTrue(next, current, key) {
    /**
     * whenTrue function will be used to check the
     * boolean props for the component
     * @params {current, next, key}
     * @next: this.props
     * @current: nextProps
     * @key: key to lookup in both objects
     * and will only returns true. if nextProp is true
     * and nextProp is a different version/value from
     * previous prop
     */
    return next[key] && next[key] !== current[key];
  },
  displayTextWithMentions: displayTextWithMentions
};
exports.EU = EU;
var _default = EU;
exports["default"] = _default;