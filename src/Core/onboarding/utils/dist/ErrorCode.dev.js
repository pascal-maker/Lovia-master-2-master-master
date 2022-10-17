"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localizedErrorMessage = exports.ErrorCode = void 0;

var _IMLocalization = require("../../localization/IMLocalization");

var ErrorCode = {
  invalidEmail:'invalidEmail',
  passwordInUse: 'passwordInUse',
  badEmailFormat: 'badEmailFormat',
  emailInUse: 'emailInUse',
  invalidPassword: 'invalidPassword',
  noUser: 'noUser',
  rateLimited: 'rateLimited',
  serverError: 'serverError',
  photoUploadFailed: 'photoUploadFailed',
  fbAuthCancelled: 'fbAuthCancelled',
  fbAuthFailed: 'fbAuthFailed',
  appleAuthFailed: 'appleAuthFailed',
  smsNotSent: 'smsNotSent',
  invalidSMSCode: 'invalidSMSCode'
};
exports.ErrorCode = ErrorCode;

var localizedErrorMessage = function localizedErrorMessage(errorCode) {
  switch (errorCode) {
    case ErrorCode.passwordInUse:
      return (0, _IMLocalization.IMLocalized)('The password is invalid or the user does not have a password');

    case ErrorCode.badEmailFormat:
      return (0, _IMLocalization.IMLocalized)('The email address is badly formatted');

    case ErrorCode.emailInUse:
      return (0, _IMLocalization.IMLocalized)('The email address is already in use by another account.');

    case ErrorCode.invalidPassword:
      return (0, _IMLocalization.IMLocalized)('The given password is invalid');

    case ErrorCode.invalidEmail:
        return (0, _IMLocalization.IMLocalized)('The given email is invalid');
  
    case ErrorCode.noUser:
      return (0, _IMLocalization.IMLocalized)('There is no user record corresponding to this identifier. The user may have been deleted.');

    case ErrorCode.rateLimited:
      return (0, _IMLocalization.IMLocalized)('Too many unsuccessful login attempts');

    case ErrorCode.photoUploadFailed:
      return (0, _IMLocalization.IMLocalized)('Profile photo failed to upload');

    case ErrorCode.smsNotSent:
      return (0, _IMLocalization.IMLocalized)('The SMS was not sent due to an error. Please try again.');

    case ErrorCode.invalidSMSCode:
      return (0, _IMLocalization.IMLocalized)('The verification code is invalid. Please try again.');

    default:
      return (0, _IMLocalization.IMLocalized)('your internet is not working please check your connection first.');
  }
};

exports.localizedErrorMessage = localizedErrorMessage;