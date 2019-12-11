"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CopyButton = _interopRequireDefault(require("./CopyButton"));

var _Labelled = _interopRequireDefault(require("./Labelled"));

var _util = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Output extends _react.default.PureComponent {
  render() {
    const {
      className,
      children,
      help,
      isError = false,
      isHidden,
      label,
      style,
      value,
      withCopy = false,
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
      className: (0, _util.classes)('ui--output', isError && 'error')
    }, value, children, withCopy ? _react.default.createElement(_CopyButton.default, {
      className: "ui--output-button",
      value: value
    }) : null));
  }

}

exports.default = Output;