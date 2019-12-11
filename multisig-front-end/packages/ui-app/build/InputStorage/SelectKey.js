"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _util = require("../util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class SelectKey extends _react.default.PureComponent {
  render() {
    const {
      api,
      className,
      isError,
      onChange,
      options,
      style,
      value
    } = this.props;

    if (!options.length) {
      return null;
    }

    const transform = method => api.query[value.section][method];

    return _react.default.createElement(_Dropdown.default, {
      className: (0, _util.classes)('ui--DropdownLinked-Items', className),
      isError: isError,
      onChange: onChange,
      options: options,
      style: style,
      transform: transform,
      value: value.method,
      withLabel: false
    });
  }

}

var _default = (0, _uiApi.withApi)(SelectKey);

exports.default = _default;