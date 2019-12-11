"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _defaults = require("@polkadot/ui-keyring/defaults");

var _util = require("./util");

var _Button = _interopRequireDefault(require("./Button"));

var _Input = _interopRequireDefault(require("./Input"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Password extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isVisible: false
    };

    this.onToggleVisible = () => {
      this.setState({
        isVisible: !this.state.isVisible
      });
    };
  }

  render() {
    const {
      autoFocus,
      children,
      className,
      defaultValue,
      isDisabled,
      isError,
      label,
      name,
      onChange,
      onKeyDown,
      style,
      tabIndex,
      value,
      withLabel
    } = this.props;
    const {
      isVisible
    } = this.state;
    return _react.default.createElement(_Input.default, {
      autoFocus: autoFocus,
      className: (0, _util.classes)('ui--Password', className),
      defaultValue: defaultValue,
      isAction: true,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      maxLength: _defaults.MAX_PASS_LEN,
      name: name,
      onChange: onChange,
      onKeyDown: onKeyDown,
      style: style,
      tabIndex: tabIndex,
      type: isVisible ? 'text' : 'password',
      value: value,
      withLabel: withLabel
    }, _react.default.createElement(_Button.default, {
      icon: isVisible ? 'hide' : 'unhide',
      isPrimary: true,
      onClick: this.onToggleVisible
    }), children);
  }

}

exports.default = Password;