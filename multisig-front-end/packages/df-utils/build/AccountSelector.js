"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("@polkadot/ui-app/index");

var _index2 = require("@polkadot/ui-reactive/index");

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
      label
    } = this.props;
    const {
      accountId
    } = this.state;
    return _react.default.createElement("section", null, _react.default.createElement(_index.InputAddress, {
      label: label || 'My account',
      onChange: this.onChange,
      type: "account"
    }), _react.default.createElement(_index.Labelled, null, _react.default.createElement(_index.Bubble, {
      label: "Balance"
    }, _react.default.createElement(_index2.Balance, {
      params: [accountId]
    })), _react.default.createElement(_index.Bubble, {
      label: "Transactions"
    }, _react.default.createElement(_index2.Nonce, {
      params: [accountId]
    })), _react.default.createElement(_index.Bubble, {
      icon: "address card",
      label: "Index"
    }, _react.default.createElement(_index2.AccountIndex, {
      value: accountId
    }))));
  }

}

exports.default = AccountSelector;