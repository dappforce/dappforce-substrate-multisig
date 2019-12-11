"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = values;

var _util = require("@polkadot/util");

var _initValue = _interopRequireDefault(require("./initValue"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function values(params) {
  return params.map((_ref) => {
    let {
      type
    } = _ref;
    const value = (0, _initValue.default)(type);
    return {
      isValid: !(0, _util.isUndefined)(value),
      value
    };
  });
}