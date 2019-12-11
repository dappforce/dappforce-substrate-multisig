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
class Nominating extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      nominees: []
    };

    this.onChangeNominees = nominees => {
      this.setState({
        nominees
      });
    };
  }

  render() {
    const {
      isOpen
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal, {
      className: "staking--Nominating",
      dimmer: "inverted",
      open: true,
      size: "small"
    }, this.renderContent(), this.renderButtons());
  }

  renderButtons() {
    const {
      accountId,
      onClose,
      t
    } = this.props;
    const {
      nominees
    } = this.state;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: onClose,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isDisabled: nominees.length === 0,
      isPrimary: true,
      onClick: onClose,
      params: [nominees],
      label: t('Nominate'),
      tx: "staking.nominate"
    })));
  }

  renderContent() {
    const {
      accountId,
      stashId,
      stashOptions,
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Nominate Validators')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "ui--signer-Signer-Content"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      defaultValue: accountId,
      isDisabled: true,
      label: t('controller account')
    }), _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      defaultValue: stashId,
      isDisabled: true,
      label: t('stash account')
    }), _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      isMultiple: true,
      help: t('Stash accounts that are to be nominated. Block rewards are split between validators and nominators'),
      label: t('nominate the following addresses'),
      onChangeMulti: this.onChangeNominees,
      options: stashOptions,
      placeholder: t('select accounts(s) nominate'),
      type: "account"
    })));
  }

}

var _default = (0, _translate.default)(Nominating);

exports.default = _default;