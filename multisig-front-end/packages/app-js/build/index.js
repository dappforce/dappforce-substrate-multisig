"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

require("./index.css");

var _Playground = _interopRequireDefault(require("./Playground"));

// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class AppJs extends _react.default.PureComponent {
  render() {
    const {
      basePath
    } = this.props;
    return _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/share/:base64"),
      component: _Playground.default
    }), _react.default.createElement(_reactRouter.Route, {
      component: _Playground.default
    }));
  }

}

var _default = AppJs;
exports.default = _default;