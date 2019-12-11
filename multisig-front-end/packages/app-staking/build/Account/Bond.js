"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("../translate"));

var _ValidateController = _interopRequireDefault(require("./ValidateController"));

// Copyright 2017-2019 @polkadot/ui-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const stashOptions = [{
  text: 'Stash account (increase the amount at stake)',
  value: 0
}, {
  text: 'Stash account (do not increase the amount at stake)',
  value: 1
}, {
  text: 'Controller account',
  value: 2
}];

class Bond extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeController = controllerId => {
      this.setState({
        controllerId
      });
    };

    this.onChangeDestination = destination => {
      this.setState({
        destination
      });
    };

    this.onChangeValue = bondValue => {
      this.setState({
        bondValue
      });
    };

    const {
      accountId,
      controllerId: _controllerId
    } = this.props;
    this.state = {
      controllerId: _controllerId ? _controllerId.toString() : accountId,
      destination: 0
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
      bondValue,
      controllerId,
      destination
    } = this.state;
    const hasValue = !!bondValue && bondValue.gtn(0);
    const canSubmit = hasValue && !!controllerId;

    if (!isOpen) {
      return null;
    }

    return _react.default.createElement(_uiApp.Modal, {
      className: "staking--Bonding",
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
      params: [controllerId, bondValue, destination],
      tx: "staking.bond"
    }))));
  }

  renderContent() {
    const {
      accountId,
      t
    } = this.props;
    const {
      controllerId,
      bondValue,
      destination
    } = this.state;
    const hasValue = !!bondValue && bondValue.gtn(0);
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Bonding Preferences')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "ui--signer-Signer-Content"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      defaultValue: accountId,
      isDisabled: true,
      label: t('stash account')
    }), _react.default.createElement(_uiApp.InputAddress, {
      className: "medium",
      help: t('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.'),
      label: t('controller account'),
      onChange: this.onChangeController,
      value: controllerId
    }), _react.default.createElement(_ValidateController.default, {
      accountId: accountId,
      controllerId: controllerId
    }), _react.default.createElement(_uiApp.InputBalance, {
      autoFocus: true,
      className: "medium",
      help: t('The total amount of the stash balance that will be at stake in any forthcoming rounds (should be less than the total amount available)'),
      isError: !hasValue,
      label: t('value bonded'),
      onChange: this.onChangeValue
    }), _react.default.createElement(_uiApp.Dropdown, {
      className: "medium",
      defaultValue: 0,
      help: t('The destination account for any payments as either a nominator or validator'),
      label: t('payment destination'),
      onChange: this.onChangeDestination,
      options: stashOptions,
      value: destination
    })));
  }

}

var _default = (0, _translate.default)(Bond);

exports.default = _default;