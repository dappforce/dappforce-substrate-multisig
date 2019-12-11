"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _Tabs = _interopRequireDefault(require("@polkadot/ui-app/Tabs"));

var _accounts = _interopRequireDefault(require("@polkadot/ui-keyring/observable/accounts"));

var _uiApi = require("@polkadot/ui-api");

var _Hash = _interopRequireDefault(require("./Hash"));

var _Rpc = _interopRequireDefault(require("./Rpc"));

var _Sign = _interopRequireDefault(require("./Sign"));

var _Verify = _interopRequireDefault(require("./Verify"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ToolboxApp extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    const {
      t
    } = this.props;
    this.state = {
      tabs: [{
        name: 'rpc',
        text: t('RPC calls')
      }, {
        name: 'hash',
        text: t('Hash data')
      }, {
        name: 'sign',
        text: t('Sign message')
      }, {
        name: 'verify',
        text: t('Verify signature')
      }]
    };
  }

  render() {
    const {
      allAccounts,
      basePath
    } = this.props;
    const {
      tabs
    } = this.state;
    const hasAccounts = allAccounts && Object.keys(allAccounts).length !== 0;
    const filteredTabs = hasAccounts ? tabs : tabs.filter((_ref) => {
      let {
        name
      } = _ref;
      return !['sign', 'verify'].includes(name);
    });
    return _react.default.createElement("main", {
      className: "toolbox--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_Tabs.default, {
      basePath: basePath,
      items: filteredTabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/hash"),
      component: _Hash.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/sign"),
      component: _Sign.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/verify"),
      component: _Verify.default
    }), _react.default.createElement(_reactRouter.Route, {
      component: _Rpc.default
    })));
  }

}

var _default = (0, _uiApi.withMulti)(ToolboxApp, _translate.default, (0, _uiApi.withObservable)(_accounts.default.subject, {
  propName: 'allAccounts'
}));

exports.default = _default;