"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/ui-app/util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Bare extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      style
    } = this.props;
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--row', className),
      style: style
    }, children);
  }

}

exports.default = Bare;