"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _Amount = _interopRequireDefault(require("./Amount"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Code extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = value => {
      const {
        onChange
      } = this.props;
      onChange && onChange(value);
    };
  }

  render() {
    const {
      className,
      defaultValue,
      isDisabled,
      isError,
      label,
      style,
      type,
      withLabel
    } = this.props;

    if (isDisabled) {
      return this.renderDisabled();
    }

    return _react.default.createElement(_Amount.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChange,
      style: style,
      type: type,
      withLabel: withLabel
    });
  }

  renderDisabled() {
    const {
      className,
      defaultValue,
      isError,
      label,
      style,
      withLabel
    } = this.props;
    return _react.default.createElement(_uiApp.Static, {
      className: className,
      defaultValue: defaultValue && defaultValue.value ? defaultValue.value.toString() : '',
      isError: isError,
      label: label,
      style: style,
      withLabel: withLabel
    });
  } // TODO: Validate that we have actual proper WASM code


}

exports.default = Code;