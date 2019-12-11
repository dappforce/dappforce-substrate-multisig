"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCalls;

var _call = _interopRequireDefault(require("./call"));

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function withCalls() {
  for (var _len = arguments.length, calls = new Array(_len), _key = 0; _key < _len; _key++) {
    calls[_key] = arguments[_key];
  }

  return Component => {
    // NOTE: Order is reversed so it makes sense in the props, i.e. component
    // after something can use the value of the preceding version
    return calls.reverse().reduce((Component, call) => {
      return Array.isArray(call) ? (0, _call.default)(...call)(Component) : (0, _call.default)(call)(Component);
    }, Component);
  };
}