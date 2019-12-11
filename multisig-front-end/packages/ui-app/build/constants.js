"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenSizes = exports.BitLengthOption = void 0;
// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
let BitLengthOption;
exports.BitLengthOption = BitLengthOption;

(function (BitLengthOption) {
  BitLengthOption[BitLengthOption["CHAIN_SPEC"] = 128] = "CHAIN_SPEC";
  BitLengthOption[BitLengthOption["NORMAL_NUMBERS"] = 32] = "NORMAL_NUMBERS";
})(BitLengthOption || (exports.BitLengthOption = BitLengthOption = {}));

let ScreenSizes;
exports.ScreenSizes = ScreenSizes;

(function (ScreenSizes) {
  ScreenSizes[ScreenSizes["DESKTOP"] = 992] = "DESKTOP";
  ScreenSizes[ScreenSizes["TABLET"] = 768] = "TABLET";
  ScreenSizes[ScreenSizes["PHONE"] = 576] = "PHONE";
})(ScreenSizes || (exports.ScreenSizes = ScreenSizes = {}));