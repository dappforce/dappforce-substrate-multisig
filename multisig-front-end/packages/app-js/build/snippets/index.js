"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rpcExamples = require("./rpc-examples");

var _storageExamples = require("./storage-examples");

var _extrinsicsExamples = require("./extrinsics-examples");

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const snippets = [_rpcExamples.rpcNetworkAuthoring, _rpcExamples.rpcNewHead, _rpcExamples.rpcQueryState, _rpcExamples.rpcSysthemInfo, _storageExamples.storageGetInfo, _storageExamples.storageSystemEvents, _storageExamples.storageListenToBalanceChange, _storageExamples.storageRetrieveInfoOnQueryKeys, _extrinsicsExamples.extrinsicMakeTransfer];
var _default = snippets;
exports.default = _default;