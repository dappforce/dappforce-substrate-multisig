"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _uiApp = require("@polkadot/ui-app");

var _Tabs = _interopRequireDefault(require("@polkadot/ui-app/Tabs"));

var _uiApi = require("@polkadot/ui-api");

var _accounts = _interopRequireDefault(require("@polkadot/ui-keyring/observable/accounts"));

require("./index.css");

var _basic = _interopRequireDefault(require("./md/basic.md"));

var _Accounts = _interopRequireDefault(require("./Accounts"));

var _Overview = _interopRequireDefault(require("./Overview"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class App extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;
    const {
      t
    } = props;
    this.state = {
      controllers: [],
      recentlyOffline: {},
      stashes: [],
      tabs: [{
        name: 'overview',
        text: t('Validator Overview')
      }, {
        name: 'actions',
        text: t('Validator Staking')
      }],
      validators: []
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      staking_controllers = [[], []],
      session_validators = [],
      staking_recentlyOffline = []
    } = _ref;
    return {
      controllers: staking_controllers[1].filter(optId => optId.isSome).map(accountId => accountId.unwrap().toString()),
      stashes: staking_controllers[0].map(accountId => accountId.toString()),
      validators: session_validators.map(authorityId => authorityId.toString()),
      recentlyOffline: staking_recentlyOffline.reduce((result, _ref2) => {
        let [accountId, blockNumber, count] = _ref2;
        const account = accountId.toString();

        if (!result[account]) {
          result[account] = [];
        }

        result[account].push({
          blockNumber,
          count
        });
        return result;
      }, {})
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
    const hidden = !allAccounts || Object.keys(allAccounts).length === 0 ? ['actions'] : [];
    return _react.default.createElement("main", {
      className: "staking--App"
    }, _react.default.createElement(_uiApp.HelpOverlay, {
      md: _basic.default
    }), _react.default.createElement("header", null, _react.default.createElement(_Tabs.default, {
      basePath: basePath,
      hidden: hidden,
      items: tabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/actions"),
      render: this.renderComponent(_Accounts.default)
    }), _react.default.createElement(_reactRouter.Route, {
      render: this.renderComponent(_Overview.default)
    })));
  }

  renderComponent(Component) {
    return () => {
      const {
        controllers,
        recentlyOffline,
        stashes,
        validators
      } = this.state;
      const {
        balances = {}
      } = this.props;
      return _react.default.createElement(Component, {
        balances: balances,
        controllers: controllers,
        recentlyOffline: recentlyOffline,
        stashes: stashes,
        validators: validators
      });
    };
  }

}

var _default = (0, _uiApi.withMulti)(App, _translate.default, (0, _uiApi.withCalls)('derive.staking.controllers', 'query.session.validators', 'query.staking.recentlyOffline'), (0, _uiApi.withObservable)(_accounts.default.subject, {
  propName: 'allAccounts'
}));

exports.default = _default;