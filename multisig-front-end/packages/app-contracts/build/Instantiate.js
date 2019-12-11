"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _types = require("@polkadot/types");

var _ABI = _interopRequireDefault(require("./ABI"));

var _Params = _interopRequireDefault(require("./Params"));

var _ValidateAddr = _interopRequireDefault(require("./ValidateAddr"));

var _store = _interopRequireDefault(require("./store"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Create extends _react.default.PureComponent {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;
    this.state = {
      accountId: null,
      endowment: new _bn.default(0),
      gasLimit: new _bn.default(0),
      isAbiValid: false,
      isAbiSupplied: false,
      isAddressValid: false,
      isBusy: false,
      isHashValid: false,
      isNameValid: false,
      isNew: true,
      params: []
    };

    this.constructCall = () => {
      const {
        codeHash,
        contractAbi,
        endowment,
        gasLimit,
        params
      } = this.state;

      if (!contractAbi) {
        return [];
      }

      return [endowment, gasLimit, codeHash, contractAbi.deploy(...params)];
    };

    this.onAddAbi = function (abi, contractAbi) {
      let isAbiSupplied = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _this.setState({
        abi,
        contractAbi,
        isAbiSupplied,
        isAbiValid: !!abi
      });
    };

    this.onChangeAccount = accountId => {
      this.setState({
        accountId
      });
    };

    this.onChangeAddress = address => {
      this.setState({
        address,
        isAddressValid: false
      });
    };

    this.onChangeCode = codeHash => {
      const code = _store.default.getCode(codeHash);

      this.setState({
        codeHash,
        isHashValid: !!code
      });

      if (code) {
        if (code.contractAbi) {
          this.onAddAbi(code.json.abi, code.contractAbi, true);
        } else {
          this.onAddAbi(null, null, false);
        }

        this.onChangeName("".concat(code.json.name, " (instance)"));
      }
    };

    this.onChangeEndowment = endowment => {
      this.setState({
        endowment: endowment || new _bn.default(0)
      });
    };

    this.onChangeGas = gasLimit => {
      this.setState({
        gasLimit: gasLimit || new _bn.default(0)
      });
    };

    this.onChangeName = name => {
      this.setState({
        name,
        isNameValid: name.length !== 0
      });
    };

    this.onChangeParams = params => {
      this.setState({
        params
      });
    };

    this.onValidateAddr = isAddressValid => {
      this.setState({
        isAddressValid
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
          address: null,
          abi: null,
          isAddressValid: false,
          isAbiValid: false,
          isNameValid: false,
          isNew: !isNew,
          name: ''
        };
      });
    };

    this.onSave = () => {
      const {
        address,
        abi,
        name
      } = this.state;

      if (!address || !abi || !name) {
        return;
      }

      _store.default.saveContract(new _types.AccountId(address), {
        abi,
        name
      }).catch(error => {
        console.error('Unable to save contract', error);
      });

      this.redirect();
    };

    this.onSuccess = result => {
      const record = result.findRecord('contract', 'Instantiated');

      if (record) {
        const address = record.event.data[1];
        this.setState((_ref3) => {
          let {
            abi,
            name
          } = _ref3;

          if (!abi || !name) {
            return;
          }

          _store.default.saveContract(address, {
            abi,
            name
          }).catch(error => {
            console.error('Unable to save contract', error);
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
      className: "contracts--Instantiate"
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
      codeHash,
      contractAbi,
      endowment,
      gasLimit,
      isAbiSupplied,
      isAbiValid,
      isHashValid,
      isNameValid
    } = this.state;
    const isEndowValid = !endowment.isZero();
    const isGasValid = !gasLimit.isZero();
    const isValid = isAbiValid && isHashValid && isEndowValid && isGasValid && !!accountId && isNameValid;

    const codeOptions = _store.default.getAllCode().map((_ref4) => {
      let {
        json: {
          codeHash,
          name
        }
      } = _ref4;
      return {
        text: "".concat(name, " (").concat(codeHash, ")"),
        value: codeHash
      };
    });

    const defaultCode = codeOptions.length ? codeOptions[codeOptions.length - 1].value : undefined;
    const constructOptions = contractAbi ? (() => {
      const args = contractAbi.deploy.args.map((_ref5) => {
        let {
          name,
          type
        } = _ref5;
        return name + ': ' + type;
      });
      const text = "deploy(".concat(args.join(', '), ")");
      return [{
        key: 'deploy',
        text,
        value: 'deploy'
      }];
    })() : [];
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.InputAddress, {
      help: t('Specify the user account to use for this contract creation. And fees will be deducted from this account.'),
      label: t('deployment account'),
      onChange: this.onChangeAccount,
      type: "account"
    }), _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: defaultCode,
      help: t('The contract WASM previously deployed. Internally this is identified by the hash of the code, as either created or attached.'),
      isError: !isHashValid,
      label: t('code for this contract'),
      onChange: this.onChangeCode,
      options: codeOptions,
      value: codeHash
    }), this.renderInputName(), isAbiSupplied ? null : this.renderInputAbi(), contractAbi ? _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: "deploy",
      help: t('The deployment constructor information for this contract, as provided by the ABI.'),
      isDisabled: true,
      label: t('constructor'),
      options: constructOptions,
      value: "deploy"
    }) : null, _react.default.createElement(_Params.default, {
      onChange: this.onChangeParams,
      params: contractAbi ? contractAbi.deploy.args : undefined
    }), _react.default.createElement(_uiApp.InputBalance, {
      help: t('The allotted endownment for this contract, i.e. the amount transferred to the contract upon instantiation.'),
      isError: !isEndowValid,
      label: t('endowment'),
      onChange: this.onChangeEndowment
    }), _react.default.createElement(_uiApp.InputNumber, {
      help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
      isError: !isGasValid,
      label: t('maximum gas allowed'),
      onChange: this.onChangeGas
    }), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isDisabled: !isValid,
      isPrimary: true,
      label: t('Instantiate'),
      onClick: this.toggleBusy,
      onFailed: this.toggleBusy,
      onSuccess: this.onSuccess,
      params: this.constructCall,
      tx: "contract.create"
    })));
  }

  renderExisting() {
    const {
      t
    } = this.props;
    const {
      address,
      isAddressValid,
      isAbiValid,
      isNameValid
    } = this.state;
    const isValid = isNameValid && isAddressValid && isAbiValid;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      help: t('The address for the deployed contract instance.'),
      isError: !isAddressValid,
      label: t('contract address'),
      onChange: this.onChangeAddress,
      value: address
    }), _react.default.createElement(_ValidateAddr.default, {
      address: address,
      onChange: this.onValidateAddr
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
      help: t('The ABI for the WASM code. Since we will be making a call into the code, the ABI is required and stored for future operations such as sending messages.'),
      isError: !isAbiValid,
      label: t('Contract ABI'),
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
      help: t('A name for the deployed contract to help you distinguish. Only used for display purposes.'),
      isError: !isNameValid,
      label: t('contract name'),
      onChange: this.onChangeName,
      value: name
    });
  }

  redirect() {
    window.location.hash = this.props.basePath;
  }

}

var _default = (0, _translate.default)(Create);

exports.default = _default;