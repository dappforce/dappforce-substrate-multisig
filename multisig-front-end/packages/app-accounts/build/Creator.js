"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressFromSeed = addressFromSeed;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _InputAddress = require("@polkadot/ui-app/InputAddress");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _dfSettings = _interopRequireDefault(require("@polkadot/df-settings/"));

var _util = require("@polkadot/util");

var _utilCrypto = require("@polkadot/util-crypto");

var _translate = _interopRequireDefault(require("./translate"));

var _dfUtils = require("@polkadot/df-utils/");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_TYPE = 'ed25519';

function deriveValidate(derivePath, pairType) {
  try {
    const {
      path
    } = (0, _utilCrypto.keyExtractPath)(derivePath); // we don't allow soft for ed25519

    if (pairType === 'ed25519') {
      const firstSoft = path.find((_ref) => {
        let {
          isSoft
        } = _ref;
        return isSoft;
      });

      if (firstSoft) {
        return 'Soft derivation paths are not allowed on ed25519';
      }
    }
  } catch (error) {
    return error.message;
  }

  return null;
}

function isHexSeed(seed) {
  return (0, _util.isHex)(seed) && seed.length === 66;
}

function rawValidate(seed) {
  return seed.length <= 32 || isHexSeed(seed);
}

function addressFromSeed(phrase, derivePath, pairType) {
  return _uiKeyring.default.createFromUri("".concat(phrase).concat(derivePath), {}, pairType).address();
}

