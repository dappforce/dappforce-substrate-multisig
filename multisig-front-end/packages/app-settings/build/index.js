"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _index = require("@polkadot/ui-app/index");

require("./index.css");

var _translate = _interopRequireDefault(require("./translate"));

var _Developer = _interopRequireDefault(require("./Developer"));

var _General = _interopRequireDefault(require("./General"));

// Copyright 2017-2019 @polkadot/app-settings authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class App extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    this.DeveloperWithStatus = () => {
      return _react.default.createElement(_Developer.default, (0, _extends2.default)({
        onStatusChange: () => this.props.onStatusChange
      }, this.props));
    };

    const {
      t
    } = props;
    this.state = {
      tabs: [{
        name: 'general',
        text: t('General')
      }, {
        name: 'developer',
        text: t('Developer')
      }]
    };
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      tabs
    } = this.state;
    return _react.default.createElement("main", {
      className: "settings--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_index.Tabs, {
      basePath: basePath,
      items: tabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/developer"),
      render: this.DeveloperWithStatus
    }), _react.default.createElement(_reactRouter.Route, {
      component: _General.default
    })));
  }

}

var _default = (0, _translate.default)(App);

exports.default = _default;