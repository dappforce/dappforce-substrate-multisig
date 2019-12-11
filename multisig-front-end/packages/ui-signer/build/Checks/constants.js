"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_SIZE_BYTES = exports.MAX_SIZE_MB = exports.ZERO_FEES = exports.ZERO_BALANCE = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const ZERO_BALANCE = {
  freeBalance: new _bn.default(0),
  reservedBalance: new _bn.default(0),
  votingBalance: new _bn.default(0)
};
exports.ZERO_BALANCE = ZERO_BALANCE;
const ZERO_FEES = {
  transactionBaseFee: new _bn.default(0),
  transactionByteFee: new _bn.default(0),
  creationFee: new _bn.default(0),
  existentialDeposit: new _bn.default(0),
  transferFee: new _bn.default(0)
};
exports.ZERO_FEES = ZERO_FEES;
const MAX_SIZE_MB = 10;
exports.MAX_SIZE_MB = MAX_SIZE_MB;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
exports.MAX_SIZE_BYTES = MAX_SIZE_BYTES;