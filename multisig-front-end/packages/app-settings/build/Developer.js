"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _store = _interopRequireDefault(require("store"));

var _types2 = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Developer extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.defaultCode = "{\n\n}";

    this.clearTypes = () => {
      _store.default.remove('types');

      this.setState({
        code: this.defaultCode,
        isJsonValid: true,
        isTypesValid: true,
        types: null,
        typesPlaceholder: undefined
      });
    };

    this.onChangeTypes = data => {
      const code = (0, _util.u8aToString)(data);

      try {
        const types = JSON.parse(code);
        const typesPlaceholder = Object.keys(types).join(', ');
        console.log('Registering types:', typesPlaceholder);
        (0, _types2.getTypeRegistry)().register(types);
        this.setState({
          code,
          isJsonValid: true,
          isTypesValid: true,
          types,
          typesPlaceholder
        });
      } catch (error) {
        console.error('Error registering types:', error);
        this.setState({
          code,
          isJsonValid: false,
          isTypesValid: false,
          types: null,
          typesPlaceholder: error.message
        });
      }
    };

    this.onEditTypes = code => {
      try {
        if (!(0, _util.isJsonObject)(code)) {
          throw Error(this.props.t('This is not a valid JSON object.'));
        }

        this.setState(prevState => _objectSpread({}, prevState, {
          code,
          isJsonValid: true
        }));
        this.onChangeTypes((0, _util.stringToU8a)(code));
      } catch (e) {
        this.setState(prevState => _objectSpread({}, prevState, {
          code,
          isJsonValid: false,
          typesPlaceholder: e.message
        }));
      }
    };

    this.saveDeveloper = () => {
      const {
        t
      } = this.props;
      const {
        isTypesValid,
        types
      } = this.state;
      const status = {
        status: 'success',
        action: t('Your custom types have been added')
      };

      if (isTypesValid) {
        _store.default.set('types', types);
      } else {
        status.status = 'error';
        status.action = t('Your custom types are invalid');
      }

      this.props.onStatusChange(status);
    };

    const _types = _store.default.get('types') || {};

    const names = Object.keys(_types);
    this.state = {
      code: Object.keys(_types).length ? JSON.stringify(_types, null, 2) : this.defaultCode,
      isJsonValid: true,
      isTypesValid: true,
      types: names.length ? _types : null,
      typesPlaceholder: names.length ? names.join(', ') : undefined
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      code,
      isJsonValid,
      isTypesValid,
      types,
      typesPlaceholder
    } = this.state;
    return _react.default.createElement("div", {
      className: "settings-Developer"
    }, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "full"
    }, _react.default.createElement(_uiApp.InputFile, {
      clearContent: !types && isTypesValid,
      isError: !isTypesValid,
      label: t('Upload your additional type definitions as a JSON file'),
      onChange: this.onChangeTypes,
      placeholder: typesPlaceholder
    }))), _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "full"
    }, _react.default.createElement(_uiApp.Labelled, {
      label: t('Manually enter your custom type definitions as valid JSON')
    }, _react.default.createElement(_uiApp.Editor, {
      className: "editor",
      code: code,
      isValid: isJsonValid,
      onEdit: this.onEditTypes
    })), ">")), _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !types,
      isNegative: true,
      onClick: this.clearTypes,
      label: t('Reset')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !isTypesValid || !isJsonValid,
      isPrimary: true,
      onClick: this.saveDeveloper,
      label: t('Save')
    })));
  }

}

var _default = (0, _translate.default)(Developer);

exports.default = _default;