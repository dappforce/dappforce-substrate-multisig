"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerChange;

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function triggerChange(value) {
  for (var _len = arguments.length, callOnResult = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callOnResult[_key - 1] = arguments[_key];
  }

  if (!callOnResult || !callOnResult.length) {
    return;
  }

  callOnResult.forEach(callOnResult => {
    if ((0, _util.isObservable)(callOnResult)) {
      callOnResult.next(value);
    } else if ((0, _util.isFunction)(callOnResult)) {
      callOnResult(value);
    }
  });
}