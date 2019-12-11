"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@polkadot/types");

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ApiSigner {
  constructor(queueExtrinsic, queueSetTxStatus) {
    this._queueExtrinsic = void 0;
    this._queueSetTxStatus = void 0;
    this._queueExtrinsic = queueExtrinsic;
    this._queueSetTxStatus = queueSetTxStatus;
  }

  async sign(extrinsic, accountId, signerOptions) {
    return new Promise((resolve, reject) => {
      this._queueExtrinsic({
        accountId,
        extrinsic,
        signerOptions,
        signerCb: (id, isSigned) => {
          if (isSigned) {
            resolve(id);
          } else {
            reject();
          }
        }
      });
    });
  }

  update(id, result) {
    if (result instanceof _types.Hash) {
      this._queueSetTxStatus(id, 'sent', result.toHex());
    } else {
      this._queueSetTxStatus(id, result.status.type.toLowerCase(), status);
    }
  }

}

exports.default = ApiSigner;