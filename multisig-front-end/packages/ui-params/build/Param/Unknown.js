"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("@polkadot/ui-app/translate"));

var _Bare = _interopRequireDefault(require("./Bare"));

var _BaseBytes = _interopRequireDefault(require("./BaseBytes"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Unknown extends _react.default.PureComponent {
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
      t,
      type
    } = this.props;

    if (isDisabled) {
      const value = defaultValue && defaultValue.value && defaultValue.value.toString();
      return _react.default.createElement(_Bare.default, {
        className: className,
        style: style
      }, _react.default.createElement(_uiApp.Static, {
        className: "full",
        label: label,
        value: value || t('empty')
      }));
    }

    return _react.default.createElement(_BaseBytes.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: -1,
      name: name,
      onChange: onChange,
      size: "full",
      style: style,
      type: type,
      withLength: false
    });
  }

}

var _default = (0, _translate.default)(Unknown);

exports.default = _default;