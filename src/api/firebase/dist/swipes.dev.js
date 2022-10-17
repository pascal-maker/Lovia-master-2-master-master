"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserSwipeCount = exports.getUserSwipeCount = exports.markSwipeAsSeen = exports.removeSwipe = exports.addSwipe = exports.subscribeToOutboundSwipes = exports.subscribeToInboundSwipes = void 0;

var _config = require("../../Core/api/firebase/config");

var db = _config.firebase.firestore();

var usersRef = _config.firebase.firestore().collection('users');

var swipesRef = _config.firebase.firestore().collection('swipes');

var swipeCountRef = _config.firebase.firestore().collection('swipe_counts');

var onCollectionUpdate = function onCollectionUpdate(querySnapshot, callback) {
  var data = [];
  querySnapshot.forEach(function (doc) {
    var temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });
  return callback(data, usersRef);
};

var subscribeToInboundSwipes = function subscribeToInboundSwipes(userId, callback) {
  return swipesRef.where('swipedProfile', '==', userId).onSnapshot(function (querySnapshot) {
    return onCollectionUpdate(querySnapshot, callback);
  });
};

exports.subscribeToInboundSwipes = subscribeToInboundSwipes;

var subscribeToOutboundSwipes = function subscribeToOutboundSwipes(userId, callback) {
  return swipesRef.where('author', '==', userId).onSnapshot(function (querySnapshot) {
    return onCollectionUpdate(querySnapshot, callback);
  });
};

exports.subscribeToOutboundSwipes = subscribeToOutboundSwipes;

var addSwipe = function addSwipe(fromUserID, toUserID, type, callback) {
  console.log('fromUserID, toUserID, type, callback : ', fromUserID, toUserID, type, callback);
  swipesRef.add({
    author: fromUserID,
    swipedProfile: toUserID,
    type: type,
    hasBeenSeen: false,
    created_at: _config.firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: _config.firebase.firestore.FieldValue.serverTimestamp()
  }).then(function () {
    callback({
      success: true
    });
  })["catch"](function (error) {
    callback({
      error: error
    });
  });
};

exports.addSwipe = addSwipe;

var removeSwipe = function removeSwipe(swipeProfileId, userID) {
  var batch = db.batch();
  var query = swipesRef.where('swipedProfile', '==', swipeProfileId).where('author', '==', userID);
  query.get().then(function _callee(querySnapshot) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            querySnapshot.docs.forEach(function (doc) {
              batch["delete"](doc.ref);
            });
            batch.commit();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.removeSwipe = removeSwipe;

var markSwipeAsSeen = function markSwipeAsSeen(fromUserID, toUserID) {
  swipesRef.where('author', '==', fromUserID).where('swipedProfile', '==', toUserID).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.update({
        hasBeenSeen: true
      });
    });
  });
};

exports.markSwipeAsSeen = markSwipeAsSeen;

var getUserSwipeCount = function getUserSwipeCount(userID) {
  var swipeCount;
  return regeneratorRuntime.async(function getUserSwipeCount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(swipeCountRef.doc(userID).get());

        case 3:
          swipeCount = _context2.sent;

          if (!swipeCount.data()) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", swipeCount.data());

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return");

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [
    [0, 8]
  ]);
};

exports.getUserSwipeCount = getUserSwipeCount;

var updateUserSwipeCount = function updateUserSwipeCount(userID, count) {
  var data = {
    authorID: userID,
    count: count
  };

  if (count === 1) {
    data.createdAt = _config.firebase.firestore.FieldValue.serverTimestamp();
  }

  try {
    swipeCountRef.doc(userID).set(data, {
      merge: true
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserSwipeCount = updateUserSwipeCount;