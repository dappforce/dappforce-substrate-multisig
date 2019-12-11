"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Backup extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isPassValid: false,
      password: ''
    };

    this.doBackup = () => {
      const {
        onClose,
        onStatusChange,
        pair,
        t
      } = this.props;
      const {
        password
      } = this.state;

      if (!pair) {
        return;
      }

      const status = {
        action: 'backup'
      };

      try {
        const json = _uiKeyring.default.backupAccount(pair, password);

        const blob = new Blob([JSON.stringify(json)], {
          type: 'application/json; charset=utf-8'
        });
        status.account = pair.address();
        status.status = blob ? 'success' : 'error';
        status.message = t('key backed up');

        _fileSaver.default.saveAs(blob, "".concat(pair.address(), ".json"));
      } catch (error) {
        this.setState({
          isPassValid: false
        });
        console.error(error);
        status.status = 'error';
        status.message = error.message;
        return;
      }

      onStatusChange(status);
      onClose();
    };

    this.onChangePass = password => {
      this.setState({
        isPassValid: _uiKeyring.default.isPassValid(password),
        password
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
      isPassValid
    } = this.state;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      label: t('Cancel'),
      onClick: onClose
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isPassValid,
      isPrimary: true,
      label: t('Download'),
      onClick: this.doBackup
    })));
  }

  renderContent() {
    const {
      pair,
      t
    } = this.props;
    const {
      isPassValid,
      password
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Backup this key')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "app--account-Backup-content"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      value: pair.address()
    }), _react.default.createElement(_uiApp.Password, {
      isError: !isPassValid,
      label: t('unlock key using the password'),
      onChange: this.onChangePass,
      tabIndex: 0,
      value: password
    })));
  }

}

var _default = (0, _translate.default)(Backup);

exports.default = _default;