"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toShortAddress;

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function toShortAddress(_address) {
  const address = (_address || '').toString();

  return address.length > 13 ? "".concat(address.slice(0, 6), "\u2026").concat(address.slice(-6)) : address;
}