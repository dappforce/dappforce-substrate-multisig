"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculate;

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function calculateAt(atOffset, test, address) {
  return {
    count: test.reduce((count, c, index) => {
      if (index === count) {
        count += c === '?' || c === address.charAt(index + atOffset) ? 1 : 0;
      }

      return count;
    }, 0),
    offset: atOffset
  };
}

function calculate(test, _address, _ref) {
  let {
    atOffset = -1,
    withCase = false
  } = _ref;
  const address = withCase ? _address : _address.toLowerCase();

  if (atOffset > 0) {
    return calculateAt(atOffset, test, address);
  }

  const maxOffset = address.length - test.length - 1;
  let bestCount = 0;
  let bestOffset = 1;

  for (let index = 1; index < maxOffset; index++) {
    const {
      count,
      offset
    } = calculateAt(index, test, address);

    if (count > bestCount) {
      bestCount = count;
      bestOffset = offset;
    }
  }

  return {
    count: bestCount,
    offset: bestOffset
  };
}