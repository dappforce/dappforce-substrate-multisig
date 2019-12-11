"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("@polkadot/ui-app/constants");

var _uiApp = require("@polkadot/ui-app");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const DEFAULT_BITLENGTH = _constants.BitLengthOption.CHAIN_SPEC;

class InputBalance extends _react.default.PureComponent {
  render() {
    const {
      autoFocus,
      className,
      defaultValue,
      help,
      isDisabled,
      isError,
      label,
      onChange,
      placeholder,
      style,
      value,
      withLabel
    } = this.props;
    return _react.default.createElement(_uiApp.InputNumber, {
      autoFocus: autoFocus,
      className: className,
      bitLength: DEFAULT_BITLENGTH,
      defaultValue: defaultValue,
      help: help,
      isDisabled: isDisabled,
      isError: isError,
      isSi: true,
      label: label,
      onChange: onChange,
      placeholder: placeholder,
      style: style,
      value: value,
      withLabel: withLabel
    });
  }

}

exports.default = InputBalance;