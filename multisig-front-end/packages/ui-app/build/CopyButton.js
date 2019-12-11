"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _util = require("./util");

var _Button = _interopRequireDefault(require("./Button"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class CopyButton extends _react.default.PureComponent {
  render() {
    const {
      className,
      icon = 'copy',
      isCircular = true,
      isPrimary = true,
      size = 'tiny',
      style,
      value
    } = this.props;
    return _react.default.createElement(_reactCopyToClipboard.default, {
      text: value
    }, _react.default.createElement(_Button.default, {
      className: (0, _util.classes)('ui--CopyButton', className),
      icon: icon,
      isCircular: isCircular,
      isPrimary: isPrimary,
      size: size,
      style: style
    }));
  }

}

exports.default = CopyButton;