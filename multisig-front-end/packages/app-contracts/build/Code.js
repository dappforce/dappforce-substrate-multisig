"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _types = require("@polkadot/types");

var _ABI = _interopRequireDefault(require("./ABI"));

var _ValidateCode = _interopRequireDefault(require("./ValidateCode"));

var _store = _interopRequireDefault(require("./store"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Deploy extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      accountId: null,
      gasLimit: new _bn.default(0),
      isAbiValid: true,
      isBusy: false,
      isCodeValid: false,
      isNew: true,
      isNameValid: false,
      isWasmValid: false
    };

    this.onAddAbi = abi => {
      this.setState({
        abi,
        isAbiValid: !!abi
      });
    };

    this.onAddWasm = (wasm, name) => {
      const isWasmValid = wasm.subarray(0, 4).toString() === '0,97,115,109'; // '\0asm'

      this.setState({
        wasm: (0, _util.compactAddLength)(wasm),
        isWasmValid
      });
      this.onChangeName(name);
    };

    this.onChangeAccount = accountId => {
      this.setState({
        accountId
      });
    };

    this.onChangeGas = gasLimit => {
      this.setState({
        gasLimit: gasLimit || new _bn.default(0)
      });
    };

    this.onChangeHash = codeHash => {
      this.setState({
        codeHash,
        isCodeValid: false
      });
    };

    this.onChangeName = name => {
      this.setState({
        name,
        isNameValid: name.length !== 0
      });
    };

    this.onValidateCode = isCodeValid => {
      this.setState({
        isCodeValid
      });
    };

    this.toggleBusy = () => {
      this.setState((_ref) => {
        let {
          isBusy
        } = _ref;
        return {
          isBusy: !isBusy
        };
      });
    };

    this.toggleNew = () => {
      this.setState((_ref2) => {
        let {
          isNew
        } = _ref2;
        return {
          abi: null,
          codeHash: null,
          isAbiValid: true,
          isCodeValid: false,
          isNameValid: false,
          name: '',
          isNew: !isNew
        };
      });
    };

    this.onSave = () => {
      const {
        abi,
        codeHash,
        name
      } = this.state;

      if (!codeHash || !name) {
        return;
      }

      _store.default.saveCode(new _types.Hash(codeHash), {
        abi,
        name
      }).catch(error => {
        console.error('Unable to save code', error);
      });

      this.redirect();
    };

    this.onSuccess = result => {
      const record = result.findRecord('contract', 'CodeStored');

      if (record) {
        const codeHash = record.event.data[0];
        this.setState((_ref3) => {
          let {
            abi,
            name
          } = _ref3;

          if (!codeHash || !name) {
            return;
          }

          _store.default.saveCode(codeHash, {
            abi,
            name
          }).catch(error => {
            console.error('Unable to save code', error);
          });

          this.redirect();
        });
      }

      this.toggleBusy();
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isNew
    } = this.state;
    return _react.default.createElement("div", {
      className: "contracts--Code"
    }, _react.default.createElement(_uiApp.Button.Group, {
      isBasic: true,
      isCentered: true
    }, _react.default.createElement(_uiApp.Button, {
      isBasic: true,
      isNegative: isNew,
      label: t('deploy new'),
      onClick: this.toggleNew
    }), _react.default.createElement(_uiApp.Button, {
      isBasic: true,
      isNegative: !isNew,
      label: t('attach existing'),
      onClick: this.toggleNew
    })), isNew ? this.renderDeploy() : this.renderExisting());
  }

  renderDeploy() {
    const {
      t
    } = this.props;
    const {
      accountId,
      gasLimit,
      isAbiValid,
      isBusy,
      isNameValid,
      isWasmValid,
      wasm
    } = this.state;
    const isValid = !isBusy && isAbiValid && isNameValid && isWasmValid && !gasLimit.isZero() && !!accountId;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.InputAddress, {
      help: t('Specify the user account to use for this deployment. And fees will be deducted from this account.'),
      label: t('deployment account'),
      onChange: this.onChangeAccount,
      type: "account"
    }), _react.default.createElement(_uiApp.InputFile, {
      help: t('The compiled WASM for the contract that you wish to deploy. Each unique code blob will be attached with a code hash that can be used to create new instances.'),
      isError: !isWasmValid,
      label: t('compiled contract WASM'),
      onChange: this.onAddWasm,
      placeholder: wasm && !isWasmValid ? t('The code is not recognized as being in valid WASM format') : null
    }), this.renderInputName(), this.renderInputAbi(), _react.default.createElement(_uiApp.InputNumber, {
      help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
      label: t('maximum gas allowed'),
      onChange: this.onChangeGas
    }), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isDisabled: !isValid,
      isPrimary: true,
      label: t('Deploy'),
      onClick: this.toggleBusy,
      onFailed: this.toggleBusy,
      onSuccess: this.onSuccess,
      params: [gasLimit, wasm],
      tx: "contract.putCode"
    })));
  }

  renderExisting() {
    const {
      t
    } = this.props;
    const {
      codeHash,
      isAbiValid,
      isCodeValid,
      isNameValid
    } = this.state;
    const isValid = isAbiValid && isCodeValid && isNameValid;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      help: t('The code hash for the on-chain deployed code.'),
      isError: !isCodeValid,
      label: t('code hash'),
      onChange: this.onChangeHash,
      value: codeHash
    }), _react.default.createElement(_ValidateCode.default, {
      codeHash: codeHash,
      onChange: this.onValidateCode
    }), this.renderInputName(), this.renderInputAbi(), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      isPrimary: true,
      label: t('Save'),
      onClick: this.onSave
    })));
  }

  renderInputAbi() {
    const {
      t
    } = this.props;
    const {
      isAbiValid
    } = this.state;
    return _react.default.createElement(_ABI.default, {
      help: t('The ABI for the WASM code. In this step it is optional, but setting it here simplifies the setup of contract instances.'),
      isError: !isAbiValid,
      label: t('contract ABI (optional)'),
      onChange: this.onAddAbi
    });
  }

  renderInputName() {
    const {
      t
    } = this.props;
    const {
      isNameValid,
      name
    } = this.state;
    return _react.default.createElement(_uiApp.Input, {
      help: t('A name for this WASM code that helps to user distinguish. Only used for display purposes.'),
      isError: !isNameValid,
      label: t('code bundle name'),
      onChange: this.onChangeName,
      value: name
    });
  }

  redirect() {
    window.location.hash = this.props.basePath;
  }

}

var _default = (0, _translate.default)(Deploy);

exports.default = _default;