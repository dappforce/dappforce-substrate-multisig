"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _InputAddress = require("@polkadot/ui-app/InputAddress");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-address-book authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Creator extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeAddress = address => {
      this.nextState({
        address
      });
    };

    this.onChangeName = name => {
      this.nextState({
        name
      }, true);
    };

    this.onCommit = () => {
      const {
        basePath,
        onStatusChange,
        t
      } = this.props;
      const {
        address,
        isAddressExisting,
        name
      } = this.state;
      const status = {
        action: 'create'
      };

      try {
        _uiKeyring.default.saveAddress(address, {
          name
        });

        status.account = address;
        status.status = address ? 'success' : 'error';
        status.message = isAddressExisting ? t('address edited') : t('address created');

        _InputAddress.InputAddress.setLastValue('address', address);
      } catch (error) {
        status.status = 'error';
        status.message = error.message;
      }

      onStatusChange(status);

      if (status.status !== 'error') {
        window.location.hash = basePath;
      }
    };

    this.onDiscard = () => {
      this.setState(this.emptyState());
    };

    this.state = this.emptyState();
  }

  render() {
    const {
      address
    } = this.state;
    return _react.default.createElement("div", {
      className: "address-book--Creator"
    }, _react.default.createElement("div", {
      className: "ui--grid"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      className: "shrink",
      value: address,
      withBonded: true
    }), this.renderInput()), this.renderButtons());
  }

  renderButtons() {
    const {
      t
    } = this.props;
    const {
      isValid
    } = this.state;
    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      onClick: this.onDiscard,
      label: t('Reset')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onCommit,
      label: t('Save')
    }));
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      address,
      isAddressValid,
      isNameValid,
      name
    } = this.state;
    return _react.default.createElement("div", {
      className: "grow"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "full",
      isError: !isAddressValid,
      label: t('add the following address'),
      onChange: this.onChangeAddress,
      value: address
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      isError: !isNameValid,
      label: t('name the entry'),
      onChange: this.onChangeName,
      value: name
    })));
  }

  emptyState() {
    return {
      address: '',
      isAddressExisting: false,
      isAddressValid: false,
      isNameValid: true,
      isValid: false,
      name: 'new address'
    };
  }

  nextState(newState) {
    let allowEdit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.setState((prevState, props) => {
      let {
        address = prevState.address,
        name = prevState.name
      } = newState;
      let isAddressValid = true;
      let isAddressExisting = false;
      let newAddress = address;

      try {
        newAddress = _uiKeyring.default.encodeAddress(_uiKeyring.default.decodeAddress(address));
        isAddressValid = _uiKeyring.default.isAvailable(newAddress);

        if (!isAddressValid) {
          const old = _uiKeyring.default.getAddress(newAddress);

          if (old.isValid) {
            if (!allowEdit) {
              name = old.getMeta().name || name;
            }

            isAddressExisting = true;
            isAddressValid = true;
          }
        }
      } catch (error) {
        isAddressValid = false;
      }

      const isNameValid = !!name;
      return {
        address: newAddress,
        isAddressExisting,
        isAddressValid,
        isNameValid,
        isValid: isAddressValid && isNameValid,
        name
      };
    });
  }

}

var _default = (0, _translate.default)(Creator);

exports.default = _default;