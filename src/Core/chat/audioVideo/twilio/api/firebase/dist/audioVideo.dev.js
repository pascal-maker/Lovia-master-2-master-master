"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exitAudioVideoChatRoom = exports.deletePrevSignalledParticipants = exports.signalChatRoomParticipants = exports.subscribeChatRoomParticipants = exports.updateChatRoomStatus = exports.addChatRoomParticipants = exports.addCallConnectionData = exports.subscribeCallConnectionData = exports.cleanChatRoomParticipants = exports.setMediaChatReceivers = exports.subscribeAudioChat = exports.subscribeVideoChat = exports.cleanSignalCollection = void 0;

var _config = require("../../../../api/firebase/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = _config.firebase.firestore();

var audioVideoChatSignalRef = db.collection('audioVideoChatSignal');
var audioVideoChatRoomRef = db.collection('audioVideoChatRoom');

var onMediaChatDataUpdate = function onMediaChatDataUpdate(querySnapshot, chatTimeout, callback) {
  var data = [];
  var date = new Date();
  var currentMiliSeconds = date.getTime();
  querySnapshot.docs.forEach(function (doc) {
    var videoData = doc.data();
    data.push(videoData);
  });
  return callback(data);
};

var cleanSignalCollection = function cleanSignalCollection(userId) {
  var batch, querySnapshot;
  return regeneratorRuntime.async(function cleanSignalCollection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          batch = db.batch();
          _context.next = 3;
          return regeneratorRuntime.awrap(audioVideoChatSignalRef.where('receiverId', '==', userId).get());

        case 3:
          querySnapshot = _context.sent;
          querySnapshot.docs.forEach(function (doc) {
            batch["delete"](doc.ref);
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(batch.commit());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.cleanSignalCollection = cleanSignalCollection;

var subscribeVideoChat = function subscribeVideoChat(userId, chatTimeout, callback) {
  return audioVideoChatSignalRef.where('type', '==', 'video').where('receiverId', '==', userId).onSnapshot(function (querySnapshot) {
    return onMediaChatDataUpdate(querySnapshot, chatTimeout, callback);
  });
};

exports.subscribeVideoChat = subscribeVideoChat;

var subscribeAudioChat = function subscribeAudioChat(userId, chatTimeout, callback) {
  return audioVideoChatSignalRef.where('type', '==', 'audio').where('receiverId', '==', userId).onSnapshot(function (querySnapshot) {
    return onMediaChatDataUpdate(querySnapshot, chatTimeout, callback);
  });
};

exports.subscribeAudioChat = subscribeAudioChat;

var setMediaChatReceivers = function setMediaChatReceivers(data) {
  return regeneratorRuntime.async(function setMediaChatReceivers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(audioVideoChatSignalRef.doc(data.id).set(data));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(audioVideoChatSignalRef.doc(data.id)["delete"]());

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.setMediaChatReceivers = setMediaChatReceivers;

var cleanChatRoomParticipants = function cleanChatRoomParticipants(channelId) {
  var batch, resRef;
  return regeneratorRuntime.async(function cleanChatRoomParticipants$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          batch = db.batch();
          _context3.next = 3;
          return regeneratorRuntime.awrap(audioVideoChatRoomRef.doc(channelId).collection('connectionData').get());

        case 3:
          resRef = _context3.sent;

          if (resRef.docs.length > 0) {
            resRef.docs.forEach(function (doc) {
              batch["delete"](doc.ref);
            });
            batch.commit();
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.cleanChatRoomParticipants = cleanChatRoomParticipants;

var subscribeCallConnectionData = function subscribeCallConnectionData(data, callback) {
  var callConnectionDatasRef = audioVideoChatRoomRef.doc(data.channelId).collection('connectionData').where('receiverId', '==', data.userId);
  return callConnectionDatasRef.onSnapshot(function (querySnapshot) {
    var data = [];
    querySnapshot.foreach(function (doc) {
      var connectionData = doc.data();
      connectionData.id = doc.id;
      data.push(connectionData);
    });
    return callback(data);
  });
};

exports.subscribeCallConnectionData = subscribeCallConnectionData;

var addCallConnectionData = function addCallConnectionData(data) {
  var channelId, type, senderId, receiverId, message, callConnectionDatasRef;
  return regeneratorRuntime.async(function addCallConnectionData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          channelId = data.channelId, type = data.type, senderId = data.senderId, receiverId = data.receiverId, message = data.message;
          callConnectionDatasRef = audioVideoChatRoomRef.doc(channelId).collection('connectionData');

          try {
            callConnectionDatasRef.doc().set({
              senderId: senderId,
              receiverId: receiverId,
              message: message,
              type: type
            });
          } catch (error) {
            console.log(error);
          }

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.addCallConnectionData = addCallConnectionData;

var addChatRoomParticipants = function addChatRoomParticipants(data) {
  var audioVideoChatRoomParticipantsRef;
  return regeneratorRuntime.async(function addChatRoomParticipants$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          audioVideoChatRoomParticipantsRef = audioVideoChatRoomRef.doc(data.channelId).collection('participants');
          audioVideoChatRoomParticipantsRef.doc(data.userId).set({
            participantId: data.userId,
            createdAt: _config.firebase.firestore.FieldValue.serverTimestamp()
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.addChatRoomParticipants = addChatRoomParticipants;

var updateChatRoomStatus = function updateChatRoomStatus(channelId, status) {
  audioVideoChatRoomRef.doc(channelId).update({
    pendding_connection: status
  });
};

exports.updateChatRoomStatus = updateChatRoomStatus;

var subscribeChatRoomParticipants = function subscribeChatRoomParticipants(data, callback) {
  var audioVideoChatRoomParticipantsRef = audioVideoChatRoomRef.doc(data.channelId).collection('participants');
  return audioVideoChatRoomParticipantsRef.onSnapshot(function (querySnapshot) {
    var participants = [];
    querySnapshot.docs.forEach(function (doc) {
      var participant = doc.data();
      participants.push(participant);
    });
    return callback(participants);
  });
};

exports.subscribeChatRoomParticipants = subscribeChatRoomParticipants;

var signalChatRoomParticipants = function signalChatRoomParticipants(data) {
  var participantsId, batch;
  return regeneratorRuntime.async(function signalChatRoomParticipants$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          participantsId = data.participantsId;
          batch = db.batch();
          participantsId.forEach(function (participantId) {
            var ref = audioVideoChatSignalRef.doc(participantId);
            batch.set(ref, _objectSpread({}, data, {
              receiverId: participantId
            }));
          });
          _context6.next = 5;
          return regeneratorRuntime.awrap(batch.commit());

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.signalChatRoomParticipants = signalChatRoomParticipants;

var deletePrevSignalledParticipants = function deletePrevSignalledParticipants(participantsId) {
  var batch;
  return regeneratorRuntime.async(function deletePrevSignalledParticipants$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          batch = db.batch();
          participantsId.forEach(function (participantId) {
            var ref = audioVideoChatSignalRef.doc(participantId);
            batch["delete"](ref);
          });
          _context7.next = 4;
          return regeneratorRuntime.awrap(batch.commit());

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.deletePrevSignalledParticipants = deletePrevSignalledParticipants;

var exitAudioVideoChatRoom = function exitAudioVideoChatRoom(data) {
  var audioVideoChatRoomParticipantsRef = audioVideoChatRoomRef.doc(data.channelId).collection('participants');
  audioVideoChatRoomParticipantsRef.doc(data.userId)["delete"]();
};

exports.exitAudioVideoChatRoom = exitAudioVideoChatRoom;