"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Modal = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/modules/Modal/Modal"));

var _index = _interopRequireDefault(require("@polkadot/df-settings/index"));

var _util = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Modal extends _react.default.PureComponent {
  render() {
    const {
      className
    } = this.props;
    return _react.default.createElement(_Modal.default, (0, _extends2.default)({}, this.props, {
      className: (0, _util.classes)("theme--".concat(_index.default.uiTheme), 'ui--Modal', className)
    }));
  }

}

exports.default = Modal;
Modal.Actions = _Modal.default.Actions;
Modal.Content = _Modal.default.Content;
Modal.Header = _Modal.default.Header;
Modal.Description = _Modal.default.Description;