"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generator;

var _generate = _interopRequireDefault(require("./generate"));

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function generator(options) {
  const {
    match,
    runs = 10,
    withCase = false
  } = options;
  const test = withCase ? match.split('') : match.toLowerCase().split('');
  const startAt = Date.now();
  const found = [];

  while (found.length !== runs) {
    found.push((0, _generate.default)(test, options));
  }

  return {
    elapsed: Date.now() - startAt,
    found
  };
}