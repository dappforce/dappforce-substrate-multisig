"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _store = _interopRequireDefault(require("./store"));

var _translate = _interopRequireDefault(require("./translate"));

var _Params = _interopRequireDefault(require("./Params"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Call extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      accountId: null,
      endowment: new _bn.default(0),
      gasLimit: new _bn.default(0),
      isAddressValid: false,
      isBusy: false,
      params: []
    };

    this.constructCall = () => {
      const {
        address,
        contractAbi,
        endowment,
        gasLimit,
        method,
        params
      } = this.state;

      if (!contractAbi || !method) {
        return [];
      }

      return [address, endowment, gasLimit, contractAbi.messages[method](...params)];
    };

    this.onChangeAccount = accountId => {
      this.setState({
        accountId
      });
    };

    this.onChangeAddress = address => {
      const contract = _store.default.getContract(address);

      const contractAbi = contract ? contract.contractAbi : null;
      this.setState({
        address,
        contractAbi,
        isAddressValid: !!contractAbi
      });
      this.onChangeMethod(contractAbi ? Object.keys(contractAbi.messages)[0] : null);
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

    this.onChangeMethod = method => {
      this.setState({
        method,
        params: []
      });
    };

    this.onChangeParams = params => {
      this.setState({
        params
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
  }

  render() {
    const {
      t
    } = this.props;
    const {
      accountId,
      address,
      contractAbi,
      endowment,
      gasLimit,
      isAddressValid,
      method
    } = this.state;

    const contractOptions = _store.default.getAllContracts().map((_ref2) => {
      let {
        json: {
          address,
          name
        }
      } = _ref2;
      return {
        text: "".concat(name, " (").concat(address, ")"),
        value: address
      };
    });

    const methodOptions = contractAbi ? Object.keys(contractAbi.messages).map(key => {
      const fn = contractAbi.messages[key];
      const type = fn.type ? ": ".concat(fn.type) : '';
      const args = fn.args.map((_ref3) => {
        let {
          name,
          type
        } = _ref3;
        return "".concat(name, ": ").concat(type);
      });
      const text = "".concat(key, "(").concat(args.join(', '), ")").concat(type);
      return {
        key,
        text,
        value: key
      };
    }) : [];
    const defaultContract = contractOptions.length ? contractOptions[contractOptions.length - 1].value : undefined;
    const isEndowValid = !endowment.isZero();
    const isGasValid = !gasLimit.isZero();
    const isValid = !!accountId && isEndowValid && isGasValid && isAddressValid;
    return _react.default.createElement("div", {
      className: "contracts--Call"
    }, _react.default.createElement(_uiApp.InputAddress, {
      help: t('Specify the user account to use for this contract call. And fees will be deducted from this account.'),
      label: t('call from account'),
      onChange: this.onChangeAccount,
      type: "account"
    }), _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: defaultContract,
      help: t('A deployed contract that has either been deployed or attached. The address and ABI are used to construct the parameters.'),
      isError: !isAddressValid,
      label: t('contract to use'),
      onChange: this.onChangeAddress,
      options: contractOptions,
      value: address
    }), _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: method,
      help: t('The message to send to this contract. Parameters are adjusted based on the ABI provided.'),
      isError: !method,
      label: t('message to send'),
      onChange: this.onChangeMethod,
      options: methodOptions,
      value: method
    }), _react.default.createElement(_Params.default, {
      onChange: this.onChangeParams,
      params: method && contractAbi && contractAbi.messages[method] ? contractAbi.messages[method].args : undefined
    }), _react.default.createElement(_uiApp.InputBalance, {
      help: t('The allotted value for this contract, i.e. the amount transferred to the contract as part of this call.'),
      isError: !isEndowValid,
      label: t('value'),
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
      label: t('Call'),
      onClick: this.toggleBusy,
      onFailed: this.toggleBusy,
      onSuccess: this.toggleBusy,
      params: this.constructCall,
      tx: "contract.call"
    })));
  }

}

var _default = (0, _translate.default)(Call);

exports.default = _default;