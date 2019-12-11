"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _Proposals = _interopRequireDefault(require("./Proposals"));

var _Referendums = _interopRequireDefault(require("./Referendums"));

var _Summary = _interopRequireDefault(require("./Summary"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class App extends _react.default.PureComponent {
  render() {
    const {
      basePath,
      t
    } = this.props;
    return _react.default.createElement("main", {
      className: "democracy--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      items: [{
        name: 'overview',
        text: t('Democracy overview')
      }]
    })), _react.default.createElement(_Summary.default, null), _react.default.createElement(_Referendums.default, null), _react.default.createElement(_Proposals.default, null));
  }

}

var _default = (0, _translate.default)(App);

exports.default = _default;