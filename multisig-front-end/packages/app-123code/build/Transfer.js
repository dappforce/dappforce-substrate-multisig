"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Transfer extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onChangeAmount = amount => {
      this.setState({
        amount
      });
    };

    this.onChangeRecipient = recipientId => {
      this.setState({
        recipientId
      });
    };
  }

  render() {
    const {
      accountId
    } = this.props;
    const {
      amount,
      recipientId
    } = this.state;
    return _react.default.createElement("section", null, _react.default.createElement("h1", null, "transfer"), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "large"
    }, _react.default.createElement(_uiApp.InputAddress, {
      label: "recipient address for this transfer",
      onChange: this.onChangeRecipient,
      type: "all"
    }), _react.default.createElement(_uiApp.InputBalance, {
      label: "amount to transfer",
      onChange: this.onChangeAmount
    }), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      label: "make transfer",
      params: [recipientId, amount],
      tx: "balances.transfer"
    }))), _react.default.createElement("div", {
      className: "template--summary small"
    }, "Make a transfer from any account you control to another account. Transfer fees and per-transaction fees apply and will be calculated upon submission.")));
  }

}

exports.default = Transfer;