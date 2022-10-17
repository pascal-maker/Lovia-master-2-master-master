"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentTimestamp = exports.onRenameGroup = exports.onLeaveGroup = exports.createChannel = exports.markChannelThreadItemAsRead = exports.markChannelTypingUsers = exports.deleteMessage = exports.sendMessage = exports.subscribeThreadSnapshot = exports.subscribeSingleChannel = exports.subscribeChannels = void 0;

var _IMLocalization = require("../../../localization/IMLocalization");

var _uuidv = _interopRequireDefault(require("uuidv4"));

var _localData = require("./localData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

/**
 * user object format:
 *    {
 *      createdAt: '2020-10-01T11:53:44.598Z',
 *      email: 'janedoe@yahoo.com',
 *      firstName: 'Jane',
 *      id: 'vwjr22r2v2r',
 *      lastName: 'Doe',
 *      userId: 'vwjr22r2v2r',
 *    },
 *
 */
var chatFeed = [{
  channelID: '131313',
  creatorID: '131313',
  id: '1211212',
  channelName: 'Test Channel',
  title: 'Test Channel',
  participants: [],
  // contains user data
  participantProfilePictureURLs: [],
  // array of string
  readUserIDs: [],
  // contains user objects
  typingUsers: [] // contains user objects

}];
/*
 ** Listens to all the channels, and calls the callback every time there are server side changes on the channels (e.g. someone sends a new message to current user)
 ** Parameters
 ** @userID - The user ID whose chat channels we subscribe to
 ** @callback - A callback method that gets called every time changes are identified in the server-side channels
 */

var subscribeChannels = function subscribeChannels(userID, callback) {
  // subscribe to the channels collection, based on userID
  // every time there are changes in channels server side, we call the callback, e.g.
  // callback(listOfChannels)
  // listOfChannels is an array containing the channels with the following format:
  // [{channelID, creatorID, id, channelName, participantProfilePictureURLs, readUserIDs, typingUsers}, ...];
  callback([]);
};
/**
 * Listens to all the chat_feed, and calls the callback every time there are server side changes on the chat feed
 * Parameters
 * @channelID - The channel ID that the chat belongs to
 *
 * @callback - A callback method that gets called every time changes are identified in the server-side chat feed
 **/


exports.subscribeChannels = subscribeChannels;

var subscribeSingleChannel = function subscribeSingleChannel(channelID, callback) {
  // subscribe to the chat_feed collection, based on userID
  var chatRef = null; // this object will be used to unsubscribe from this listener
  // every time there are changes in channels server side, we call the callback, e.g.
  // callback(chat_feeds)
  // chatfeed is an object with the following format:
  // { title: "Title", participants: [usersData ...], createdAt: 12122112, id: '111dw1wd11d1d', markedAsRead: false };

  return chatRef; // return chatRef object that will be used to unsubscribe from this listener
};
/**
 * Subscribes to message thread snapshot
 * Parameters
 
 * @channel - A callback method that gets called every time changes are identified in the server-side channels

 [{channelID, creatorID, id, channelName, participantProfilePictureURLs, readUserIDs, typingUsers}, ...];
 * @callback - A callback method that gets called every time changes are identified in the server-side chat feed
 */


exports.subscribeSingleChannel = subscribeSingleChannel;

var subscribeThreadSnapshot = function subscribeThreadSnapshot(channel, callback) {
  var threadRef = null; //this is used to unsubscribe from the listener

  callback(_localData.mockThread);
  return threadRef;
};
/**
 * Sends a message
 * Parameters
 * @sender - The user ID whose chat channels we subscribe to
 * @channel - The channel being hydrated
 * @downloadURL - The download url of the media in the message
 * @inReplyToItem - The message being replied if any
 * @participantProfilePictureURLs - Profile picture urls of the participants
 */


exports.subscribeThreadSnapshot = subscribeThreadSnapshot;

var sendMessage = function sendMessage(sender, channel, message, downloadURL, inReplyToItem, participantProfilePictureURLs) {
  // update channel thread
  // hydrate chat feed
  return new Promise(function (resolve) {
    resolve({
      success: true
    });
  });
};
/**
 * Delete message
 *
 * @message - The message object being deleted
 * 
 * message format
 * 
 * {
    sender,
    channel,
    threadItemID,
    isLastCreatedThreadItem,
    newLastCreatedThreadItem,
   }
 *
 */


exports.sendMessage = sendMessage;

var deleteMessage = function deleteMessage(_ref) {// if (isLastCreatedThreadItem && newLastCreatedThreadItem) {
  //   const {
  //     content,
  //     url,
  //     id,
  //     senderID,
  //     readUserIDs,
  //     participantProfilePictureURLs,
  //     createdAt,
  //   } = newLastCreatedThreadItem;
  //  delete message from channel and hyrate chat feed
  //
  // }

  var sender = _ref.sender,
      channel = _ref.channel,
      threadItemID = _ref.threadItemID,
      isLastCreatedThreadItem = _ref.isLastCreatedThreadItem,
      newLastCreatedThreadItem = _ref.newLastCreatedThreadItem;
};
/**
 * Mark channels typing users
 *
 * @channelID - The id of the channel
 * @typingUsers - The array of users typing
 *
 */


exports.deleteMessage = deleteMessage;

var markChannelTypingUsers = function markChannelTypingUsers(channelID, typingUsers) {
  return regeneratorRuntime.async(function markChannelTypingUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Mark Channel Thread as read
 *
 * @channelID - The id of the channel
 * @userID - The id of the user perform the action
 * @threadMessageID - The id of the thread to be marked as read
 * @readUserIDs - The ids of the users that have read the thread
 * @participants - participants of the thread
 *
 */


exports.markChannelTypingUsers = markChannelTypingUsers;

var markChannelThreadItemAsRead = function markChannelThreadItemAsRead(channelID, userID, threadMessageID, readUserIDs, participants) {
  return regeneratorRuntime.async(function markChannelThreadItemAsRead$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 * Create a Channel
 *
 * @creator - The user object of the creator of the group
 * @otherParticipants - An array of other participants being added to the group
 * @name - The name of the group being create
 *
 */


exports.markChannelThreadItemAsRead = markChannelThreadItemAsRead;

var createChannel = function createChannel(creator, otherParticipants, name) {
  // subscribe to the group collection, based on userID
  // every time there are changes in channels server side, we call the callback, e.g.
  // callback(listOfChannels)
  // listOfChannels is an array containing the channels with the following format:
  // [{channelID, creatorID, id, channelName, participantProfilePictureURLs, readUserIDs, typingUsers}, ...];
  return new Promise(function (resolve) {
    var channelID = (0, _uuidv["default"])(); //random id

    var channelData = {
      creatorID: 212112,
      id: 211212,
      channelID: channelID,
      name: name || '',
      participants: [].concat(_toConsumableArray(otherParticipants), [creator])
    };
    resolve({
      success: true,
      channel: channelData
    });
  });
};
/**
 * Leave group
 *
 * @channelId - The channelId of the group the user intends to leave
 * @userId - The userId of the user leaving the group
 * @callback - A callback method that gets called after removing user from group
 *
 */


exports.createChannel = createChannel;

var onLeaveGroup = function onLeaveGroup(channelId, userId, callback) {
  return regeneratorRuntime.async(function onLeaveGroup$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // subscribe to the group collection, based on userID
          // every time there are changes in channels server side, we call the callback, e.g.
          // callback({ success: true });
          callback({
            success: false,
            error: error
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/**
 * Rename group
 *
 * @text - New channel name
 * @channel - The channel to be renamed
 * @callback - A callback method that gets called every time changes are identified in the server-side channels
 *
 */


exports.onLeaveGroup = onLeaveGroup;

var onRenameGroup = function onRenameGroup(text, channel, callback) {
  // rename the channel with text
  // callback({ success: true, newChannel });
  callback({
    success: false,
    error: (0, _IMLocalization.IMLocalized)('An error occurred, please try again.')
  });
};
/**
 *
 * returns timestamp
 */


exports.onRenameGroup = onRenameGroup;

var currentTimestamp = function currentTimestamp() {// return timestamp
};

exports.currentTimestamp = currentTimestamp;