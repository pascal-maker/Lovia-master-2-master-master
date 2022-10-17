"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _auth = require("../Core/onboarding/redux/auth");

var _redux2 = require("../Core/chat/redux");

var _redux3 = require("../Core/user-reporting/redux");

var _reducers = require("./reducers");

var _redux4 = require("../Core/inAppPurchase/redux");

var _redux5 = require("../Core/users/redux");

var AppReducer = (0, _redux.combineReducers)({
  auth: _auth.auth,
  userReports: _redux3.userReports,
  chat: _redux2.chat,
  dating: _reducers.dating,
  inAppPurchase: _redux4.inAppPurchase,
  users: _redux5.users
});
var _default = AppReducer;
exports["default"] = _default;