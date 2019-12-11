"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Balance = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _Bare = _interopRequireDefault(require("./Bare"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Balance extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = value => {
      const {
        isError,
        onChange
      } = this.props;

      if (!onChange) {
        return;
      }

      onChange({
        isValid: !isError && !!value,
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
    const defaultValue = new _bn.default((value || '0').toString()).toString(10);
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.InputBalance, {
      className: isDisabled ? 'full' : 'large',
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChange,
      withLabel: withLabel
    }));
  }

}

exports.Balance = Balance;
var _default = Balance;
exports.default = _default;