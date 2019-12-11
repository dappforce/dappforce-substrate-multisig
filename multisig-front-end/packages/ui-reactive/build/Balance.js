"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BalanceDisplay = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BalanceDisplay extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      label = '',
      style,
      balances_freeBalance
    } = this.props;
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, balances_freeBalance ? (0, _util.formatBalance)(balances_freeBalance) : '0', children);
  }

}

exports.BalanceDisplay = BalanceDisplay;

var _default = (0, _uiApi.withCall)('query.balances.freeBalance', {
  paramName: 'params'
})(BalanceDisplay);

exports.default = _default;