"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filteredNonFriendshipsFromUsers = void 0;

var _constants = require("../constants");

var filteredNonFriendshipsFromUsers = function filteredNonFriendshipsFromUsers(keyword, users, friendships) {
  var filteredUsers = users;

  if (keyword && keyword.length > 0) {
    filteredUsers = users.filter(function (user) {
      return user.firstName && user.firstName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
    });
  }

  filteredUsers = filteredUsers.filter(function (user) {
    return !friendships.find(function (friendship) {
      return friendship.user.id == user.id;
    });
  });
  return filteredUsers.map(function (user) {
    return {
      user: user,
      type: _constants.FriendshipConstants.FriendshipType.none
    };
  });
};

exports.filteredNonFriendshipsFromUsers = filteredNonFriendshipsFromUsers;