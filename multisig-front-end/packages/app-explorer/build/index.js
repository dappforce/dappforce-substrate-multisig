"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dfSettings = _interopRequireDefault(require("@polkadot/df-settings/"));

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _Tabs = _interopRequireDefault(require("@polkadot/ui-app/Tabs"));

var _translate = _interopRequireDefault(require("./translate"));

var _BlockQuery = _interopRequireDefault(require("./BlockQuery"));

var _Main = _interopRequireDefault(require("./Main"));

var _NodeInfo = _interopRequireDefault(require("./NodeInfo"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ExplorerApp extends _react.default.Component {
  constructor(props) {
    super(props);
    const {
      t
    } = this.props;
    this.state = {
      items: [{
        name: 'chain',
        text: t('Chain info')
      }, _dfSettings.default.isBasicMode ? null : {
        hasParams: true,
        name: 'query',
        text: t('Block details')
      }, {
        name: 'node',
        text: t('Node info')
      }].filter(x => x !== null)
    };
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      items
    } = this.state;
    return _react.default.createElement("main", {
      className: "explorer--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_Tabs.default, {
      basePath: basePath,
      items: items
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/query/:value"),
      component: _BlockQuery.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/query"),
      component: _BlockQuery.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/node"),
      component: _NodeInfo.default
    }), _react.default.createElement(_reactRouter.Route, {
      component: _Main.default
    })));
  }

}

var _default = (0, _translate.default)(ExplorerApp);

exports.default = _default;