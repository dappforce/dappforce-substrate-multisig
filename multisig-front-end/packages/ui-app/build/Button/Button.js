"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/elements/Button/Button"));

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Button extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      floated,
      icon,
      isBasic = false,
      isCircular = false,
      isDisabled = false,
      isNegative = false,
      isPositive = false,
      isPrimary = false,
      label,
      onClick,
      type = 'button',
      size,
      style,
      tabIndex
    } = this.props;
    const props = {
      basic: isBasic,
      circular: isCircular,
      className,
      disabled: isDisabled,
      floated,
      icon,
      negative: isNegative,
      onClick,
      positive: isPositive,
      primary: isPrimary,
      type,
      size,
      secondary: !isBasic && !(isPositive || isPrimary || isNegative),
      style,
      tabIndex
    };
    return (0, _util.isUndefined)(label) && (0, _util.isUndefined)(children) ? _react.default.createElement(_Button.default, props) : _react.default.createElement(_Button.default, props, label, children);
  }

}

exports.default = Button;