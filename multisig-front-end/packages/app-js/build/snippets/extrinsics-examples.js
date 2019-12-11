"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extrinsicMakeTransfer = void 0;
// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const extrinsicMakeTransfer = {
  value: 'extrinsicMakeTransfer',
  text: 'Make transfer and listen to events',
  label: {
    color: 'grey',
    children: 'Extrinsics',
    size: 'tiny'
  },
  code: "// Make a transfer from Alice to Bob and listen to system events.\n// You need to be connected to a development chain for this example to work.\nconst ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';\nconst BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';\n\n// Get a random number between 1 and 100000\nconst randomAmount = Math.floor((Math.random() * 100000) + 1);\n\n// Create a extrinsic, transferring randomAmount units to Bob.\nconst transfer = api.tx.balances.transfer(BOB, randomAmount);\n\n// Sign and Send the transaction\ntransfer.signAndSend(ALICE, ({ events = [], status }) => {\n  if (status.isFinalized) {\n    console.log('Successful transfer of ' + randomAmount + ' with hash ' + status.asFinalized.toHex());\n  } else {\n    console.log('Status of transfer: ' + status.type);\n  }\n\n  events.forEach(({ phase, event: { data, method, section } }) => {\n    console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());\n  });\n});"
};
exports.extrinsicMakeTransfer = extrinsicMakeTransfer;