"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Params.css");

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/ui-app/util");

var _util2 = require("@polkadot/util");

var _types = require("@polkadot/types");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// const empty = div({}, '<empty>');
const unknown = div({}, '<unknown>');

function div(_ref) {
  let {
    key,
    className
  } = _ref;

  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return _react.default.createElement("div", {
    className: (0, _util.classes)('ui--Param-text', className),
    key: key
  }, values);
} // function accountToText (_address: string | Uint8Array): React.ReactNode {
//   const address = isU8a(_address)
//     ? encodeAddress(_address)
//     : _address;
//   return div(
//     { className: 'nowrap', key: `account_${address}` },
//     <IdentityIcon
//       className='icon'
//       key='icon'
//       size={24}
//       value={address}
//     />,
//     div({ key: 'address', className: 'ui--Param-Address' }, address),
//     // Empty div so double clicking on the address only selects the address
//     <div key={address}></div>
//   );
// }
// function proposalToText ({ extrinsic, params }: ExtrinsicDecoded): React.ReactNode {
//   if (!extrinsic) {
//     return unknown;
//   }
//   const inputs = extrinsic.params.map(({ name, type }, index) =>
//     div(
//       { key: `param_${index}` },
//       div({ className: 'name', key: 'param_name' }, `${name}=`),
//       valueToText(type, params[index])
//     )
//   );
//   return div(
//     {},
//     div({ className: 'name' }, `${extrinsic.section}.${extrinsic.name}(`),
//     inputs,
//     div({ className: 'name' }, ')')
//   );
// }
// function arrayToText (type: Param$Type$Array, value: Array<any>, withBound: boolean = true): React.ReactNode {
//   if (value.length === 0) {
//     return empty;
//   }
//   if (type.length === 1) {
//     if (type[0] === 'KeyValueStorage') {
//       return div({}, value.length);
//     }
//     return value.map((value, index) =>
//       div(
//         { key: `value_${index}` },
//         div({ className: 'name', key: 'name' }, `${index}:`),
//         valueToText(type[0], value, false)
//       )
//     );
//   }
//   const values = type.map((_type, index) =>
//     valueToText(_type, value[index], false)
//   );
//   return div(
//     {},
//     div({ className: 'name' }, '('),
//     values,
//     div({ className: 'name' }, ')')
//   );
// }


function valueToText(type, value) {
  let swallowError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let contentShorten = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  // try {
  //   if (type === 'bool') {
  //     return div({}, value ? 'Yes' : 'No');
  //   }
  //   if (isUndefined(value)) {
  //     return unknown;
  //   }
  //   if (Array.isArray(type)) {
  //     return arrayToText(type, value);
  //   }
  //   if (type === 'AccountId') {
  //     return value && value.length
  //       ? accountToText(value as string)
  //       : unknown;
  //   }
  //   if (type === 'Proposal') {
  //     return proposalToText(value as ExtrinsicDecoded);
  //   }
  //   if (type === 'VoteThreshold') {
  //     return div({}, thresholdTextMap[value]);
  //   }
  //   if (isU8a(value)) {
  //     return div({}, u8aToHex(value, 256));
  //   }
  //   if (isBn(value)) {
  //     return div({}, formatNumber(value));
  //   }
  // } catch (error) {
  //   if (!swallowError) {
  //     throw error;
  //   } else {
  //     console.log('valueToText', type, value, error);
  //   }
  // }
  // dont' even ask, nested ?: ... really?
  return (0, _util2.isNull)(value) || (0, _util2.isUndefined)(value) ? unknown : div({}, ['Bytes', 'Data'].includes(type) ? (0, _util2.u8aToHex)(value.toU8a(true), contentShorten ? 512 : -1) : value instanceof _types.U8a ? value.isEmpty ? '<empty>' : value.toString() : value instanceof _types.Option && value.isNone ? '<empty>' : value.toString());
}

var _default = valueToText;
exports.default = _default;