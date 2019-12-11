"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ValidateAddr extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isStored: false,
      isValidAddr: false,
      isValid: false
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      address,
      contract_codeHashOf,
      onChange
    } = _ref;
    let isValidAddr = false;

    try {
      _uiKeyring.default.decodeAddress(address || '');

      isValidAddr = true;
    } catch (error) {// ignore
    }

    const isStored = !!contract_codeHashOf && contract_codeHashOf.isSome;
    const isValid = isValidAddr && isStored; // FIXME Really not convinced this is the correct place to do this type of callback?

    onChange(isValid);
    return {
      isStored,
      isValidAddr,
      isValid
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isValid,
      isValidAddr
    } = this.state;

    if (isValid || !isValidAddr) {
      return null;
    }

    return _react.default.createElement(_uiApp.InfoForInput, {
      type: "error"
    }, isValidAddr ? t('Unable to find deployed contract code at the specified address') : t('The value is not in a valid address format'));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)(['query.contract.codeHashOf', {
  paramName: 'address'
}])(ValidateAddr));

exports.default = _default;