"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Extrinsic = _interopRequireDefault(require("../Extrinsic"));

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ExtrinsicDisplay extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = method => {
      const {
        onChange
      } = this.props;
      onChange && onChange({
        isValid: !!method,
        value: method
      });
    };
  }

  render() {
    const {
      className,
      defaultValue,
      isDisabled,
      isError,
      isPrivate,
      label,
      style,
      t,
      withLabel
    } = this.props;
    return _react.default.createElement(_Extrinsic.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: isPrivate,
      label: t('{{label}} (extrinsic)', {
        replace: {
          label
        }
      }),
      onChange: this.onChange,
      style: style,
      withLabel: withLabel
    });
  }

}

var _default = (0, _translate.default)(ExtrinsicDisplay);

exports.default = _default;