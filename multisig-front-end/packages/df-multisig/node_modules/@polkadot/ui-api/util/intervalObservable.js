"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intervalSubscribe;

var _interval = require("rxjs/observable/interval");

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const interval$ = (0, _interval.interval)(500);

function intervalSubscribe(that) {
  return interval$.subscribe(() => {
    const elapsed = Date.now() - (that.state.callUpdatedAt || 0);
    const callUpdated = elapsed <= 1500;

    if (callUpdated !== that.state.callUpdated) {
      that.setState({
        callUpdated
      });
    }
  });
}