"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseBytes = _interopRequireDefault(require("./BaseBytes"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Hash extends _react.default.PureComponent {
  render() {
    const {
      className,
      defaultValue,
      isDisabled,
      isError,
      label,
      name,
      onChange,
      style,
      type,
      withLabel
    } = this.props;
    return _react.default.createElement(_BaseBytes.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: 32,
      name: name,
      onChange: onChange,
      size: isDisabled ? 'full' : 'large',
      style: style,
      type: type,
      withLabel: withLabel
    });
  }

}

exports.default = Hash;