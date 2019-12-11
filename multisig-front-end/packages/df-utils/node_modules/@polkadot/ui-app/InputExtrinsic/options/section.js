"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function createOptions(api) {
  return Object.keys(api.tx).sort().map(name => ({
    text: name,
    value: name
  }));
}