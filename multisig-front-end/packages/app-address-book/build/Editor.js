"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _Forgetting = _interopRequireDefault(require("./Forgetting"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-address-book authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Editor extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeAddress = accountId => {
      const current = accountId && _uiKeyring.default.decodeAddress(accountId) ? _uiKeyring.default.getAddress(accountId) || null : null;
      this.nextState({
        current
      });
    };

    this.onChangeName = editedName => {
      this.nextState({
        editedName
      });
    };

    this.onCommit = () => {
      const {
        current,
        editedName
      } = this.state;
      const {
        onStatusChange,
        t
      } = this.props;

      if (!current) {
        return;
      }

      const status = {
        account: current.address(),
        action: 'edit'
      };

      try {
        _uiKeyring.default.saveAddress(current.address(), {
          name: editedName,
          whenEdited: Date.now()
        });

        status.status = current.getMeta().name === editedName ? 'success' : 'error';
        status.message = t('name edited');
      } catch (error) {
        status.status = 'error';
        status.message = error.message;
      }

      onStatusChange(status);
    };

    this.onDiscard = () => {
      const {
        current
      } = this.state;

      if (!current) {
        return;
      }

      this.nextState({
        editedName: current.getMeta().name
      });
    };

    this.toggleForget = () => {
      this.setState((_ref) => {
        let {
          isForgetOpen
        } = _ref;
        return {
          isForgetOpen: !isForgetOpen
        };
      });
    };

    this.onForget = () => {
      const {
        onStatusChange,
        t
      } = this.props;
      const {
        current
      } = this.state;

      if (!current) {
        return;
      }

      this.setState(this.createState(null), () => {
        const status = {
          account: current.address(),
          action: 'forget'
        };

        try {
          _uiKeyring.default.forgetAddress(current.address());

          status.status = 'success';
          status.message = t('address forgotten');
        } catch (error) {
          status.status = 'error';
          status.message = error.message;
        }

        onStatusChange(status);
      });
    };

    this.state = this.createState(null);
  }

  render() {
    const {
      isForgetOpen,
      current
    } = this.state;
    return _react.default.createElement("div", {
      className: "address-book--Editor"
    }, _react.default.createElement(_Forgetting.default, {
      isOpen: isForgetOpen,
      onClose: this.toggleForget,
      doForget: this.onForget,
      currentAddress: current
    }), this.renderData(), this.renderButtons());
  }

  renderButtons() {
    const {
      t
    } = this.props;
    const {
      current,
      isEdited
    } = this.state;

    if (!current) {
      return null;
    }

    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: this.toggleForget,
      label: t('Forget')
    }), _react.default.createElement(_uiApp.Button.Group.Divider, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isEdited,
      onClick: this.onDiscard,
      label: t('Reset')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isEdited,
      isPrimary: true,
      onClick: this.onCommit,
      label: t('Save')
    }));
  }

  renderData() {
    const {
      t
    } = this.props;
    const {
      current,
      editedName
    } = this.state;
    const address = current ? current.address() : undefined;
    return _react.default.createElement("div", {
      className: "ui--grid"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      className: "shrink",
      value: address || '',
      withBonded: true
    }), _react.default.createElement("div", {
      className: "grow"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      hideAddress: true,
      isInput: false,
      label: t('edit the selected address'),
      onChange: this.onChangeAddress,
      type: "address",
      value: address
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      label: t('identified by the name'),
      onChange: this.onChangeName,
      value: editedName
    })), _react.default.createElement(_uiApp.Labelled, {
      label: "address:",
      style: {
        marginTop: '.5rem'
      }
    }, _react.default.createElement("code", null, address))));
  }

  createState(current) {
    const {
      name = ''
    } = current ? current.getMeta() : {};
    return {
      current,
      editedName: name,
      isEdited: false,
      isForgetOpen: false
    };
  }

  nextState() {
    let newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.setState(prevState => {
      let {
        current = prevState.current,
        editedName = prevState.editedName
      } = newState;
      const previous = prevState.current || {
        address: () => null
      };
      let isEdited = false;

      if (current && current.isValid()) {
        if (current.address() !== previous.address()) {
          editedName = current.getMeta().name || '';
        } else if (editedName !== current.getMeta().name) {
          isEdited = true;
        }
      } else {
        editedName = '';
      }

      let isForgetOpen = false;
      return {
        current,
        editedName,
        isEdited,
        isForgetOpen
      };
    });
  }

}

var _default = (0, _translate.default)(Editor);

exports.default = _default;