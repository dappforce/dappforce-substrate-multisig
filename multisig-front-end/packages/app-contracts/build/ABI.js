"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _types = require("@polkadot/types");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ABI extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isAbiValid: true
    };

    this.onChange = (u8a, name) => {
      const {
        onChange
      } = this.props;
      const json = (0, _util.u8aToString)(u8a);

      try {
        const abi = new _types.ContractAbi(JSON.parse(json));
        this.setState({
          isAbiValid: true,
          name,
          placeholder: "".concat(name, " (").concat(Object.keys(abi.messages).join(', '), ")")
        }, () => onChange(json, abi));
      } catch (error) {
        this.setState({
          isAbiValid: false,
          placeholder: error.message
        }, () => onChange(null, null));
      }
    };
  }

  render() {
    const {
      help,
      isError,
      label
    } = this.props;
    const {
      isAbiValid,
      placeholder
    } = this.state;
    return _react.default.createElement(_uiApp.InputFile, {
      help: help,
      isError: !isAbiValid || isError,
      label: label,
      onChange: this.onChange,
      placeholder: placeholder
    });
  }

}

var _default = (0, _translate.default)(ABI);

exports.default = _default;