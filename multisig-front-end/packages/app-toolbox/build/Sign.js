"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _util = require("@polkadot/util");

var _Unlock = _interopRequireDefault(require("./Unlock"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Sign extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.nextState = newState => {
      this.setState(prevState => {
        const {
          currentPair = prevState.currentPair,
          data = prevState.data,
          isHexData = prevState.isHexData,
          isUnlockVisible = prevState.isUnlockVisible
        } = newState;
        const isLocked = !currentPair || currentPair.isLocked();
        let signature = '';

        if (!isLocked && currentPair) {
          signature = (0, _util.u8aToHex)(currentPair.sign(isHexData ? (0, _util.hexToU8a)(data) : (0, _util.stringToU8a)(data)));
        }

        return {
          currentPair,
          data,
          isHexData,
          isLocked,
          isUnlockVisible,
          signature
        };
      });
    };

    this.toggleUnlock = () => {
      const {
        isUnlockVisible
      } = this.state;
      this.nextState({
        isUnlockVisible: !isUnlockVisible
      });
    };

    this.onChangeAccount = accountId => {
      const currentPair = _uiKeyring.default.getPair(accountId);

      this.nextState({
        currentPair
      });
    };

    this.onChangeData = data => {
      const isHexData = (0, _util.isHex)(data);
      this.nextState({
        data,
        isHexData
      });
    };

    const pairs = _uiKeyring.default.getPairs();

    const _currentPair = pairs[0] || null;

    this.state = {
      currentPair: _currentPair,
      defaultValue: _currentPair ? _currentPair.address() : void 0,
      data: '',
      isHexData: false,
      isLocked: _currentPair ? _currentPair.isLocked() : false,
      isUnlockVisible: false,
      signature: ''
    };
  }

  render() {
    return _react.default.createElement("div", {
      className: "toolbox--Sign"
    }, this.renderAccount(), this.renderInput(), this.renderSignature(), this.renderUnlock(), this.renderButtons());
  }

  renderAccount() {
    const {
      t
    } = this.props;
    const {
      defaultValue
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      defaultValue: defaultValue,
      isInput: false,
      label: t('using my account'),
      onChange: this.onChangeAccount,
      type: "account"
    }));
  }

  renderButtons() {
    const {
      t
    } = this.props;
    const {
      isLocked
    } = this.state;

    if (!isLocked) {
      return null;
    }

    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isPrimary: true,
      onClick: this.toggleUnlock,
      label: t('Unlock account')
    }));
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      data,
      isHexData
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "large",
      label: t('sign the following data (hex or string)'),
      onChange: this.onChangeData,
      value: data
    }), _react.default.createElement(_uiApp.Static, {
      className: "small",
      label: t('hex input data'),
      value: isHexData ? t('Yes') : t('No')
    }));
  }

  renderSignature() {
    const {
      t
    } = this.props;
    const {
      signature
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Output, {
      className: "full toolbox--hex",
      isHidden: signature.length === 0,
      label: t('signature of supplied data'),
      value: signature,
      withCopy: true
    }));
  }

  renderUnlock() {
    const {
      currentPair,
      isUnlockVisible
    } = this.state;

    if (!isUnlockVisible) {
      return null;
    }

    return _react.default.createElement(_Unlock.default, {
      onClose: this.toggleUnlock,
      pair: currentPair
    });
  }

}

var _default = (0, _translate.default)(Sign);

exports.default = _default;