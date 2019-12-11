"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _translate = _interopRequireDefault(require("./translate"));

var _Tabs = _interopRequireDefault(require("@polkadot/ui-app/Tabs"));

var _CreateWallet = _interopRequireDefault(require("./CreateWallet"));

var _uiApi = require("@polkadot/ui-api");

var _CreateTransaction = _interopRequireDefault(require("./CreateTransaction"));

var _ViewWalletById = _interopRequireDefault(require("./ViewWalletById"));

var _ListWallets = _interopRequireDefault(require("./ListWallets"));

class App extends _react.PureComponent {
  buildTabs() {
    const {
      t
    } = this.props;
    return [{
      name: 'wallets',
      text: t('My Wallets')
    }];
  }

  render() {
    const {
      basePath
    } = this.props;
    const tabs = this.buildTabs();
    return _react.default.createElement("main", {
      className: "blogs--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_Tabs.default, {
      basePath: basePath,
      items: tabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/:id/transfer"),
      component: _CreateTransaction.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/new"),
      component: _CreateWallet.default
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/:id"),
      component: _ViewWalletById.default
    }), _react.default.createElement(_reactRouter.Route, {
      component: _ListWallets.default
    })));
  }

}

var _default = (0, _uiApi.withMulti)(App, _translate.default);

exports.default = _default;