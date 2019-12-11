"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _Bare = _interopRequireDefault(require("./Bare"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const defaultValidate = u8a => true;

class BaseBytes extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = hex => {
      const {
        length = -1,
        onChange,
        validate = defaultValidate,
        withLength
      } = this.props;
      let value;
      let isValid = true;

      try {
        value = (0, _util.hexToU8a)(hex);
      } catch (error) {
        value = new Uint8Array([]);
        isValid = false;
      }

      isValid = isValid && validate(value) && (length !== -1 ? value.length === length : value.length !== 0);

      if (withLength && isValid) {
        value = _types.Compact.addLengthPrefix(value);
      }

      onChange && onChange({
        isValid,
        value
      });
    };
  }

  render() {
    const {
      children,
      className,
      defaultValue: {
        value
      },
      isDisabled,
      isError,
      label,
      size = 'full',
      style,
      withLabel
    } = this.props;
    const defaultValue = value ? (0, _util.isHex)(value) ? value : (0, _util.u8aToHex)(value, isDisabled ? 256 : -1) : undefined;
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.Input, {
      className: size,
      defaultValue: defaultValue,
      isAction: !!children,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChange,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    }, children));
  }

}

exports.default = BaseBytes;