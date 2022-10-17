"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebase = void 0;

var _base = require("base-64");

require("./timerConfig");

var firebase = _interopRequireWildcard(require("firebase"));

exports.firebase = firebase;

require("@firebase/auth");

require("@firebase/firestore");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

global.addEventListener = function (x) {
  return x;
};

if (!global.btoa) {
  global.btoa = _base.encode;
}

if (!global.atob) {
  global.atob = _base.decode;
}

var firebaseConfig = {
  // apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  // authDomain: 'production-a9404.firebaseapp.com',
  // databaseURL: 'https://production-a9404.firebaseio.com',
  // projectId: 'production-a9404',
  // storageBucket: 'production-a9404.appspot.com',
  // messagingSenderId: '525472070731',
  // appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
  // apiKey: 'AIzaSyAjYgwELheltGBLmR5NRb5xGVoc3SGbdh4',
  // //change
  // authDomain: 'lovia-18d66.firebaseapp.com',
  // //change H
  // databaseURL: 'https://lovia-18d66.firebaseio.com',
  // //change H
  // projectId: 'lovia-18d66',
  // //change
  // storageBucket: 'lovia-18d66.appspot.com',
  // //change
  // messagingSenderId: '436353876015',
  // appId: '1:436353876015:ios:f3523e6b6ea4c14cc746da' //change

  apiKey: "AIzaSyANa2WDfvOk8gYthvK0qpltSEDBZcTcejg",
  authDomain: "test-131cb.firebaseapp.com",
  databaseURL: "https://test-131cb-default-rtdb.firebaseio.com",
  projectId: "test-131cb",
  storageBucket: "test-131cb.appspot.com",
  messagingSenderId: "227577054043",
  appId: "1:227577054043:web:5a320646d5acfc3d50d07e",
  measurementId: "G-1N531GGYZN"

};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);