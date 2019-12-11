"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
var _default = "// transfer\nconst sender = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';\nconst recipient = '5F2PCyGDWGDJyLRV15NrBsEa9Y61BS1dfAwzbfk7yR6DBm7P';\n\nconst nonce = await api.query.system.accountNonce(ALICE),\n\nconsole.log('Current nonce', nonce);\n\nconst unsub = await api.tx.balances\n  .transfer(recipient,12345)\n  .signAndSend(sender, ({ events = [], status }) => {\n    console.log('Transaction status:', status.type);\n\n    if (status.isFinalized) {\n      console.log('Completed at block hash', status.asFinalized.toHex());\n      console.log('Events:');\n\n      events.forEach(({ phase, event: { data, method, section } }) => {\n        console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());\n      });\n\n      unsub();\n    }\n  });";
exports.default = _default;