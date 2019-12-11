"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _Context = require("@polkadot/ui-app/Status/Context");

var _Results = _interopRequireDefault(require("./Results"));

var _Selection = _interopRequireDefault(require("./Selection"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class RpcApp extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        txqueue,
        queueRpc
      } = _ref;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Selection.default, {
        queueRpc: queueRpc
      }), _react.default.createElement(_Results.default, {
        queue: txqueue
      }));
    });
  }

}

exports.default = RpcApp;