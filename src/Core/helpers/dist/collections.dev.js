"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = exports.removeFromCollection = void 0;

var removeFromCollection = function removeFromCollection(collection, collectionPropertyToCompare, propertyFieldToRemove) {
  return collection.filter(function (collectionItem) {
    return collectionItem[collectionPropertyToCompare] !== propertyFieldToRemove;
  });
};

exports.removeFromCollection = removeFromCollection;

var groupBy = function groupBy(key) {
  return function (array) {
    return array.reduce(function (objectsByKeyValue, obj) {
      var value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  };
};

exports.groupBy = groupBy;