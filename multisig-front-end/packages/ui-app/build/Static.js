"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Labelled = _interopRequireDefault(require("./Labelled"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Static extends _react.default.PureComponent {
  render() {
    const {
      className,
      children,
      defaultValue,
      help,
      isHidden,
      label,
      style,
      value,
      withLabel
    } = this.props;
    return _react.default.createElement(_Labelled.default, {
      className: className,
      help: help,
      isHidden: isHidden,
      label: label,
      style: style,
      withLabel: withLabel
    }, _react.default.createElement("div", {
      className: "ui--Static ui dropdown selection disabled"
    }, value || defaultValue, children));
  }

}

exports.default = Static;