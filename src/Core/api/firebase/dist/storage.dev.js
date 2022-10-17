"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ErrorCode = require("../../onboarding/utils/ErrorCode");

var _config = require("./config");

var _mediaProcessor = require("../../helpers/mediaProcessor");

var getBlob = function getBlob(uri) {
  return regeneratorRuntime.async(function getBlob$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.onload = function () {
              resolve(xhr.response);
            };

            xhr.onerror = function (error) {
              return console.log('error');
            };

            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var uploadFile = function uploadFile(processedUri, callbackProgress) {
  var finished, filename, blob, storageRef, fileRef, uploadTask;
  return regeneratorRuntime.async(function uploadFile$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          finished = false;
          filename = processedUri.substring(processedUri.lastIndexOf('/') + 1);
          _context2.next = 4;
          return regeneratorRuntime.awrap(getBlob(processedUri));

        case 4:
          blob = _context2.sent;
          storageRef = _config.firebase.storage().ref();
          fileRef = storageRef.child(filename);
          uploadTask = fileRef.put(blob);
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            uploadTask.on(_config.firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
              if (snapshot.state == _config.firebase.storage.TaskState.SUCCESS) {
                if (finished == true) {
                  return;
                }

                finished = true;
              }

              callbackProgress && callbackProgress(snapshot);
            }, function (error) {
              console.log('upload error:', error);
              reject(error);
            }, function () {
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
              });
            });
          }));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var processAndUploadMediaFileWithProgressTracking = function processAndUploadMediaFileWithProgressTracking(file, callbackProgress, callbackSuccess, callbackError) {
  (0, _mediaProcessor.processMediaFile)(file, function (_ref) {
    var processedUri = _ref.processedUri,
        thumbnail = _ref.thumbnail;
    // Success handler with SUCCESS is called multiple times on Android. We need work around that to ensure we only call it once
    uploadFile(processedUri, callbackProgress).then(function (downloadURL) {
      if (thumbnail) {
        uploadFile(thumbnail, callbackProgress).then(function (thumbnailURL) {
          callbackSuccess(downloadURL, thumbnailURL);
        })["catch"](callbackError);
        return;
      }

      callbackSuccess(downloadURL);
    })["catch"](callbackError);
  });
};

var processAndUploadMediaFile = function processAndUploadMediaFile(file) {
  return new Promise(function (resolve, _reject) {
    (0, _mediaProcessor.processMediaFile)(file, function (_ref2) {
      var processedUri = _ref2.processedUri,
          thumbnail = _ref2.thumbnail;
      uploadFile(processedUri).then(function (downloadURL) {
        if (thumbnail) {
          uploadFile(thumbnail).then(function (thumbnailURL) {
            resolve({
              downloadURL: downloadURL,
              thumbnailURL: thumbnailURL
            });
          })["catch"](function () {
            return resolve({
              error: _ErrorCode.ErrorCode.photoUploadFailed
            });
          });
          return;
        }

        resolve({
          downloadURL: downloadURL
        });
      })["catch"](function () {
        return resolve({
          error: _ErrorCode.ErrorCode.photoUploadFailed
        });
      });
    });
  });
};

var firebaseStorage = {
  processAndUploadMediaFile: processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking: processAndUploadMediaFileWithProgressTracking
};
var _default = firebaseStorage;
exports["default"] = _default;