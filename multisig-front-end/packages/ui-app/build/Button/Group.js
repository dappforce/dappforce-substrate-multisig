"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/elements/Button/Button"));

var _util = require("../util");

var _Divider = _interopRequireDefault(require("./Divider"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ButtonGroup extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      isBasic = false,
      isCentered = false,
      style
    } = this.props;
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--Button-Group', isCentered ? 'centered' : '', className),
      style: style
    }, _react.default.createElement(_Button.default.Group, {
      basic: isBasic
    }, isBasic ? null : _react.default.createElement(_Divider.default, {
      style: {
        padding: '0em'
      }
    }), children));
  }

}

ButtonGroup.Divider = _Divider.default;
var _default = ButtonGroup;
exports.default = _default;