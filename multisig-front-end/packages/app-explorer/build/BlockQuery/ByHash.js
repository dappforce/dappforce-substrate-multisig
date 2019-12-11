"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _BlockHeader = _interopRequireDefault(require("../BlockHeader"));

var _translate = _interopRequireDefault(require("../translate"));

var _Events = _interopRequireDefault(require("./Events"));

var _Extrinsics = _interopRequireDefault(require("./Extrinsics"));

var _Logs = _interopRequireDefault(require("./Logs"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BlockByHash extends _react.default.PureComponent {
  render() {
    const {
      system_events,
      chain_getBlock,
      chain_getHeader
    } = this.props;

    if (!chain_getBlock || chain_getBlock.isEmpty || !chain_getHeader || chain_getHeader.isEmpty) {
      return null;
    }

    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("header", null, _react.default.createElement(_BlockHeader.default, {
      value: chain_getHeader
    })), _react.default.createElement(_Extrinsics.default, {
      value: chain_getBlock.block.extrinsics
    }), _react.default.createElement(_Events.default, {
      value: system_events
    }), _react.default.createElement(_Logs.default, {
      value: chain_getHeader.digest.logs
    }));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)(['rpc.chain.getBlock', {
  paramName: 'value'
}], ['derive.chain.getHeader', {
  paramName: 'value'
}], ['query.system.events', {
  atProp: 'value'
}])(BlockByHash));

exports.default = _default;