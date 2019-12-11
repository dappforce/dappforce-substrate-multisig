"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _Bare = _interopRequireDefault(require("./Bare"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Account extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = value => {
      const {
        onChange
      } = this.props;
      let isValid = false;

      if (value) {
        try {
          _uiKeyring.default.decodeAddress(value);

          isValid = true;
        } catch (err) {
          console.error(err);
        }
      }

      onChange && onChange({
        isValid,
        value
      });
    };
  }

  render() {
    const {
      className,
      defaultValue: {
        value
      },
      isDisabled,
      isError,
      label,
      style,
      withLabel
    } = this.props;
    const defaultValue = value && value.toString();
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      isInput: true,
      label: label,
      onChange: this.onChange,
      placeholder: "5...",
      withLabel: withLabel
    }));
  }

}

exports.default = Account;