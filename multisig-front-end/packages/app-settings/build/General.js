"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _dfSettings = _interopRequireDefault(require("@polkadot/df-settings/"));

require("./index.css");

var _translate = _interopRequireDefault(require("./translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class General extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    this.renderEndpoint = () => {
      const {
        t
      } = this.props;
      const {
        isCustomNode,
        isUrlValid,
        settings: {
          apiUrl
        }
      } = this.state;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Button.Group, {
        isBasic: true
      }, _react.default.createElement(_uiApp.Button, {
        isBasic: true,
        isNegative: !isCustomNode,
        label: t('preset'),
        onClick: this.toggleCustomNode
      }), _react.default.createElement(_uiApp.Button, {
        isBasic: true,
        isNegative: isCustomNode,
        label: t('custom'),
        onClick: this.toggleCustomNode
      })), _react.default.createElement("div", {
        className: "ui--row"
      }, isCustomNode ? _react.default.createElement(_uiApp.Input, {
        defaultValue: apiUrl,
        isError: !isUrlValid,
        label: t('remote node/endpoint to connect to'),
        onChange: this.onChangeApiUrl
      }) : _react.default.createElement(_uiApp.Dropdown, {
        defaultValue: apiUrl,
        label: t('remote node/endpoint to connect to'),
        onChange: this.onChangeApiUrl,
        options: _dfSettings.default.availableNodes
      })));
    };

    this.onChangeApiUrl = apiUrl => {
      this.setState((_ref) => {
        let {
          settings
        } = _ref;
        return {
          isUrlValid: this.isValidUrl(apiUrl),
          settings: _objectSpread({}, settings, {
            apiUrl
          })
        };
      });
    };

    this.onChangeUiMode = uiMode => {
      this.setState((_ref2) => {
        let {
          settings
        } = _ref2;
        return {
          settings: _objectSpread({}, settings, {
            uiMode
          })
        };
      });
    };

    this.onChangeUiTheme = uiTheme => {
      this.setState((_ref3) => {
        let {
          settings
        } = _ref3;
        return {
          settings: _objectSpread({}, settings, {
            uiTheme
          })
        };
      });
    };

    this.toggleCustomNode = () => {
      this.setState((_ref4) => {
        let {
          isCustomNode,
          settings
        } = _ref4;
        // reset URL to a preset when toggled to preset
        const apiUrl = isCustomNode ? _dfSettings.default.availableNodes[0].value : settings.apiUrl;
        return {
          isCustomNode: !isCustomNode,
          isUrlValid: true,
          settings: _objectSpread({}, settings, {
            apiUrl
          })
        };
      });
    };

    this.saveAndReload = () => {
      const {
        settings
      } = this.state;

      _dfSettings.default.set(settings); // HACK This is terribe, but since the API needs to re-connect, but since
      // the API does not yet handle re-connections properly, it is what it is


      window.location.reload();
    };

    const _settings = _dfSettings.default.get();

    let _isCustomNode = true; // check to see if user has saved a custom node by seeing if their URL is equal to any preset

    for (let i = 0; i < _dfSettings.default.availableNodes.length; i++) {
      if (_dfSettings.default.availableNodes[i].value === _settings.apiUrl) {
        _isCustomNode = false;
      }
    }

    this.state = {
      isCustomNode: _isCustomNode,
      isUrlValid: this.isValidUrl(_settings.apiUrl),
      settings: _settings
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isUrlValid,
      settings: {
        i18nLang,
        uiMode,
        uiTheme
      }
    } = this.state;
    return _react.default.createElement("div", {
      className: "settings-General"
    }, this.renderEndpoint(), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "medium"
    }, _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: uiTheme,
      label: t('default interface theme'),
      onChange: this.onChangeUiTheme,
      options: _dfSettings.default.availableUIThemes
    })), _react.default.createElement("div", {
      className: "medium"
    }, _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: uiMode,
      label: t('interface operation mode'),
      onChange: this.onChangeUiMode,
      options: _dfSettings.default.availableUIModes
    }))), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "full"
    }, _react.default.createElement(_uiApp.Dropdown, {
      defaultValue: i18nLang,
      isDisabled: true,
      label: t('default interface language'),
      options: _dfSettings.default.availableLanguages
    }))), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isUrlValid,
      isPrimary: true,
      onClick: this.saveAndReload,
      label: t('Save & Reload')
    })));
  }

  isValidUrl(apiUrl) {
    return (// some random length... we probably want to parse via some lib
      apiUrl.length >= 7 && ( // check that it starts with a valid ws identifier
      apiUrl.startsWith('ws://') || apiUrl.startsWith('wss://'))
    );
  }

}

var _default = (0, _translate.default)(General);

exports.default = _default;