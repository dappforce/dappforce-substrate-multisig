"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _util = require("../util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class SelectSection extends _react.default.PureComponent {
  render() {
    const {
      className,
      defaultValue,
      isError,
      onChange,
      options,
      style,
      value
    } = this.props;
    return _react.default.createElement(_Dropdown.default, {
      className: (0, _util.classes)('ui--DropdownLinked-Sections', className),
      defaultValue: defaultValue,
      isError: isError,
      onChange: onChange,
      options: options,
      style: style,
      value: value.section,
      withLabel: false
    });
  }

}

exports.default = SelectSection;