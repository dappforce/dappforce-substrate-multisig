"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageRetrieveInfoOnQueryKeys = exports.storageListenToBalanceChange = exports.storageSystemEvents = exports.storageGetInfo = void 0;
// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const storageGetInfo = {
  value: 'storageGetInfo',
  text: 'Get chain state information',
  label: {
    color: 'blue',
    children: 'Storage',
    size: 'tiny'
  },
  code: "// Get chain state information\n// Make our basic chain state/storage queries, all in one go\nconst [blockPeriod, validators, transferFee] = await Promise.all([\n  api.query.timestamp.blockPeriod(),\n  api.query.session.validators(),\n  api.query.balances.transferFee()\n]);\n\nconsole.log('blockPeriod in seconds: ' + blockPeriod.toNumber());\nconsole.log('transferFee: ', transferFee);\n\nif (validators && validators.length > 0) {\n  // Retrieve the balances for all validators\n  console.log('Validators');\n\n  const validatorBalances = await Promise.all(\n    validators.map(authorityId => api.query.balances.freeBalance(authorityId))\n  );\n\n  validators.forEach((authorityId, index) => {\n    console.log('Validator: ' + authorityId.toString() )\n    console.log('Balance: ' + validatorBalances[index].toString() );\n  });\n}\n"
};
exports.storageGetInfo = storageGetInfo;
const storageSystemEvents = {
  value: 'storageSystemEvents',
  text: 'Listen to system events',
  label: {
    color: 'blue',
    children: 'Storage',
    size: 'tiny'
  },
  code: "// Subscribe to system events via storage\napi.query.system.events((events) => {\n  console.log('----- Received ' + events.length + ' event(s): -----');\n  // loop through the Vec<EventRecord>\n  events.forEach((record) => {\n  // extract the phase, event and the event types\n    const { event, phase } = record;\n    const types = event.typeDef;\n    // show what we are busy with\n    console.log(event.section + ':' + event.method + '::' + 'phase=' + phase.toString());\n    console.log(event.meta.documentation.toString());\n    // loop through each of the parameters, displaying the type and data\n    event.data.forEach((data, index) => {\n      console.log(types[index].type + ';' + data.toString());\n    });\n  });\n});"
};
exports.storageSystemEvents = storageSystemEvents;
const storageListenToBalanceChange = {
  value: 'storageListenToBalanceChange',
  text: 'Listen to balance changes',
  label: {
    color: 'blue',
    children: 'Storage',
    size: 'tiny'
  },
  code: "// You may leave this example running and make a transfer\n// of any value from or to Alice address in the 'Transfer' App\nconst ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';\n\n// Retrieve the initial balance.\nlet previous = await api.query.balances.freeBalance(ALICE);\n\nconsole.log('ALICE has a balance of ' + previous);\n\n// Subscribe and listen to balance changes\napi.query.balances.freeBalance(ALICE, (balance) => {\n  // Calculate the delta\n  const change = balance.sub(previous);\n  // Only display positive value changes (Since we are pulling 'previous' above already,\n  // the initial balance change will also be zero)\n  if (!change.isZero()) {\n    previous = balance;\n    console.log('New transaction of: '+ change);\n  }\n});"
};
exports.storageListenToBalanceChange = storageListenToBalanceChange;
const storageRetrieveInfoOnQueryKeys = {
  value: 'storageRetrieveInfoOnQueryKeys',
  text: 'Retrieve Info on query keys',
  label: {
    color: 'blue',
    children: 'Storage',
    size: 'tiny'
  },
  code: "// This example set shows how to make queries and retrieve info on query keys\nconst ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKv3gB';\n\n// retrieve the balance, once-off at the latest block\nconst currBalance = await api.query.balances.freeBalance(ALICE);\n\nconsole.log('Alice has a current balance of', currBalance);\n\n// retrieve balance updates with an optional value callback\nconst balanceUnsub = await api.query.balances.freeBalance(ALICE, (balance) => {\n  console.log('Alice has an updated balance of', balance);\n});\n\n// retrieve the balance at a block hash in the past\nconst header = await api.rpc.chain.getHeader();\nconst prevHash = await api.rpc.chain.getBlockHash(header.blockNumber.subn(42));\nconst prevBalance = await api.query.balances.freeBalance.at(prevHash, ALICE);\n\nconsole.log('Alice had a balance of', prevBalance, '(42 blocks ago)');\n\n// useful in some situations - the value hash and storage entry size\nconst currHash = await api.query.balances.freeBalance.hash(ALICE);\nconst currSize = await api.query.balances.freeBalance.size(ALICE);\n\nconsole.log('Alice balance entry has a value hash of', currHash, 'with a size of', currSize);"
};
exports.storageRetrieveInfoOnQueryKeys = storageRetrieveInfoOnQueryKeys;