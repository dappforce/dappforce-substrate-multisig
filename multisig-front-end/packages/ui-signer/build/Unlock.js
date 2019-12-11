"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Unlock extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isLocked: false
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      error,
      value
    } = _ref;

    const pair = _uiKeyring.default.getPair(value);

    if (!pair) {
      return null;
    }

    const isLocked = pair.isLocked();
    return {
      isError: !!error,
      isLocked,
      pair
    };
  }

  render() {
    const {
      autoFocus,
      onChange,
      onKeyDown,
      password,
      t,
      tabIndex
    } = this.props;
    const {
      isError,
      isLocked
    } = this.state;

    if (!isLocked) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "ui--signer-Signer-Unlock"
    }, _react.default.createElement(_uiApp.Password, {
      autoFocus: autoFocus,
      isError: isError,
      label: t('unlock account with password'),
      onChange: onChange,
      onKeyDown: onKeyDown,
      tabIndex: tabIndex,
      value: password
    }));
  }

}

var _default = (0, _translate.default)(Unlock);

exports.default = _default;