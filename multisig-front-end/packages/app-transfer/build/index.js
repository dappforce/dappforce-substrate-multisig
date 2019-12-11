"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

require("./index.css");

var _Transfer = _interopRequireDefault(require("./Transfer"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-transfer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class App extends _react.default.PureComponent {
  render() {
    const {
      basePath,
      t
    } = this.props;
    return _react.default.createElement("main", {
      className: "transfer--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      items: [{
        name: 'create',
        text: t('Balance transfer')
      }]
    })), _react.default.createElement(_Transfer.default, null));
  }

}

var _default = (0, _translate.default)(App);

exports.default = _default;