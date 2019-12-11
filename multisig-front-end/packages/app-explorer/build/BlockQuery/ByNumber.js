"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _ByHash = _interopRequireDefault(require("./ByHash"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BlockByNumber extends _react.default.PureComponent {
  render() {
    const {
      chain_getBlockHash
    } = this.props;

    if (!chain_getBlockHash) {
      return null;
    }

    return _react.default.createElement(_ByHash.default, {
      value: chain_getBlockHash.toHex()
    });
  }

}

var _default = (0, _uiApi.withCalls)(['rpc.chain.getBlockHash', {
  paramName: 'value'
}])(BlockByNumber);

exports.default = _default;