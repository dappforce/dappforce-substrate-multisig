"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _addresses = _interopRequireDefault(require("@polkadot/ui-keyring/observable/addresses"));

var _Tabs = _interopRequireDefault(require("@polkadot/ui-app/Tabs"));

var _uiApi = require("@polkadot/ui-api");

var _Creator = _interopRequireDefault(require("./Creator"));

var _Editor = _interopRequireDefault(require("./Editor"));

var _translate = _interopRequireDefault(require("./translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class AddressBookApp extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;
    const {
      allAddresses = {},
      t
    } = props;
    const baseState = Object.keys(allAddresses).length !== 0 ? AddressBookApp.showEditState() : AddressBookApp.hideEditState();
    this.state = _objectSpread({}, baseState, {
      items: [{
        name: 'edit',
        text: t('Edit contact')
      }, {
        name: 'create',
        text: t('Add contact')
      }]
    });
  }

  static showEditState() {
    return {
      hidden: []
    };
  }

  static hideEditState() {
    return {
      hidden: ['edit']
    };
  }

  static getDerivedStateFromProps(_ref, _ref2) {
    let {
      allAddresses = {}
    } = _ref;
    let {
      hidden
    } = _ref2;
    const hasAddresses = Object.keys(allAddresses).length !== 0;

    if (hidden.length === 0) {
      return hasAddresses ? null : AddressBookApp.hideEditState();
    }

    return hasAddresses ? AddressBookApp.showEditState() : null;
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      hidden,
      items
    } = this.state;
    const renderCreator = this.renderComponent(_Creator.default);
    return _react.default.createElement("main", {
      className: "address-book--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_Tabs.default, {
      basePath: basePath,
      hidden: hidden,
      items: items
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/create"),
      render: renderCreator
    }), _react.default.createElement(_reactRouter.Route, {
      render: hidden.includes('edit') ? renderCreator : this.renderComponent(_Editor.default)
    })));
  }

  renderComponent(Component) {
    return () => {
      const {
        basePath,
        location,
        onStatusChange
      } = this.props;
      return _react.default.createElement(Component, {
        basePath: basePath,
        location: location,
        onStatusChange: onStatusChange
      });
    };
  }

}

var _default = (0, _uiApi.withMulti)(AddressBookApp, _translate.default, (0, _uiApi.withObservable)(_addresses.default.subject, {
  propName: 'allAddresses'
}));

exports.default = _default;