"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rpcSysthemInfo = exports.rpcQueryState = exports.rpcNewHead = exports.rpcNetworkAuthoring = void 0;
// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const rpcNetworkAuthoring = {
  value: 'rpcNetworkAuthoring',
  text: 'Get authoring information',
  label: {
    color: 'pink',
    children: 'RPC',
    size: 'tiny'
  },
  code: "// Returns all pending extrinsics, potentially grouped by sender\nconst unsub = await api.rpc.author.pendingExtrinsics((extrinsics) => {\n  if(extrinsics.length === 0){\n    console.log('No pending extrinsics');\n    return;\n  }\n  console.log(extrinsics);\n});"
};
exports.rpcNetworkAuthoring = rpcNetworkAuthoring;
const rpcNewHead = {
  value: 'rpcListenToHead',
  text: 'Listen to new Head',
  label: {
    color: 'pink',
    children: 'RPC',
    size: 'tiny'
  },
  code: "// subscribe to new headers, printing the full info for 5 Blocks\nlet count = 0;\nconst unsub = await api.rpc.chain.subscribeNewHead((header) => {\n  console.log(`#${header.blockNumber}:`, header);\n\n  if (++count === 5) {\n    console.log('5 headers retrieved, unsubscribing');\n    unsub();\n  }\n});"
};
exports.rpcNewHead = rpcNewHead;
const rpcQueryState = {
  value: 'rpcQueryState',
  text: 'Get state metadata',
  label: {
    color: 'pink',
    children: 'RPC',
    size: 'tiny'
  },
  code: "// retrieve and log the complete metadata of your node\nconst { magicNumber,metadata } = await api.rpc.state.getMetadata();\n\nconsole.log( 'Magic number: ' + magicNumber );\nconsole.log( 'Metadata: ' + metadata.raw );\n"
};
exports.rpcQueryState = rpcQueryState;
const rpcSysthemInfo = {
  value: 'rpcSysthemInfo',
  text: 'Get system information',
  label: {
    color: 'pink',
    children: 'RPC',
    size: 'tiny'
  },
  code: "// Retrieve the chain & node information information via rpc calls\nconst [chain, nodeName, nodeVersion, properties] = await Promise.all([\n  api.rpc.system.chain(),\n  api.rpc.system.name(),\n  api.rpc.system.version(),\n  api.rpc.system.properties()\n]);\nconsole.log('You are connected to chain ' + chain)\nconsole.log('You are using: ' + nodeName + ' v' + nodeVersion);\n\nif (properties.size > 0) {\n  console.log('Node specific properties:');\n  properties.forEach((value, key) => {\n    console.log(key, value);\n  });\n} else {\n  console.log('No specific chain properties found.');\n}"
};
exports.rpcSysthemInfo = rpcSysthemInfo;