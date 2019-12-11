"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BestNumber = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BestNumber extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      label = '',
      style,
      chain_bestNumber
    } = this.props;
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, chain_bestNumber ? (0, _util.formatNumber)(chain_bestNumber) : '-', children);
  }

}

exports.BestNumber = BestNumber;

var _default = (0, _uiApi.withCall)('derive.chain.bestNumber')(BestNumber);

exports.default = _default;