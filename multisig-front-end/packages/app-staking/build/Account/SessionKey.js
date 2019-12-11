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
class Key extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeSession = sessionId => {
      this.setState({
        sessionId
      });
    };

    this.state = {
      sessionId: props.accountId
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
      sessionId
    } = this.state;

    if (!isOpen) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal, {
      className: "staking--Stash",
      dimmer: "inverted",
      open: true,
      size: "small"
    }, this.renderContent(), _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: onClose,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isDisabled: !sessionId,
      isPrimary: true,
      label: t('Set Session Key'),
      onClick: onClose,
      params: [sessionId],
      tx: "session.setKey"
    }))));
  }

  renderContent() {
    const {
      accountId,
      t
    } = this.props;
    const {
      sessionId
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Session Key')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "ui--signer-Signer-Content"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      defaultValue: accountId,
      isDisabled: true,
      label: t('controller account')
    }), _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      help: t('Changing the key only takes effect at the start of the next session. If validating, you should (currently) use an ed25519 key.'),
      label: t('session key'),
      onChange: this.onChangeSession,
      value: sessionId,
      type: "account"
    })));
  }

}

var _default = (0, _translate.default)(Key);

exports.default = _default;