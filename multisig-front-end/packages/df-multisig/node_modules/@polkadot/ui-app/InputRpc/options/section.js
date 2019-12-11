"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

var _jsonrpc = _interopRequireDefault(require("@polkadot/jsonrpc"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function createOptions() {
  return Object.keys(_jsonrpc.default).sort().map(name => ({
    text: name,
    value: name
  }));
}