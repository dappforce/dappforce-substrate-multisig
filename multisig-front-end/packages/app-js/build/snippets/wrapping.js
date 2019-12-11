"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWrapper;

// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function makeWrapper(isDevelopment) {
  const args = "api, hashing, ".concat(isDevelopment ? 'keyring, ' : '', "types, util");
  return "// All code is wrapped within an async closure,\n// allowing access to ".concat(args, ".\n// (async ({ ").concat(args, " }) => {\n//   ... any user code is executed here ...\n// })();\n\n");
}