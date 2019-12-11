"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AddressSummary = exports.DEFAULT_ADDR = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiReactive = require("@polkadot/ui-reactive");

var _uiApi = require("@polkadot/ui-api");

var _uiIdenticon = _interopRequireDefault(require("@polkadot/ui-identicon"));

var _util = require("./util");

var _Balance = _interopRequireDefault(require("./Balance"));

var _Bonded = _interopRequireDefault(require("./Bonded"));

var _IdentityIcon = _interopRequireDefault(require("./IdentityIcon"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const DEFAULT_ADDR = '5'.padEnd(16, 'x');
exports.DEFAULT_ADDR = DEFAULT_ADDR;

class AddressSummary extends _react.default.PureComponent {
  render() {
    const {
      accounts_idAndIndex = [],
      className,
      style
    } = this.props;
    const [accountId, accountIndex] = accounts_idAndIndex;
    const isValid = accountId || accountIndex;
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--AddressSummary', !isValid && 'invalid', className),
      style: style
    }, _react.default.createElement("div", {
      className: "ui--AddressSummary-base"
    }, this.renderIcon(), this.renderAccountId(), this.renderAccountIndex(), this.renderBalance(), this.renderBonded(), this.renderNonce()), this.renderChildren());
  }

  renderAddress() {
    const {
      name,
      isShort = true,
      value
    } = this.props;

    if (!value) {
      return null;
    }

    const address = value.toString();
    return _react.default.createElement("div", {
      className: "ui--AddressSummary-data"
    }, _react.default.createElement("div", {
      className: "ui--AddressSummary-name"
    }, name), _react.default.createElement("div", {
      className: "ui--AddressSummary-accountId"
    }, isShort ? (0, _util.toShortAddress)(address) : value));
  }

  renderAccountId() {
    const {
      accounts_idAndIndex = [],
      name,
      isShort = true,
      value
    } = this.props;
    const [_accountId, accountIndex] = accounts_idAndIndex;
    const accountId = _accountId || value;

    if (!accountId && accountIndex) {
      return null;
    }

    const address = accountId ? accountId.toString() : DEFAULT_ADDR;
    return _react.default.createElement("div", {
      className: "ui--AddressSummary-data"
    }, _react.default.createElement("div", {
      className: "ui--AddressSummary-name"
    }, name), _react.default.createElement("div", {
      className: "ui--AddressSummary-accountId"
    }, isShort ? (0, _util.toShortAddress)(address) : address));
  }

  renderAccountIndex() {
    const {
      accounts_idAndIndex = [],
      withIndex = true
    } = this.props;
    const [, accountIndex] = accounts_idAndIndex;

    if (!accountIndex || !withIndex) {
      return null;
    }

    const address = accountIndex.toString();
    return _react.default.createElement("div", {
      className: "ui--AddressSummary-data"
    }, _react.default.createElement("div", {
      className: "ui--AddressSummary-name"
    }), _react.default.createElement("div", {
      className: "ui--AddressSummary-accountIndex"
    }, address));
  }

  renderBalance() {
    const {
      accounts_idAndIndex = [],
      balance,
      t,
      value,
      withBalance = true
    } = this.props;
    const [_accountId] = accounts_idAndIndex;
    const accountId = _accountId || value;

    if (!withBalance || !accountId) {
      return null;
    }

    return _react.default.createElement(_Balance.default, {
      balance: balance,
      className: "ui--AddressSummary-balance",
      label: t('balance '),
      params: accountId
    });
  }

  renderBonded() {
    const {
      accounts_idAndIndex = [],
      bonded,
      t,
      value,
      withBonded
    } = this.props;
    const [_accountId] = accounts_idAndIndex;
    const accountId = _accountId || value;

    if (!withBonded || !accountId) {
      return null;
    }

    return _react.default.createElement(_Bonded.default, {
      bonded: bonded,
      className: "ui--AddressSummary-bonded",
      label: t('bonded '),
      params: accountId
    });
  }

  renderIcon() {
    let className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ui--AddressSummary-icon';
    let size = arguments.length > 1 ? arguments[1] : undefined;
    const {
      accounts_idAndIndex = [],
      identIconSize = 96,
      value,
      withIcon = true
    } = this.props;

    if (!withIcon) {
      return null;
    }

    const [_accountId] = accounts_idAndIndex;
    const accountId = (_accountId || value || '').toString(); // Since we do queries to storage in the wrapped example, we don't want
    // to follow that route if we don't have a valid address.

    const Component = accountId ? _IdentityIcon.default : _uiIdenticon.default;
    return _react.default.createElement(Component, {
      className: className,
      size: size || identIconSize,
      value: accountId
    });
  }

  renderNonce() {
    const {
      accounts_idAndIndex = [],
      t,
      value,
      withNonce = true
    } = this.props;
    const [_accountId] = accounts_idAndIndex;
    const accountId = _accountId || value;

    if (!withNonce || !accountId) {
      return null;
    }

    return _react.default.createElement(_uiReactive.Nonce, {
      className: "ui--AddressSummary-nonce",
      params: accountId.toString()
    }, t(' transactions'));
  }

  renderChildren() {
    const {
      children
    } = this.props;

    if (!children || Array.isArray(children) && children.length === 0) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "ui--AddressSummary-children"
    }, children);
  }

}

exports.AddressSummary = AddressSummary;

var _default = (0, _translate.default)((0, _uiApi.withCalls)(['derive.accounts.idAndIndex', {
  paramName: 'value'
}])(AddressSummary));

exports.default = _default;