class Creator extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      seedType: 'bip'
    };

    this.onChangeDerive = derivePath => {
      this.nextState({
        derivePath
      });
    };

    this.onChangeName = name => {
      this.nextState({
        name
      });
    };

    this.onChangePass = password => {
      this.nextState({
        password
      });
    };

    this.onChangeSeed = seed => {
      this.nextState({
        seed
      });
    };

    this.onChangePairType = pairType => {
      this.nextState({
        pairType
      });
    };

    this.onShowWarning = () => {
      this.nextState({
        showWarning: true
      });
    };

    this.onHideWarning = () => {
      this.nextState({
        showWarning: false
      });
    };

    this.onCommit = () => {
      const {
        basePath,
        onStatusChange,
        t
      } = this.props;
      const {
        derivePath,
        name,
        pairType,
        password,
        seed
      } = this.state;
      const status = {
        action: 'create'
      };

      try {
        const {
          json,
          pair
        } = _uiKeyring.default.addUri("".concat(seed).concat(derivePath), password, {
          name
        }, pairType);

        const blob = new Blob([JSON.stringify(json)], {
          type: 'application/json; charset=utf-8'
        });

        _fileSaver.default.saveAs(blob, "".concat(pair.address(), ".json"));

        status.account = pair.address();
        status.status = pair ? 'success' : 'error';
        status.message = t('created key');

        _InputAddress.InputAddress.setLastValue('account', pair.address());
      } catch (error) {
        status.status = 'error';
        status.message = error.message;
      }

      this.onHideWarning();
      onStatusChange(status);
      window.location.hash = basePath;
    };

    this.onDiscard = () => {
      this.setState((_ref2) => {
        let {
          pairType
        } = _ref2;
        return this.emptyState(null, '', pairType);
      });
    };

    this.selectSeedType = seedType => {
      if (seedType === this.state.seedType) {
        return;
      }

      this.setState((_ref3) => {
        let {
          derivePath,
          pairType
        } = _ref3;
        return _objectSpread({}, this.generateSeed(null, derivePath, seedType, pairType), {
          seedType
        });
      });
    };

    const {
      match: {
        params: {
          seed: _seed2
        }
      },
      t: _t
    } = this.props;
    this.state = _objectSpread({}, this.emptyState(_seed2 || null, '', DEFAULT_TYPE), {
      seedOptions: [{
        value: 'bip',
        text: _t('Mnemonic')
      }, {
        value: 'raw',
        text: _t('Raw seed')
      }]
    });
  }

  render() {
    const {
      address,
      isSeedValid
    } = this.state;
    return _react.default.createElement("div", {
      className: "accounts--Creator"
    }, _react.default.createElement("div", {
      className: "ui--grid"
    }, _react.default.createElement(_uiApp.AddressSummary, {
      className: "shrink",
      value: isSeedValid ? address : '',
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
      label: t('Reset'),
      onClick: this.onDiscard
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isValid,
      isPrimary: true,
      label: t('Save'),
      onClick: this.onShowWarning
    }));
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      deriveError,
      derivePath,
      isNameValid,
      isPassValid,
      isSeedValid,
      name,
      pairType,
      password,
      seed,
      seedOptions,
      seedType,
      showWarning
    } = this.state;
    return _react.default.createElement("div", {
      className: "grow"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "full",
      isError: !isNameValid,
      label: t('name your key'),
      onChange: this.onChangeName,
      value: name
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      isAction: true,
      isError: !isSeedValid,
      label: seedType === 'bip' ? t('create from the following mnemonic seed') : t('create from the following seed (hex or string)'),
      onChange: this.onChangeSeed,
      value: seed
    }, _react.default.createElement(_uiApp.Dropdown, {
      isButton: true,
      defaultValue: seedType,
      onChange: this.selectSeedType,
      options: seedOptions
    }))), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Password, {
      className: "full",
      isError: !isPassValid,
      label: t('your password for this key'),
      onChange: this.onChangePass,
      value: password
    })), (0, _dfUtils.isEmptyStr)(password) && _react.default.createElement(_uiApp.Labelled, {
      label: ""
    }, _react.default.createElement("article", {
      className: "warning"
    }, "Although it is recommended to use a password to protect your key, you can still leave it empty.")), _react.default.createElement("details", {
      className: "accounts--Creator-advanced",
      open: _dfSettings.default.isFullMode
    }, _react.default.createElement("summary", null, t('Advanced creation options')), _react.default.createElement("div", {
      className: "ui--Params"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: pairType,
      label: t('keypair crypto type'),
      onChange: this.onChangePairType,
      options: _dfSettings.default.availableCryptos
    })), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      className: "full",
      isError: !!deriveError,
      label: t('secret derivation path'),
      onChange: this.onChangeDerive,
      value: derivePath
    })), deriveError ? _react.default.createElement(_uiApp.Labelled, {
      label: ""
    }, _react.default.createElement("article", {
      className: "error"
    }, deriveError)) : null, pairType === 'sr25519' && _react.default.createElement(_uiApp.Labelled, {
      label: ""
    }, _react.default.createElement("article", {
      className: "warning"
    }, "Choosing Schnorrkel (sr25519) will restrict your key from certain uses")))), _react.default.createElement(_uiApp.Modal, {
      className: "app--accounts-Modal",
      dimmer: "inverted",
      open: showWarning,
      size: "small"
    }, this.renderModalContent(), this.renderModalButtons()));
  }

  renderModalButtons() {
    const {
      t
    } = this.props;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      label: t('Cancel'),
      onClick: this.onHideWarning
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isPrimary: true,
      label: t('Create and backup key'),
      onClick: this.onCommit
    })));
  }

  renderModalContent() {
    const {
      t
    } = this.props;
    const {
      address
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Important notice!')), _react.default.createElement(_uiApp.Modal.Content, null, t('We will provide you with a generated backup file after your key is created. As long as you have access to your key you can always redownload this file later.'), _react.default.createElement(_uiApp.Modal.Description, null, t('Please make sure to save this file in a secure location as it is the only way to restore your key.')), _react.default.createElement(_uiApp.AddressSummary, {
      className: "accounts--Modal-Address",
      value: address
    })));
  }

  generateSeed(_seed, derivePath, seedType, pairType) {
    const seed = seedType === 'bip' ? (0, _utilCrypto.mnemonicGenerate)() : _seed || (0, _util.u8aToHex)((0, _utilCrypto.randomAsU8a)());
    const address = addressFromSeed(seed, derivePath, pairType);
    return {
      address,
      deriveError: null,
      derivePath,
      seed
    };
  }

  emptyState(seed, derivePath, pairType) {
    const seedType = seed ? 'raw' : this.state.seedType;
    return _objectSpread({}, this.generateSeed(seed, derivePath, seedType, pairType), {
      isNameValid: true,
      isPassValid: true,
      isSeedValid: true,
      isValid: false,
      name: 'new keypair',
      password: '',
      pairType,
      seedType,
      showWarning: false
    });
  }

  nextState(newState) {
    this.setState((prevState, props) => {
      const {
        derivePath = prevState.derivePath,
        name = prevState.name,
        pairType = prevState.pairType,
        password = prevState.password,
        seed = prevState.seed,
        seedOptions = prevState.seedOptions,
        seedType = prevState.seedType,
        showWarning = prevState.showWarning
      } = newState;
      let address = prevState.address;
      const deriveError = deriveValidate(derivePath, pairType);
      const isNameValid = !!name;
      const isSeedValid = seedType === 'bip' ? (0, _utilCrypto.mnemonicValidate)(seed) : rawValidate(seed);

      const isPassValid = (0, _dfUtils.isEmptyStr)(password) || _uiKeyring.default.isPassValid(password);

      if (!deriveError && isSeedValid && (seed !== prevState.seed || derivePath !== prevState.derivePath || pairType !== prevState.pairType)) {
        address = addressFromSeed(seed, derivePath, pairType);
      }

      return {
        address,
        deriveError,
        derivePath,
        isNameValid,
        isPassValid,
        isSeedValid,
        isValid: isNameValid && isPassValid && isSeedValid,
        name,
        pairType,
        password,
        seed,
        seedOptions,
        seedType,
        showWarning
      };
    });
  }

}

var _default = (0, _translate.default)(Creator);

exports.default = _default;