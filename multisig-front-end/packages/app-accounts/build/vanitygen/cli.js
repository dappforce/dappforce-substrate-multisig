#!/usr/bin/env node
// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _yargs = _interopRequireDefault(require("yargs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _util = require("@polkadot/util");

var _ = _interopRequireDefault(require("."));

var _regex = _interopRequireDefault(require("./regex"));

const {
  match,
  withCase
} = _yargs.default.option('match', {
  default: 'EEEEE'
}).option('withCase', {
  default: true
}).argv;

const INDICATORS = ['|', '/', '-', '\\'];
const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');
const options = {
  match,
  runs: 50,
  withCase
};
const startAt = Date.now();
let best = {
  address: '',
  count: -1,
  offset: 65536
};
let total = 0;
let indicator = -1;

if (!_regex.default.test(match)) {
  console.error("Invalid character found in match string, allowed is '1-9' (no '0'), 'A-H, J-N & P-Z' (no 'I' or 'O'), 'a-k & m-z' (no 'l') and '?' (wildcard)");
  process.exit(-1);
}

console.log(options);

function showProgress() {
  const elapsed = (Date.now() - startAt) / 1000;
  indicator++;

  if (indicator === INDICATORS.length) {
    indicator = 0;
  }

  process.stdout.write("\r[".concat(INDICATORS[indicator], "] ").concat((total.toString().match(NUMBER_REGEX) || []).join(','), " keys in ").concat(elapsed.toFixed(2), "s (").concat((total / elapsed).toFixed(0), " keys/s)"));
}

function showBest() {
  const {
    address,
    count,
    offset,
    seed
  } = best;
  console.log("\r::: ".concat(address.slice(0, offset)).concat(_chalk.default.cyan(address.slice(offset, count + offset))).concat(address.slice(count + offset), " <= ").concat((0, _util.u8aToHex)(seed), " (count=").concat(count, ", offset=").concat(offset, ")"));
}

while (true) {
  const nextBest = (0, _.default)(options).found.reduce((best, match) => {
    if (match.count > best.count || match.count === best.count && match.offset <= best.offset) {
      return match;
    }

    return best;
  }, best);
  total += options.runs;

  if (nextBest.address !== best.address) {
    best = nextBest;
    showBest();
    showProgress();
  } else if (total % 1000 === 0) {
    showProgress();
  }
}