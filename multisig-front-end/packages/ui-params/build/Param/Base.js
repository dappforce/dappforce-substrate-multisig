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
class Base extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      isDisabled,
      label,
      size = 'medium',
      style,
      withLabel
    } = this.props;
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, _react.default.createElement(_uiApp.Labelled, {
      className: isDisabled ? 'full' : size,
      label: label,
      withLabel: withLabel
    }, children));
  }

}

exports.default = Base;