"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authManager", {
  enumerable: true,
  get: function get() {
    return _firebaseAuthManager["default"];
  }
});

var _firebaseAuthManager = _interopRequireDefault(require("./firebase/firebaseAuthManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }