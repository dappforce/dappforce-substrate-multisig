"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _InputAddress = require("@polkadot/ui-app/InputAddress");

var _util = require("@polkadot/util");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

var _dfUtils = require("@polkadot/df-utils/");

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Restore extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isFileValid: false,
      isPassValid: true,
      json: null,
      password: ''
    };

    this.onChangeFile = file => {
      try {
        const json = JSON.parse((0, _util.u8aToString)(file));
        const isFileValid = _uiKeyring.default.decodeAddress(json.address).length === 32 && (0, _util.isHex)(json.encoded) && (0, _util.isObject)(json.meta) && (Array.isArray(json.encoding.content) ? json.encoding.content[0] === 'pkcs8' : json.encoding.content === 'pkcs8');
        this.setState({
          isFileValid,
          json
        });
      } catch (error) {
        this.setState({
          isFileValid: false,
          json: null
        });
        console.error(error);
      }
    };

    this.onChangePass = password => {
      this.setState({
        isPassValid: (0, _dfUtils.isEmptyStr)(password) || _uiKeyring.default.isPassValid(password),
        password
      });
    };

    this.onSave = () => {
      const {
        basePath,
        onStatusChange,
        t
      } = this.props;
      const {
        json,
        password
      } = this.state;

      if (!json) {
        return;
      }

      const status = {
        action: 'restore'
      };

      try {
        const pair = _uiKeyring.default.restoreAccount(json, password);

        status.status = pair ? 'success' : 'error';
        status.account = pair.address();
        status.message = t('key restored');

        _InputAddress.InputAddress.setLastValue('account', pair.address());
      } catch (error) {
        this.setState({
          isPassValid: false
        });
        status.status = 'error';
        status.message = error.message;
        console.error(error);
      }

      onStatusChange(status);

      if (status.status !== 'error') {
        window.location.hash = basePath;
      }
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isFileValid,
      isPassValid,
      json
    } = this.state;
    return _react.default.createElement("div", {
      className: "accounts--Restore"
    }, _react.default.createElement("div", {
      className: "ui--grid"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      className: "shrink",
      value: isFileValid && json ? json.address : null
    }), this.renderInput()), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isFileValid || !isPassValid,
      isPrimary: true,
      onClick: this.onSave,
      label: t('Restore')
    })));
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      isFileValid,
      isPassValid,
      password
    } = this.state;
    const acceptedFormats = ['application/json', 'text/plain'].join(', ');
    return _react.default.createElement("div", {
      className: "grow"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.InputFile, {
      accept: acceptedFormats,
      className: "full",
      isError: !isFileValid,
      label: t('previously backed-up json keyfile'),
      onChange: this.onChangeFile,
      withLabel: true
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Password, {
      autoFocus: true,
      className: "full",
      isError: !isPassValid,
      label: t('decrypt keyfile using the password'),
      onChange: this.onChangePass,
      value: password
    })));
  }

}

var _default = (0, _translate.default)(Restore);

exports.default = _default;