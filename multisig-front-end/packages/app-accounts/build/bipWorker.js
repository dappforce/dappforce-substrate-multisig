"use strict";

var _utilCrypto = require("@polkadot/util-crypto");

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const ctx = self;
(0, _utilCrypto.cryptoWaitReady)().catch(() => {// ignore
});

ctx.onmessage = async (_ref) => {
  let {
    data: {
      pairType
    }
  } = _ref;
  await (0, _utilCrypto.cryptoWaitReady)();
  const seed = (0, _utilCrypto.mnemonicGenerate)();
  const miniSecret = (0, _utilCrypto.mnemonicToMiniSecret)(seed);
  const {
    publicKey
  } = pairType === 'sr25519' ? (0, _utilCrypto.schnorrkelKeypairFromSeed)(miniSecret) : (0, _utilCrypto.naclKeypairFromSeed)(miniSecret);
  ctx.postMessage({
    publicKey,
    seed
  });
};