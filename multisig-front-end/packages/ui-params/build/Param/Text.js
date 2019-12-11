"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _Bare = _interopRequireDefault(require("./Bare"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Text extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = value => {
      const {
        onChange
      } = this.props;
      const isValid = value.length !== 0;
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
    const defaultValue = (value || '').toString();
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChange,
      placeholder: "<any string>",
      type: "text",
      withLabel: withLabel
    }));
  }

}

exports.default = Text;