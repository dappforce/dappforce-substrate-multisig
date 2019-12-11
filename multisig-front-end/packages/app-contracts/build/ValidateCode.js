"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ValidateCode extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isStored: false,
      isValidHex: false,
      isValid: false
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      codeHash,
      contract_codeStorage,
      onChange
    } = _ref;
    const isValidHex = !!codeHash && (0, _util.isHex)(codeHash) && codeHash.length === 66;
    const isStored = !!contract_codeStorage && contract_codeStorage.isSome;
    const isValid = isValidHex && isStored; // FIXME Really not convinced this is the correct place to do this type of callback?

    onChange(isValid);
    return {
      isStored,
      isValidHex,
      isValid
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isValid,
      isValidHex
    } = this.state;

    if (isValid || !isValidHex) {
      return null;
    }

    return _react.default.createElement(_uiApp.InfoForInput, {
      type: "error"
    }, isValidHex ? t('Unable to find on-chain WASM code for the supplied codeHash') : t('The codeHash is not a valid hex hash'));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)(['query.contract.codeStorage', {
  paramName: 'codeHash'
}])(ValidateCode));

exports.default = _default;