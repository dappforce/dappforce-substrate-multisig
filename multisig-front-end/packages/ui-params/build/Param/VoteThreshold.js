"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.textMap = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _Bare = _interopRequireDefault(require("./Bare"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const options = [{
  text: 'Super majority approval',
  value: 0
}, {
  text: 'Super majority rejection',
  value: 1
}, {
  text: 'Simple majority',
  value: 2
}];
const textMap = options.reduce((textMap, _ref) => {
  let {
    text,
    value
  } = _ref;
  textMap[value] = text;
  return textMap;
}, {});
exports.textMap = textMap;

class VoteThresholdParam extends _react.default.PureComponent {
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
    const defaultValue = value instanceof _types.VoteThreshold ? value.toNumber() : (0, _util.bnToBn)(value).toNumber();
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

exports.default = VoteThresholdParam;