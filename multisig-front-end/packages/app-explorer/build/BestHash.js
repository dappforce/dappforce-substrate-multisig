"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BestHash extends _react.default.PureComponent {
  render() {
    const {
      className,
      label = '',
      style,
      chain_subscribeNewHead
    } = this.props;
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, chain_subscribeNewHead ? chain_subscribeNewHead.hash.toHex() : undefined);
  }

}

var _default = (0, _uiApi.withCall)('rpc.chain.subscribeNewHead')(BestHash);

exports.default = _default;