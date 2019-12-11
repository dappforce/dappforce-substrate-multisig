"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/ui-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Staking extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      unstakeThreshold: new _bn.default(3),
      validatorPayment: new _bn.default(0)
    };

    this.onChangePayment = validatorPayment => {
      if (validatorPayment) {
        this.setState({
          validatorPayment
        });
      }
    };

    this.onChangeThreshold = unstakeThreshold => {
      if (unstakeThreshold) {
        this.setState({
          unstakeThreshold
        });
      }
    };
  }

  // inject the preferences are returned via RPC once into the state (from this
  // point forward it will be entirely managed by the actual inputs)
  static getDerivedStateFromProps(props, state) {
    if (state.unstakeThreshold) {
      return null;
    }

    const {
      unstakeThreshold,
      validatorPayment
    } = props.preferences;
    return {
      unstakeThreshold: unstakeThreshold.toBn(),
      validatorPayment: validatorPayment.toBn()
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
      className: "staking--Staking",
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
      unstakeThreshold,
      validatorPayment
    } = this.state;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      label: t('Cancel'),
      onClick: onClose
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.TxButton, {
      accountId: accountId,
      isPrimary: true,
      label: t('Validate'),
      onClick: onClose,
      params: [{
        unstakeThreshold,
        validatorPayment
      }],
      tx: "staking.validate"
    })));
  }

  renderContent() {
    const {
      accountId,
      stashId,
      t
    } = this.props;
    const {
      unstakeThreshold,
      validatorPayment
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Validating')), _react.default.createElement(_uiApp.Modal.Content, {
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
    }), _react.default.createElement(_uiApp.InputNumber, {
      autoFocus: true,
      bitLength: 32,
      className: "medium",
      help: t('The number of allowed slashes for this validator before being automatically unstaked (maximum of 10 allowed)'),
      label: t('unstake threshold'),
      onChange: this.onChangeThreshold,
      value: unstakeThreshold ? unstakeThreshold.toString() : '3'
    }), _react.default.createElement(_uiApp.InputBalance, {
      className: "medium",
      help: t('Reward that validator takes up-front, the remainder is split between themselves and nominators'),
      label: t('payment preferences'),
      onChange: this.onChangePayment,
      value: validatorPayment ? validatorPayment.toString() : '0'
    })));
  }

}

var _default = (0, _translate.default)(Staking);

exports.default = _default;