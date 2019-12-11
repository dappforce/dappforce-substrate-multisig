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
class KeyValue extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      key: {
        isValid: false,
        u8a: new Uint8Array([])
      },
      value: {
        isValid: false,
        u8a: new Uint8Array([])
      }
    };

    this.onChangeKey = key => {
      this.nextState({
        key: KeyValue.createParam(key)
      });
    };

    this.onChangeValue = value => {
      this.nextState({
        value: KeyValue.createParam(value)
      });
    };
  }

  render() {
    const {
      className,
      isDisabled,
      label,
      style,
      withLabel
    } = this.props;
    const {
      key,
      value
    } = this.state;
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !key.isValid,
      label: label,
      onChange: this.onChangeKey,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    }), _react.default.createElement(_uiApp.Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !value.isValid,
      onChange: this.onChangeValue,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    }));
  }

  static createParam(hex) {
    let length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    let u8a;

    try {
      u8a = (0, _util.hexToU8a)(hex);
    } catch (error) {
      u8a = new Uint8Array([]);
    }

    const isValid = length !== -1 ? u8a.length === length : u8a.length !== 0;
    return {
      isValid,
      u8a: _types.Compact.addLengthPrefix(u8a)
    };
  }

  nextState(newState) {
    this.setState((prevState, _ref) => {
      let {
        onChange
      } = _ref;
      const {
        key = prevState.key,
        value = prevState.value
      } = newState;
      onChange && onChange({
        isValid: key.isValid && value.isValid,
        value: (0, _util.u8aConcat)(key.u8a, value.u8a)
      });
      return newState;
    });
  }

}

exports.default = KeyValue;