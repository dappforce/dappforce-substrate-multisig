"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _Context = require("@polkadot/ui-app/Status/Context");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _Checks = _interopRequireDefault(require("@polkadot/ui-signer/Checks"));

var _Submit = _interopRequireDefault(require("./Submit"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-transfer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const ZERO = new _bn.default(0);

class Transfer extends _react.default.PureComponent {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;
    this.state = {
      accountId: null,
      amount: ZERO,
      extrinsic: null,
      hasAvailable: true,
      recipientId: null
    };

    this.onChangeFrom = accountId => {
      this.nextState({
        accountId
      });
    };

    this.onChangeAmount = function () {
      let amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _bn.default(0);

      _this.nextState({
        amount
      });
    };

    this.onChangeTo = recipientId => {
      this.nextState({
        recipientId
      });
    };

    this.onChangeFees = hasAvailable => {
      this.setState({
        hasAvailable
      });
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      accountId,
      extrinsic,
      recipientId,
      hasAvailable
    } = this.state;
    return _react.default.createElement("div", {
      className: "transfer--Transfer"
    }, _react.default.createElement("div", {
      className: "transfer--Transfer-info"
    }, this.renderAddress(accountId, 'medium'), _react.default.createElement("div", {
      className: "transfer--Transfer-data"
    }, _react.default.createElement(_uiApp.InputAddress, {
      label: t('from my source account'),
      onChange: this.onChangeFrom,
      type: "account"
    }), _react.default.createElement(_uiApp.InputAddress, {
      label: t('to the recipient address'),
      onChange: this.onChangeTo,
      type: "all"
    }), _react.default.createElement(_uiApp.InputBalance, {
      autoFocus: true,
      isError: !hasAvailable,
      label: t('transfer a value of'),
      onChange: this.onChangeAmount
    }), _react.default.createElement(_Checks.default, {
      accountId: accountId,
      extrinsic: extrinsic,
      isSendable: true,
      onChange: this.onChangeFees
    }), _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        queueExtrinsic
      } = _ref;
      return _react.default.createElement(_Submit.default, {
        accountId: accountId,
        isDisabled: !hasAvailable,
        extrinsic: extrinsic,
        queueExtrinsic: queueExtrinsic
      });
    })), this.renderAddress(recipientId, 'large')));
  }

  renderAddress(accountId, media) {
    if (!accountId) {
      return null;
    }

    try {
      _uiKeyring.default.decodeAddress(accountId);
    } catch (err) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "transfer--Transfer-address ui--media-".concat(media)
    }, _react.default.createElement(_uiApp.AddressSummary, {
      value: accountId,
      withCopy: false
    }));
  }

  nextState(newState) {
    this.setState(prevState => {
      const {
        api
      } = this.props;
      const {
        accountId = prevState.accountId,
        amount = prevState.amount,
        recipientId = prevState.recipientId,
        hasAvailable = prevState.hasAvailable
      } = newState;
      const extrinsic = accountId && recipientId ? api.tx.balances.transfer(recipientId, amount) : null;
      return {
        accountId,
        amount,
        extrinsic,
        hasAvailable,
        recipientId
      };
    });
  }

}

var _default = (0, _uiApi.withMulti)(Transfer, _translate.default, _uiApi.withApi);

exports.default = _default;