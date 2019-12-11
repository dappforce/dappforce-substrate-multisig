"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Call extends _react.default.PureComponent {
  render() {
    const {
      apiDefaultTx,
      api,
      className,
      isDisabled,
      isError,
      label,
      onChange,
      style,
      withLabel
    } = this.props;

    const defaultValue = (() => {
      try {
        return api.tx.balances.transfer;
      } catch (error) {
        return apiDefaultTx;
      }
    })();

    return _react.default.createElement(_Extrinsic.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: false,
      label: label,
      onChange: onChange,
      style: style,
      withLabel: withLabel
    });
  }

}

var _default = (0, _uiApi.withApi)(Call);

exports.default = _default;