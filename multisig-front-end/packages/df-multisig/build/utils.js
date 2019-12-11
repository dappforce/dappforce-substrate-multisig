"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMultisigToProp = void 0;

var _dfUtils = require("@polkadot/df-utils/");

const queryMultisigToProp = (storageItem, paramNameOrOpts) => {
  return (0, _dfUtils.queryToProp)("query.multisigWalletModule.".concat(storageItem), paramNameOrOpts);
};

exports.queryMultisigToProp = queryMultisigToProp;