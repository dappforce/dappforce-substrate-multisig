"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findComponent;

var _types = require("@polkadot/types");

var _Account = _interopRequireDefault(require("./Account"));

var _Amount = _interopRequireDefault(require("./Amount"));

var _Balance = _interopRequireDefault(require("./Balance"));

var _Bool = _interopRequireDefault(require("./Bool"));

var _Bytes = _interopRequireDefault(require("./Bytes"));

var _Code = _interopRequireDefault(require("./Code"));

var _Hash = _interopRequireDefault(require("./Hash"));

var _Moment = _interopRequireDefault(require("./Moment"));

var _Proposal = _interopRequireDefault(require("./Proposal"));

var _KeyValue = _interopRequireDefault(require("./KeyValue"));

var _KeyValueArray = _interopRequireDefault(require("./KeyValueArray"));

var _Text = _interopRequireDefault(require("./Text"));

var _Tuple = _interopRequireDefault(require("./Tuple"));

var _Unknown = _interopRequireDefault(require("./Unknown"));

var _Vector = _interopRequireDefault(require("./Vector"));

var _Vote = _interopRequireDefault(require("./Vote"));

var _VoteThreshold = _interopRequireDefault(require("./VoteThreshold"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const components = [{
  c: _Account.default,
  t: ['AccountId', 'AccountIdOf', 'Address', 'SessionKey']
}, {
  c: _Amount.default,
  t: ['AccountIndex', 'BlockNumber', 'Gas', 'Index', 'Nonce', 'ParaId', 'ProposalIndex', 'PropIndex', 'ReferendumIndex', 'u16', 'u32', 'u64', 'u128', 'u256', 'VoteIndex']
}, {
  c: _Balance.default,
  t: ['Amount', 'AssetOf', 'Balance', 'BalanceOf']
}, {
  c: _Bool.default,
  t: ['bool']
}, {
  c: _Bytes.default,
  t: ['Bytes']
}, {
  c: _Code.default,
  t: ['Code']
}, {
  c: _Hash.default,
  t: ['CodeHash', 'Hash', 'SeedOf', 'Signature']
}, {
  c: _KeyValue.default,
  t: ['KeyValue']
}, {
  c: _KeyValueArray.default,
  t: ['Vec<KeyValue>']
}, {
  c: _Moment.default,
  t: ['Moment', 'MomentOf']
}, {
  c: _Proposal.default,
  t: ['Proposal']
}, {
  c: _Text.default,
  t: ['String', 'Text']
}, {
  c: _Tuple.default,
  t: ['Tuple']
}, {
  c: _Vector.default,
  t: ['Vector']
}, {
  c: _Vote.default,
  t: ['Vote']
}, {
  c: _VoteThreshold.default,
  t: ['VoteThreshold']
}].reduce((components, _ref) => {
  let {
    c,
    t
  } = _ref;
  t.forEach(type => {
    components[type] = c;
  });
  return components;
}, {});

function findComponent(def) {
  let overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  const type = ((_ref2) => {
    let {
      info,
      sub,
      type
    } = _ref2;

    switch (info) {
      case _types.TypeDefInfo.Compact:
        return sub.type;

      case _types.TypeDefInfo.Tuple:
        return 'Tuple';

      case _types.TypeDefInfo.Vector:
        return ['Vec<KeyValue>'].includes(type) ? 'Vec<KeyValue>' : 'Vector';

      default:
        return type;
    }
  })(def);

  let Component = overrides[type] || components[type];

  if (!Component) {
    try {
      const instance = (0, _types.createType)(type);

      if (instance instanceof _types.UInt) {
        return _Amount.default;
      }
    } catch (error) {// console.error(error.message);
    }
  }

  return Component || _Unknown.default;
}