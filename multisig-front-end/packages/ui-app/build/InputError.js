"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Label = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/elements/Label/Label"));

var _util = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const defaultLabel = _react.default.createElement("div", null, "\xA0");

class InputError extends _react.default.PureComponent {
  render() {
    const {
      className,
      label = defaultLabel,
      style
    } = this.props;
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--InputError', className),
      style: style
    }, _react.default.createElement(_Label.default, {
      color: "red",
      pointing: "left"
    }, label));
  }

}

exports.default = InputError;