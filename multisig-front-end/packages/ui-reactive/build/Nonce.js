"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Nonce = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Nonce extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      label = '',
      style,
      system_accountNonce
    } = this.props;
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, system_accountNonce ? (0, _util.formatNumber)(system_accountNonce) : '0', children);
  }

}

exports.Nonce = Nonce;

var _default = (0, _uiApi.withCall)('query.system.accountNonce', {
  paramName: 'params'
})(Nonce);

exports.default = _default;