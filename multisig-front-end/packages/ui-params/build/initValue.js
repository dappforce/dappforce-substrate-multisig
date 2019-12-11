"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInitValue;

var _bn = _interopRequireDefault(require("bn.js"));

var _types = require("@polkadot/types");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function getInitValue(def) {
  if (def.info === _types.TypeDefInfo.Vector) {
    return [getInitValue(def.sub)];
  } else if (def.info === _types.TypeDefInfo.Tuple) {
    return Array.isArray(def.sub) ? def.sub.map(def => getInitValue(def)) : [];
  } else if (def.info === _types.TypeDefInfo.Struct) {
    console.error("Unable to determine default type from Struct ".concat(JSON.stringify(def)));
    return void 0;
  }

  const type = def.info === _types.TypeDefInfo.Compact ? def.sub.type : def.type;

  switch (type) {
    case 'AccountIndex':
    case 'Balance':
    case 'BalanceOf':
    case 'BlockNumber':
    case 'Compact':
    case 'Gas':
    case 'Index':
    case 'Nonce':
    case 'ParaId':
    case 'PropIndex':
    case 'ProposalIndex':
    case 'ReferendumIndex':
    case 'u32':
    case 'u64':
    case 'u128':
    case 'VoteIndex':
      return new _bn.default(0);

    case 'bool':
      return false;

    case 'String':
      return '';

    case 'Moment':
      return new _bn.default(0);

    case 'Vote':
      return -1;

    case 'VoteThreshold':
      return 0;

    case 'Bytes':
      return new _types.Bytes();

    case 'CodeHash':
    case 'Hash':
      return new _types.Hash();

    case 'AccountId':
    case 'AccountIdOf':
    case 'Address':
    case 'Bytes':
    case 'Call':
    case 'CandidateReceipt':
    case 'Digest':
    case 'Header':
    case 'KeyValue':
    case 'MisbehaviorReport':
    case 'Proposal':
    case 'Signature':
    case 'SessionKey':
      return void 0;

    default:
      {
        try {
          const instance = (0, _types.createType)(type);

          if (instance instanceof _types.UInt) {
            return new _bn.default(0);
          }
        } catch (error) {// console.error(error.message);
        }

        console.error("Unable to determine default type for ".concat(JSON.stringify(def)));
        return void 0;
      }
  }
}