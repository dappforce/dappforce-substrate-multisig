"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiReactive = require("@polkadot/ui-reactive");

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class AccountSelector extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onChange = accountId => {
      const {
        onChange
      } = this.props;
      this.setState({
        accountId
      }, () => onChange(accountId));
    };
  }

  render() {
    const {
      accountId
    } = this.state;
    return _react.default.createElement("section", {
      className: "template--AccountSelector ui--row"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      label: "my default account",
      onChange: this.onChange,
      type: "account"
    }), _react.default.createElement("div", {
      className: "medium"
    }, _react.default.createElement(_uiApp.Bubble, {
      color: "teal",
      icon: "address card",
      label: "index"
    }, _react.default.createElement(_uiReactive.AccountIndex, {
      params: accountId
    })), _react.default.createElement(_uiApp.Bubble, {
      color: "yellow",
      icon: "adjust",
      label: "balance"
    }, _react.default.createElement(_uiReactive.Balance, {
      params: accountId
    })), _react.default.createElement(_uiApp.Bubble, {
      color: "yellow",
      icon: "target",
      label: "transactions"
    }, _react.default.createElement(_uiReactive.Nonce, {
      params: accountId
    }))));
  }

}

exports.default = AccountSelector;