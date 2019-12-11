"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Signer = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _uiApi = require("@polkadot/ui-api");

var _accounts = _interopRequireDefault(require("@polkadot/ui-keyring/observable/accounts"));

var _util = require("@polkadot/util");

var _logger = require("@polkadot/util/logger");

var _Transaction = _interopRequireDefault(require("./Transaction"));

var _Unlock = _interopRequireDefault(require("./Unlock"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Signer extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isSendable: false,
      password: '',
      unlockError: null
    };

    this.onChangePassword = password => {
      this.setState({
        password,
        unlockError: null
      });
    };

    this.onKeyDown = async event => {
      if (event.key === 'Enter') {
        await this.onSend();
      }
    };

    this.onCancel = () => {
      const {
        queueSetTxStatus
      } = this.props;
      const {
        currentItem
      } = this.state; // This should never be executed

      if (!currentItem) {
        return;
      }

      const {
        id,
        signerCb,
        txCancelledCb
      } = currentItem;
      queueSetTxStatus(id, 'cancelled');

      if ((0, _util.isFunction)(signerCb)) {
        signerCb(id, false);
      }

      if ((0, _util.isFunction)(txCancelledCb)) {
        txCancelledCb();
      }
    };

    this.onSend = async () => {
      const {
        currentItem,
        password
      } = this.state; // This should never be executed

      if (!currentItem) {
        return;
      }

      const res = this.sendExtrinsic(currentItem, password);
      const {
        txSentCb
      } = currentItem;

      if ((0, _util.isFunction)(txSentCb)) {
        txSentCb();
      }

      return res;
    };

    this.sendRpc = async (_ref) => {
      let {
        id,
        rpc,
        values = []
      } = _ref;

      if (!rpc) {
        return;
      }

      const {
        queueSetTxStatus
      } = this.props;
      queueSetTxStatus(id, 'sending');
      const {
        error,
        result,
        status
      } = await this.submitRpc(rpc, values);
      queueSetTxStatus(id, status, result, error);
    };
  }

  static getDerivedStateFromProps(_ref2, _ref3) {
    let {
      allAccounts,
      queue
    } = _ref2;
    let {
      currentItem,
      password,
      unlockError
    } = _ref3;
    const nextItem = queue.find((_ref4) => {
      let {
        status
      } = _ref4;
      return status === 'queued';
    });
    const isSame = !!nextItem && !!currentItem && (!nextItem.accountId && !currentItem.accountId || (nextItem.accountId && nextItem.accountId.toString()) === (currentItem.accountId && currentItem.accountId.toString()));
    let isSendable = !!nextItem && !!nextItem.isUnsigned;

    if (!isSendable && nextItem && nextItem.accountId && allAccounts) {
      try {
        const pair = _uiKeyring.default.getPair(nextItem.accountId);

        isSendable = !!pair && !!allAccounts[nextItem.accountId];
      } catch (error) {// swallow
      }
    }

    return {
      currentItem: nextItem,
      isSendable,
      password: isSame ? password : '',
      unlockError: isSame ? unlockError : null
    };
  }

  async componentDidUpdate() {
    const {
      currentItem
    } = this.state;

    if (currentItem && currentItem.status === 'queued' && !currentItem.extrinsic) {
      return this.sendRpc(currentItem);
    }
  }

  render() {
    const {
      currentItem
    } = this.state;

    if (!currentItem) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal, {
      className: "ui--signer-Signer",
      dimmer: "inverted",
      open: true
    }, this.renderContent(), this.renderButtons());
  }

  renderButtons() {
    const {
      t
    } = this.props;
    const {
      currentItem,
      isSendable
    } = this.state;

    if (!currentItem) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: this.onCancel,
      tabIndex: 3,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      className: "ui--signer-Signer-Submit",
      isDisabled: !isSendable,
      isPrimary: true,
      onClick: this.onSend,
      tabIndex: 2,
      label: currentItem.isUnsigned ? t('Submit (no signature)') : t('Sign and Submit')
    })));
  }

  renderContent() {
    const {
      currentItem,
      isSendable
    } = this.state;

    if (!currentItem) {
      return null;
    }

    return _react.default.createElement(_Transaction.default, {
      isSendable: isSendable,
      value: currentItem
    }, this.renderUnlock());
  }

  renderUnlock() {
    const {
      currentItem,
      isSendable,
      password,
      unlockError
    } = this.state;

    if (!isSendable || !currentItem || currentItem.isUnsigned) {
      return null;
    }

    return _react.default.createElement(_Unlock.default, {
      autoFocus: true,
      error: unlockError || undefined,
      onChange: this.onChangePassword,
      onKeyDown: this.onKeyDown,
      password: password,
      value: currentItem.accountId,
      tabIndex: 1
    });
  }

  unlockAccount(accountId, password) {
    let publicKey;

    try {
      publicKey = _uiKeyring.default.decodeAddress(accountId);
    } catch (error) {
      console.error(error);
      return 'unable to decode address';
    }

    const pair = _uiKeyring.default.getPair(publicKey);

    if (!pair.isLocked()) {
      return null;
    }

    try {
      pair.decodePkcs8(password);
    } catch (error) {
      console.error(error);
      return error.message;
    }

    return null;
  }

  async sendExtrinsic(queueTx, password) {
    const {
      accountId,
      extrinsic,
      id,
      signerOptions,
      isUnsigned
    } = queueTx;
    (0, _util.assert)(extrinsic, 'Expected an extrinsic to be supplied to sendExtrinsic');

    if (!isUnsigned) {
      (0, _util.assert)(accountId, 'Expected an accountId with signed transactions');
      const unlockError = this.unlockAccount(accountId, password);

      if (unlockError) {
        this.setState({
          unlockError
        });
        return;
      }
    }

    const submittable = extrinsic;
    const {
      queueSetTxStatus
    } = this.props;
    queueSetTxStatus(id, 'sending');

    if (isUnsigned) {
      return this.makeExtrinsicCall(submittable, queueTx, submittable.send);
    } else if (signerOptions) {
      return this.makeExtrinsicSignature(submittable, queueTx, _uiKeyring.default.getPair(accountId));
    }

    return this.makeExtrinsicCall(submittable, queueTx, submittable.signAndSend, _uiKeyring.default.getPair(accountId));
  }

  async submitRpc(_ref5, values) {
    let {
      method,
      section
    } = _ref5;
    const {
      api
    } = this.props;

    try {
      const result = await api.rpc[section][method](...values);
      console.log('submitRpc: result ::', (0, _logger.format)(result));
      return {
        result,
        status: 'sent'
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        status: 'error'
      };
    }
  }

  async makeExtrinsicCall(extrinsic, _ref6, extrinsicCall) {
    let {
      id,
      txFailedCb,
      txSuccessCb,
      txUpdateCb
    } = _ref6;
    const {
      queueSetTxStatus
    } = this.props;
    console.log('makeExtrinsicCall: extrinsic ::', extrinsic.toHex());

    try {
      for (var _len = arguments.length, _params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        _params[_key - 3] = arguments[_key];
      }

      const unsubscribe = await extrinsicCall.apply(extrinsic, [..._params, async result => {
        if (!result || !result.status) {
          return;
        }

        const status = result.status.type.toLowerCase();
        console.log('makeExtrinsicCall: updated status ::', JSON.stringify(result));
        queueSetTxStatus(id, status, result);

        if ((0, _util.isFunction)(txUpdateCb)) {
          txUpdateCb(result);
        }

        if (result.status.isFinalized) {
          unsubscribe();
          result.events.filter((_ref7) => {
            let {
              event: {
                section
              }
            } = _ref7;
            return section === 'system';
          }).forEach((_ref8) => {
            let {
              event: {
                method
              }
            } = _ref8;

            if ((0, _util.isFunction)(txFailedCb) && method === 'ExtrinsicFailed') {
              txFailedCb(result);
            } else if ((0, _util.isFunction)(txSuccessCb) && method === 'ExtrinsicSuccess') {
              txSuccessCb(result);
            }
          });
        }
      }]);
    } catch (error) {
      console.error('makeExtrinsicCall: error:', error.message);
      queueSetTxStatus(id, 'error', {}, error);

      if ((0, _util.isFunction)(txFailedCb)) {
        txFailedCb(error);
      }
    }
  }

  async makeExtrinsicSignature(extrinsic, _ref9, pair) {
    let {
      id,
      signerCb,
      signerOptions
    } = _ref9;
    console.log('makeExtrinsicSignature: extrinsic ::', extrinsic.toHex());
    extrinsic.sign(pair, signerOptions || {});

    if ((0, _util.isFunction)(signerCb)) {
      signerCb(id, true);
    }
  }

}

exports.Signer = Signer;

var _default = (0, _uiApi.withMulti)(Signer, _translate.default, _uiApi.withApi, (0, _uiApi.withObservable)(_accounts.default.subject, {
  propName: 'allAccounts'
}));

exports.default = _default;