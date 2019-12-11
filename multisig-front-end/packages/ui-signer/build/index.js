"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _Context = require("@polkadot/ui-app/Status/Context");

var _Modal = _interopRequireDefault(require("./Modal"));

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Signer extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      style
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, children, _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        txqueue,
        queueSetTxStatus
      } = _ref;
      return _react.default.createElement(_Modal.default, {
        className: className,
        key: "signer-modal",
        queue: txqueue,
        queueSetTxStatus: queueSetTxStatus,
        style: style
      });
    }));
  }

}

exports.default = Signer;