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
const options = [{
  text: 'No',
  value: false
}, {
  text: 'Yes',
  value: true
}];

class BoolParam extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = value => {
      const {
        onChange
      } = this.props;
      onChange && onChange({
        isValid: true,
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
    const defaultValue = value instanceof Boolean ? value.valueOf() : value;
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.Dropdown, {
      className: isDisabled ? 'full' : 'medium',
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      options: options,
      onChange: this.onChange,
      withLabel: withLabel
    }));
  }

}

exports.default = BoolParam;