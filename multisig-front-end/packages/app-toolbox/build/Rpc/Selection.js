"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _jsonrpc = _interopRequireDefault(require("@polkadot/jsonrpc"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _uiParams = _interopRequireDefault(require("@polkadot/ui-params"));

var _translate = _interopRequireDefault(require("./translate"));

// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// import Account from './Account';
const defaultMethod = _jsonrpc.default.author.methods.submitExtrinsic;

class Selection extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isValid: false,
      accountId: null,
      rpc: defaultMethod,
      values: []
    };

    this.onChangeMethod = rpc => {
      this.nextState({
        rpc,
        values: []
      });
    };

    this.onChangeValues = values => {
      this.nextState({
        values
      });
    };

    this.onSubmit = () => {
      const {
        queueRpc
      } = this.props;
      const {
        accountId,
        rpc,
        values
      } = this.state;
      queueRpc({
        accountId,
        rpc,
        values: values.map((_ref) => {
          let {
            value
          } = _ref;
          return value;
        })
      });
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isValid,
      rpc
    } = this.state;
    const params = rpc.params.map((_ref2) => {
      let {
        name,
        type
      } = _ref2;
      return {
        name,
        type: (0, _types.getTypeDef)(type)
      };
    });
    return _react.default.createElement("section", {
      className: "rpc--Selection"
    }, _react.default.createElement(_uiApp.InputRpc, {
      defaultValue: defaultMethod,
      label: t('call the selected endpoint'),
      onChange: this.onChangeMethod
    }), this.renderAccount(), _react.default.createElement(_uiParams.default, {
      key: "".concat(rpc.section, ".").concat(rpc.method, ":params")
      /* force re-render on change */
      ,
      onChange: this.onChangeValues,
      params: params
    }), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onSubmit,
      label: t('Submit RPC call')
    })));
  } // FICME Currently the UI doesn't support signing for rpc-submitted calls


  renderAccount() {
    // const { rpc: { isSigned = false }, publicKey } = this.state;
    return null; // if (!isSigned) {
    //   return null;
    // }
    // return (
    //   <Account
    //     defaultValue={publicKey}
    //     onChange={this.onChangeAccount}
    //   />
    // );
  }

  nextState(newState) {
    this.setState(prevState => {
      const {
        rpc = prevState.rpc,
        accountId = prevState.accountId,
        values = prevState.values
      } = newState;
      const hasNeededKey = true; // rpc.isSigned !== true || (!!publicKey && publicKey.length === 32);

      const isValid = values.reduce((isValid, value) => {
        return isValid && value.isValid === true;
      }, rpc.params.length === values.length && hasNeededKey);
      return {
        isValid,
        rpc,
        accountId,
        values
      };
    });
  } // private onChangeAccount = (publicKey: Uint8Array | undefined | null, accountNonce: BN): void => {
  //   this.nextState({
  //     accountNonce,
  //     publicKey
  //   } as State);
  // }


}

var _default = (0, _translate.default)(Selection);

exports.default = _default;