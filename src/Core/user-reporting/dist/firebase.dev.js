"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateAllReportedUsers = exports.unblockUser = exports.unsubscribeAbuseDB = exports.markAbuse = void 0;

var _config = require("../api/firebase/config");

var abuseDBRef = _config.firebase.firestore().collection('reports');

var usersDBRef = _config.firebase.firestore().collection('users');

var markAbuse = function markAbuse(outBoundID, toUserID, abuseType) {
  if (outBoundID == toUserID) {
    return Promise(function (r) {
      r();
    });
  }

  return new Promise(function (resolve) {
    var data = {
      dest: toUserID,
      source: outBoundID,
      type: abuseType,
      createdAt: _config.firebase.firestore.FieldValue.serverTimestamp()
    };
    abuseDBRef.add(data).then(function () {
      resolve({
        success: true
      });
    })["catch"](function (error) {
      resolve({
        error: error
      });
    });
  });
};

exports.markAbuse = markAbuse;

var unsubscribeAbuseDB = function unsubscribeAbuseDB(userID, callback) {
  abuseDBRef.where('source', '==', userID).onSnapshot(function (querySnapshot) {
    var abuses = [];
    querySnapshot.forEach(function (doc) {
      abuses.push(doc.data());
    });
    return callback(abuses);
  });
};

exports.unsubscribeAbuseDB = unsubscribeAbuseDB;

var unblockUser = function unblockUser(currentUserID, blockedUserID, callback) {
  return regeneratorRuntime.async(function unblockUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(abuseDBRef.where('source', '==', currentUserID).where('dest', '==', blockedUserID).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              doc.ref["delete"]();
            });
            return callback(true);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.unblockUser = unblockUser;

var hydrateAllReportedUsers = function hydrateAllReportedUsers(userID, callback) {
  return abuseDBRef.where('source', '==', userID).onSnapshot(function (snapshot) {
    var list = [];
    snapshot.forEach(function (childSnapshot) {
      var blockedUser = childSnapshot.data();
      var promise = new Promise(function (resolve, fail) {
        usersDBRef.doc(blockedUser.dest).get().then(function (snap) {
          var info = snap.data();

          if (info) {
            resolve(info);
          }
        }, function (error) {
          fail(error);
        });
      });

      if (promise) {
        list.push(promise);
      }
    }, function (error) {
      console.error(error);
    });
    callback && callback(Promise.all(list));
  });
};

exports.hydrateAllReportedUsers = hydrateAllReportedUsers;