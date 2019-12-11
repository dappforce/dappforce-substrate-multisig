"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

var _AccountSelector = _interopRequireDefault(require("./AccountSelector"));

var _SummaryBar = _interopRequireDefault(require("./SummaryBar"));

var _Transfer = _interopRequireDefault(require("./Transfer"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// some types, AppProps for the app and I18nProps to indicate
// translatable strings. Generally the latter is quite "light",
// `t` is inject into props (see the HOC export) and `t('any text')
// does the translation
// external imports (including those found in the packages/*
// of this repo)
// our app-specific styles
// local imports and components
class App extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onAccountChange = accountId => {
      this.setState({
        accountId
      });
    };
  }

  render() {
    const {
      accountId
    } = this.state;
    return (// in all apps, the main wrapper is setup to allow the padding
      // and margins inside the application. (Just from a consistent pov)
      _react.default.createElement("main", null, _react.default.createElement(_SummaryBar.default, null), _react.default.createElement(_AccountSelector.default, {
        onChange: this.onAccountChange
      }), _react.default.createElement(_Transfer.default, {
        accountId: accountId
      }))
    );
  }

}

var _default = (0, _translate.default)(App);

exports.default = _default;