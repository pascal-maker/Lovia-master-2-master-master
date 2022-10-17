import { decode, encode } from 'base-64';
import './timerConfig';

global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  // apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  // authDomain: 'production-a9404.firebaseapp.com',
  // databaseURL: 'https://production-a9404.firebaseio.com',
  // projectId: 'production-a9404',
  // storageBucket: 'production-a9404.appspot.com',
  // messagingSenderId: '525472070731',
  // appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',

  // apiKey: 'AIzaSyAjYgwELheltGBLmR5NRb5xGVoc3SGbdh4',//change
  // authDomain: 'lovia-18d66.firebaseapp.com',//change H
  // databaseURL: 'https://lovia-18d66.firebaseio.com',//change H
  // projectId: 'lovia-18d66',//change
  // storageBucket: 'lovia-18d66.appspot.com',//change
  // messagingSenderId: '436353876015',
  // appId: '1:436353876015:ios:f3523e6b6ea4c14cc746da',//change

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

export { firebase };
