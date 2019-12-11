"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("./util");

var _Balance = _interopRequireDefault(require("./Balance"));

var _Bonded = _interopRequireDefault(require("./Bonded"));

var _IdentityIcon = _interopRequireDefault(require("./IdentityIcon"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class AddressMini extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      isPadded = true,
      style,
      value
    } = this.props;

    if (!value) {
      return null;
    }

    const address = value.toString();
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--AddressMini', isPadded ? 'padded' : '', className),
      style: style
    }, _react.default.createElement("div", {
      className: "ui--AddressMini-info"
    }, _react.default.createElement(_IdentityIcon.default, {
      size: 24,
      value: address
    }), this.renderAddressOrName(address), children, this.renderOfflineStatus()), this.renderBalance(), this.renderBonded());
  }

  renderAddressOrName(address) {
    const {
      isShort = true,
      withAddress = true
    } = this.props;

    if (!withAddress) {
      return null;
    }

    const name = (0, _util.getAddrName)(address);
    return _react.default.createElement("div", {
      className: "ui--AddressMini-address ".concat(name ? 'withName' : 'withAddr')
    }, name || (isShort ? (0, _util.toShortAddress)(address) : address));
  }

  renderBalance() {
    const {
      balance,
      value,
      withBalance = false
    } = this.props;

    if (!withBalance || !value) {
      return null;
    }

    return _react.default.createElement(_Balance.default, {
      balance: balance,
      className: "ui--AddressSummary-balance",
      params: value
    });
  }

  renderBonded() {
    const {
      bonded,
      value,
      withBonded = false
    } = this.props;

    if (!withBonded || !value) {
      return null;
    }

    return _react.default.createElement(_Bonded.default, {
      bonded: bonded,
      className: "ui--AddressSummary-balance",
      label: "",
      params: value
    });
  }

  renderOfflineStatus() {
    const {
      value,
      offlineStatus
    } = this.props;

    if (!value || !offlineStatus) {
      return null;
    }

    return _react.default.createElement(_uiApp.RecentlyOffline, {
      accountId: value.toString(),
      offline: offlineStatus,
      tooltip: true,
      inline: true
    });
  }

}

exports.default = AddressMini;