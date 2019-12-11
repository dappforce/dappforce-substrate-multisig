"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toAddress;

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function toAddress(value) {
  if (!value) {
    return;
  }

  try {
    return _uiKeyring.default.encodeAddress((0, _util.isHex)(value) ? (0, _util.hexToU8a)(value) : _uiKeyring.default.decodeAddress(value));
  } catch (error) {
    console.error('Unable to encode address', value);
    return;
  }
}