"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BondedDisplay = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BondedDisplay extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      label = '',
      style,
      staking_ledger
    } = this.props;

    if (!staking_ledger || staking_ledger.isNone) {
      return null;
    }

    const {
      active: bonded
    } = staking_ledger.unwrap();
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, bonded ? (0, _util.formatBalance)(bonded) : '0', children);
  }

}

exports.BondedDisplay = BondedDisplay;

var _default = (0, _uiApi.withCalls)(['query.staking.bonded', {
  paramName: 'params',
  propName: 'controllerId',
  transform: value => value.unwrapOr(null)
}], ['query.staking.ledger', {
  paramName: 'controllerId'
}])(BondedDisplay);

exports.default = _default;