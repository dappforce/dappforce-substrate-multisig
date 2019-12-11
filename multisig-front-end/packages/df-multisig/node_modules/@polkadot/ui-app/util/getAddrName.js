"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAddrName;

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _toShortAddress = _interopRequireDefault(require("./toShortAddress"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function getAddrName(address, withShort) {
  const pair = _uiKeyring.default.getAccount(address).isValid() ? _uiKeyring.default.getAccount(address) : _uiKeyring.default.getAddress(address);
  const name = pair.isValid() ? pair.getMeta().name : undefined;
  return !name && withShort ? (0, _toShortAddress.default)(address) : name;
}