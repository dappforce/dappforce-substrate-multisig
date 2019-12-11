"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Call = _interopRequireDefault(require("./Call"));

var _Proposal = _interopRequireDefault(require("./Proposal"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const components = {
  'Call': _Call.default,
  'Proposal': _Proposal.default
};
var _default = components;
exports.default = _default;