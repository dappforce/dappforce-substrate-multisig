"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/ui-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BondExtra extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onChangeValue = maxAdditional => {
      this.setState({
        maxAdditional
      });
    };
  }

  render() {
    const {
      accountId,
      isOpen,
      onClose,
      t
    } = this.props;
    const {
      maxAdditional
    } = this.state;
    const canSubmit = !!maxAdditional && maxAdditional.gtn(0);

    if (!isOpen) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal, {
      className: "staking--BondExtra",
      dimmer: "inverted",
      open: true,
      size: "small"
    }, this.renderContent(), _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: onClose,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isDisabled: !canSubmit,
      isPrimary: true,
      label: t('Bond'),
      onClick: onClose,
      params: [maxAdditional],
      tx: "staking.bondExtra"
    }))));
  }

  renderContent() {
    const {
      accountId,
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Bond Extra')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "ui--signer-Signer-Content"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      defaultValue: accountId,
      isDisabled: true,
      label: t('stash account')
    }), _react.default.createElement(_uiApp.InputBalance, {
      autoFocus: true,
      className: "medium",
      help: t('The maximum amount to increase the bonded value, this is adjusted using the available free funds on the account.'),
      label: t('max additional value'),
      onChange: this.onChangeValue
    })));
  }

}

var _default = (0, _translate.default)(BondExtra);

exports.default = _default;