"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _dfSettings = _interopRequireDefault(require("@polkadot/df-settings/"));

var _Backup = _interopRequireDefault(require("./Backup"));

var _ChangePass = _interopRequireDefault(require("./ChangePass"));

var _Forgetting = _interopRequireDefault(require("./Forgetting"));

var _translate = _interopRequireDefault(require("./translate"));

var _MyAccountContext = require("@polkadot/df-utils/MyAccountContext");

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Editor extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeAccount = accountId => {
      const current = accountId ? _uiKeyring.default.getPair(accountId) : null;
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
        onStatusChange,
        t
      } = this.props;
      const {
        current,
        editedName
      } = this.state;

      if (!current) {
        return;
      }

      const status = {
        account: current.address(),
        action: 'edit'
      };

      try {
        _uiKeyring.default.saveAccountMeta(current, {
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
      this.nextState({});
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

    this.toggleBackup = () => {
      this.setState((_ref) => {
        let {
          isBackupOpen
        } = _ref;
        return {
          isBackupOpen: !isBackupOpen
        };
      });
    };

    this.toggleForget = () => {
      this.setState((_ref2) => {
        let {
          isForgetOpen
        } = _ref2;
        return {
          isForgetOpen: !isForgetOpen
        };
      });
    };

    this.togglePass = () => {
      this.setState((_ref3) => {
        let {
          current,
          isPasswordOpen
        } = _ref3;

        if (!current) {
          return null;
        } // NOTE We re-get the account from the keyring, if changed it will load the
        // new instance (this is not quite obvious...)


        return {
          current: _uiKeyring.default.getPair(current.publicKey()),
          isPasswordOpen: !isPasswordOpen
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
          _uiKeyring.default.forgetAccount(current.address());

          status.status = 'success';
          status.message = t('key forgotten'); // Delete my current address (key) from the local sotorage:

          const myAccountCtx = this.context;
          myAccountCtx.forget(current.address());
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
    return _react.default.createElement("div", {
      className: "accounts--Editor"
    }, this.renderModals(), this.renderData(), this.renderButtons());
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
      isDisabled: isEdited,
      onClick: this.toggleBackup,
      label: t('Backup')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: isEdited,
      onClick: this.togglePass,
      label: t('Change Password')
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
    const type = current ? current.type : 'ed25519';
    return _react.default.createElement("div", {
      className: "ui--grid"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      className: "shrink",
      value: address || '',
      showFaucet: true
    }), _react.default.createElement("div", {
      className: "grow"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      hideAddress: true,
      isInput: false,
      label: t('using my key'),
      onChange: this.onChangeAccount,
      type: "account",
      value: address
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      isEditable: true,
      label: t('identified by the name'),
      onChange: this.onChangeName,
      value: editedName
    })), _react.default.createElement(_uiApp.Labelled, {
      label: "address:",
      style: {
        marginTop: '.5rem'
      }
    }, _react.default.createElement("code", null, address)), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: type,
      isDisabled: true,
      label: t('keypair crypto type'),
      options: _dfSettings.default.availableCryptos
    }))));
  }

  renderModals() {
    const {
      onStatusChange
    } = this.props;
    const {
      current,
      isBackupOpen,
      isForgetOpen,
      isPasswordOpen
    } = this.state;

    if (!current) {
      return null;
    }

    const address = current.address();
    const modals = [];

    if (isBackupOpen) {
      modals.push(_react.default.createElement(_Backup.default, {
        key: "modal-backup-account",
        onClose: this.toggleBackup,
        onStatusChange: onStatusChange,
        pair: current
      }));
    }

    if (isForgetOpen) {
      modals.push(_react.default.createElement(_Forgetting.default, {
        address: address,
        doForget: this.onForget,
        key: "modal-forget-account",
        onClose: this.toggleForget
      }));
    }

    if (isPasswordOpen) {
      modals.push(_react.default.createElement(_ChangePass.default, {
        account: current,
        key: "modal-change-pass",
        onClose: this.togglePass,
        onStatusChange: onStatusChange
      }));
    }

    return modals;
  }

  createState(current) {
    return {
      current,
      editedName: current ? current.getMeta().name || '' : '',
      isBackupOpen: false,
      isEdited: false,
      isForgetOpen: false,
      isPasswordOpen: false
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
        address: () => undefined
      };
      let isEdited = false;

      if (current) {
        if (current.address() !== previous.address()) {
          editedName = current.getMeta().name || '';
        } else if (editedName !== current.getMeta().name) {
          isEdited = true;
        }
      } else {
        editedName = '';
      }

      return {
        current,
        editedName,
        isBackupOpen: false,
        isEdited,
        isForgetOpen: false,
        isPasswordOpen: false
      };
    });
  }

}

Editor.contextType = _MyAccountContext.MyAccountContext;

var _default = (0, _translate.default)(Editor);

exports.default = _default;