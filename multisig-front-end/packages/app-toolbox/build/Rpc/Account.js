"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiReactive = require("@polkadot/ui-reactive");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Account extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeAccount = accountId => {
      const {
        onChange
      } = this.props;
      this.setState({
        accountId
      }, () => onChange(accountId, this.state.accountNonce));
    };

    this.onChangeNonce = _accountNonce => {
      const {
        onChange
      } = this.props;
      const accountNonce = _accountNonce || new _bn.default(0);
      this.setState({
        accountNonce
      }, () => onChange(this.state.accountId, accountNonce));
    };

    this.state = {
      accountId: props.defaultValue,
      accountNonce: new _bn.default(0)
    };
  }

  render() {
    const {
      defaultValue,
      isError,
      t
    } = this.props;
    return _react.default.createElement("div", {
      className: "rpc--Account ui--row"
    }, _react.default.createElement("div", {
      className: "large"
    }, _react.default.createElement(_uiApp.InputAddress, {
      defaultValue: defaultValue,
      isError: isError,
      label: t('sign data from account'),
      onChange: this.onChangeAccount,
      placeholder: "0x...",
      type: "account"
    })), this.renderNonce());
  }

  renderNonce() {
    const {
      t
    } = this.props;
    const {
      accountId
    } = this.state;

    if (!accountId) {
      return null;
    }

    return _react.default.createElement(_uiApp.Labelled, {
      className: "small",
      label: t('with an index of')
    }, _react.default.createElement(_uiReactive.Nonce, {
      className: "ui disabled dropdown selection",
      callOnResult: this.onChangeNonce,
      params: accountId
    }));
  }

}

var _default = (0, _translate.default)(Account);

exports.default = _default;