"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _uiReactive = require("@polkadot/ui-reactive");

var _Balance = _interopRequireDefault(require("./Balance"));

var _Extrinsic = _interopRequireDefault(require("./Extrinsic"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Selection extends _react.default.PureComponent {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;
    this.state = {
      isValid: false
    };

    this.onChangeExtrinsic = function () {
      let method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.nextState({
        method
      });
    };

    this.onChangeNonce = function () {
      let accountNonce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _bn.default(0);

      _this.nextState({
        accountNonce
      });
    };

    this.onChangeSender = accountId => {
      this.nextState({
        accountId,
        accountNonce: new _bn.default(0)
      });
    };

    this.onQueueExtrinsic = () => {
      this.onQueue(false);
    };

    this.onQueueInherent = () => {
      this.onQueue(true);
    };
  }

  render() {
    const {
      apiDefaultTx,
      api,
      t
    } = this.props;
    const {
      isValid,
      accountId
    } = this.state;

    const defaultExtrinsic = (() => {
      try {
        return api.tx.balances.transfer;
      } catch (error) {
        return apiDefaultTx;
      }
    })();

    return _react.default.createElement("div", {
      className: "extrinsics--Selection"
    }, _react.default.createElement(_uiApp.InputAddress, {
      label: t('using the selected account'),
      onChange: this.onChangeSender,
      type: "account"
    }), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_Balance.default, {
      className: "medium",
      label: t('with an account balance'),
      params: accountId
    }), _react.default.createElement(_uiApp.Labelled, {
      className: "medium",
      label: t('with a transaction nonce')
    }, _react.default.createElement(_uiReactive.Nonce, {
      className: "ui disabled dropdown selection",
      callOnResult: this.onChangeNonce,
      params: accountId
    }))), _react.default.createElement("br", null), _react.default.createElement(_Extrinsic.default, {
      defaultValue: defaultExtrinsic,
      label: t('submit the following extrinsic'),
      onChange: this.onChangeExtrinsic
    }), _react.default.createElement("br", null), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      onClick: this.onQueueInherent,
      label: t('Submit Inherent')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onQueueExtrinsic,
      label: t('Submit Transaction')
    })));
  }

  nextState(newState) {
    this.setState(prevState => {
      const {
        method = prevState.method,
        accountNonce = prevState.accountNonce,
        accountId = prevState.accountId
      } = newState;
      const isValid = !!(accountId && accountId.length && method);
      return {
        method,
        isValid,
        accountNonce,
        accountId
      };
    });
  }

  onQueue(isUnsigned) {
    const {
      api,
      queueExtrinsic
    } = this.props;
    const {
      method,
      isValid,
      accountId
    } = this.state;

    if (!isValid || !method) {
      return;
    }

    const fn = _types.Method.findFunction(method.callIndex);

    const extrinsic = api.tx[fn.section][fn.method](...method.args);
    queueExtrinsic({
      accountId: isUnsigned ? undefined : accountId,
      extrinsic,
      isUnsigned
    });
  }

}

var _default = (0, _uiApi.withMulti)(Selection, _translate.default, _uiApi.withApi);

exports.default = _default;