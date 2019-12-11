"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generator;

var _keyring = require("@polkadot/keyring");

var _utilCrypto = require("@polkadot/util-crypto");

var _calculate = _interopRequireDefault(require("./calculate"));

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function generator(test, options) {
  const seed = (0, _utilCrypto.randomAsU8a)();
  const address = (0, _keyring.encodeAddress)((0, _utilCrypto.naclKeypairFromSeed)(seed).publicKey);
  const {
    count,
    offset
  } = (0, _calculate.default)(test, address, options);
  return {
    address,
    count,
    offset,
    seed
  };
}