"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _util = require("@polkadot/util");

var _utilCrypto = require("@polkadot/util-crypto");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Verify extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeData = data => {
      const isHexData = (0, _util.isHex)(data);
      this.nextState({
        data,
        isHexData
      });
    };

    this.onChangeSignature = signature => {
      const isValidSignature = (0, _util.isHex)(signature) && signature.length === 130;
      this.nextState({
        signature,
        isValidSignature
      });
    };

    this.onChangeAddress = accountId => {
      let currentPublicKey;

      try {
        currentPublicKey = _uiKeyring.default.decodeAddress(accountId);
      } catch (err) {
        console.error(err);
      }

      const isValidAddress = currentPublicKey && currentPublicKey.length === 32;
      this.nextState({
        currentPublicKey,
        isValidAddress
      });
    };

    const pairs = _uiKeyring.default.getPairs();

    const currentPair = pairs[0];

    const _currentPublicKey = currentPair ? currentPair.publicKey() : null;

    this.state = {
      currentPublicKey: _currentPublicKey,
      defaultPublicKey: _currentPublicKey || void 0,
      data: '',
      isHexData: false,
      isValidAddress: !!currentPair,
      isValidSignature: false,
      isValid: false,
      signature: ''
    };
  }

  render() {
    return _react.default.createElement("div", {
      className: "toolbox--Verify"
    }, this.renderInput(), this.renderAddress(), this.renderSignature());
  }

  renderAddress() {
    const {
      t
    } = this.props;
    const {
      defaultPublicKey,
      isValidAddress
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      defaultValue: defaultPublicKey,
      isError: !isValidAddress,
      isInput: true,
      label: t('verify using address'),
      onChange: this.onChangeAddress
    }));
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      data,
      isHexData
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "large",
      label: t('using the following data (hex or string)'),
      onChange: this.onChangeData,
      value: data
    }), _react.default.createElement(_uiApp.Static, {
      className: "small",
      label: t('hex input data'),
      value: isHexData ? t('Yes') : t('No')
    }));
  }

  renderSignature() {
    const {
      t
    } = this.props;
    const {
      isValid,
      isValidSignature,
      signature
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      icon: _react.default.createElement(_uiApp.Icon, {
        color: isValid ? 'green' : isValidSignature ? 'red' : void 0,
        name: isValid ? 'check circle' : isValidSignature ? 'exclamation circle' : 'help circle',
        size: "big"
      }),
      isError: !isValidSignature,
      label: t('checking the supplied signature'),
      onChange: this.onChangeSignature,
      value: signature
    }));
  }

  nextState(newState) {
    this.setState(prevState => {
      const {
        isHexData = prevState.isHexData,
        isValidAddress = prevState.isValidAddress,
        isValidSignature = prevState.isValidSignature,
        currentPublicKey = prevState.currentPublicKey,
        data = prevState.data,
        signature = prevState.signature
      } = newState;
      let isValid = isValidAddress && isValidSignature;

      if (isValid && currentPublicKey) {
        isValid = (0, _utilCrypto.naclVerify)(isHexData ? (0, _util.hexToU8a)(data) : (0, _util.stringToU8a)(data), (0, _util.hexToU8a)(signature), currentPublicKey);
      }

      return {
        isHexData,
        isValid,
        isValidAddress,
        isValidSignature,
        currentPublicKey,
        data,
        signature
      };
    });
  }

}

var _default = (0, _translate.default)(Verify);

exports.default = _default;