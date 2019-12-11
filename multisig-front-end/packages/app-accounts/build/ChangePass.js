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

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ChangePass extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isNewValid: false,
      isOldValid: false,
      newPass: '',
      oldPass: ''
    };

    this.doChange = () => {
      const {
        account,
        onClose,
        onStatusChange,
        t
      } = this.props;
      const {
        newPass,
        oldPass
      } = this.state;
      const status = {
        action: 'changePassword'
      };

      try {
        if (!account.isLocked()) {
          account.lock();
        }

        account.decodePkcs8(oldPass);
      } catch (error) {
        this.setState({
          isOldValid: false
        });
        status.message = error.message;
        return;
      }

      try {
        _uiKeyring.default.encryptAccount(account, newPass);

        status.account = account.address();
        status.status = 'success';
        status.message = t('password changed');
      } catch (error) {
        this.setState({
          isNewValid: false
        });
        status.status = 'error';
        status.message = error.message;
        return;
      }

      onStatusChange(status);
      onClose();
    };

    this.onChangeNew = newPass => {
      this.setState({
        isNewValid: this.validatePass(newPass),
        newPass
      });
    };

    this.onChangeOld = oldPass => {
      this.setState({
        isOldValid: this.validatePass(oldPass),
        oldPass
      });
    };
  }

  render() {
    return _react.default.createElement(_uiApp.Modal, {
      className: "app--accounts-Modal",
      dimmer: "inverted",
      open: true,
      size: "tiny"
    }, this.renderContent(), this.renderButtons());
  }

  renderButtons() {
    const {
      onClose,
      t
    } = this.props;
    const {
      isNewValid,
      isOldValid
    } = this.state;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      label: t('Cancel'),
      onClick: onClose
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isNewValid || !isOldValid,
      isPrimary: true,
      label: t('Change'),
      onClick: this.doChange
    })));
  }

  renderContent() {
    const {
      account,
      t
    } = this.props;
    const {
      isNewValid,
      isOldValid,
      newPass,
      oldPass
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Change password for this key')), _react.default.createElement(_uiApp.Modal.Content, null, _react.default.createElement(_uiApp.AddressSummary, {
      value: account.address()
    }), _react.default.createElement(_uiApp.Password, {
      autoFocus: true,
      isError: !isOldValid,
      label: t('your current password'),
      onChange: this.onChangeOld,
      tabIndex: 1,
      value: oldPass
    }), _react.default.createElement(_uiApp.Password, {
      isError: !isNewValid,
      label: t('your new password'),
      onChange: this.onChangeNew,
      tabIndex: 2,
      value: newPass
    })));
  }

  validatePass(password) {
    return _uiKeyring.default.isPassValid(password);
  }

}

var _default = (0, _translate.default)(ChangePass);

exports.default = _default;