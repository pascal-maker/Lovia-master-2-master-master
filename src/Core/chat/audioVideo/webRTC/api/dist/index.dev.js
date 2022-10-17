"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MediaChatTracker", {
  enumerable: true,
  get: function get() {
    return _tracker["default"];
  }
});
exports["default"] = void 0;

var apiManager = _interopRequireWildcard(require("./firebase/audioVideo"));

var _tracker = _interopRequireDefault(require("./firebase/tracker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as apiManager from './local/audioVideo';
// import MediaChatTracker from './local/tracker';
// export { MediaChatTracker };
// export default apiManager;
// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as apiManager from './backend/audioVideo';
// import MediaChatTracker from './backend/tracker';
// export { MediaChatTracker };
// export default apiManager;
// Remove these lines if you want to remove firebase and add your own custom backend:
var _default = apiManager;
exports["default"] = _default;