"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Unlock extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      address: '',
      password: '',
      unlockError: null
    };

    this.onChangePassword = password => {
      this.setState({
        password,
        unlockError: null
      });
    };

    this.onCancel = () => {
      const {
        onClose
      } = this.props;
      onClose();
    };

    this.onUnlock = () => {
      const {
        onClose
      } = this.props;
      const {
        password
      } = this.state;
      const unlockError = this.unlockAccount(password);

      if (unlockError) {
        this.setState({
          unlockError
        });
        return;
      }

      onClose();
    };
  }

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      pair
    } = _ref;
    return {
      address: pair ? pair.address() : ''
    };
  }

  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement(_uiApp.Modal, {
      className: "toolbox--Unlock",
      dimmer: "inverted",
      open: true
    }, _react.default.createElement(_uiApp.Modal.Header, null, t('Unlock account')), _react.default.createElement(_uiApp.Modal.Content, null, this.renderContent()), _react.default.createElement(_uiApp.Modal.Actions, null, this.renderActions()));
  }

  renderActions() {
    const {
      t
    } = this.props;
    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: this.onCancel,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isPrimary: true,
      onClick: this.onUnlock,
      label: t('Unlock')
    }));
  }

  renderContent() {
    const {
      t
    } = this.props;
    const {
      address,
      password,
      unlockError
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: "toolbox--Unlock-Content"
    }, _react.default.createElement("div", {
      className: "expanded"
    }, _react.default.createElement("p", null, _react.default.createElement(_reactI18next.Trans, null, "You are about to unlock your account ", _react.default.createElement("span", {
      className: "code"
    }, address), " to allow for the signing of messages."))), _react.default.createElement(_uiApp.IdentityIcon, {
      className: "icon",
      value: address
    })), _react.default.createElement("div", {
      className: "toolbox--Unlock-Entry"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Password, {
      className: "medium",
      isError: !!unlockError,
      label: t('unlock account using'),
      onChange: this.onChangePassword,
      value: password
    }))));
  }

  unlockAccount(password) {
    const {
      pair
    } = this.props;

    if (!pair || !pair.isLocked()) {
      return null;
    }

    try {
      pair.decodePkcs8(password);
    } catch (error) {
      return error.message;
    }

    return null;
  }

}

var _default = (0, _translate.default)(Unlock);

exports.default = _default;