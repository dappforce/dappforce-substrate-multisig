"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dfSettings = _interopRequireDefault(require("@polkadot/df-settings/"));

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _accounts = _interopRequireDefault(require("@polkadot/ui-keyring/observable/accounts"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _Creator = _interopRequireDefault(require("./Creator"));

var _Editor = _interopRequireDefault(require("./Editor"));

var _Restore = _interopRequireDefault(require("./Restore"));

var _Vanity = _interopRequireDefault(require("./Vanity"));

var _translate = _interopRequireDefault(require("./translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class AccountsApp extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;
    const {
      allAccounts = {},
      t
    } = props;
    const baseState = Object.keys(allAccounts).length !== 0 ? AccountsApp.showEditState() : AccountsApp.hideEditState();
    this.state = _objectSpread({}, baseState, {
      tabs: [{
        name: 'edit',
        text: t('Default key')
      }, {
        hasParams: true,
        name: 'create',
        text: t('Create key')
      }, {
        name: 'restore',
        text: t('Restore key')
      }, _dfSettings.default.isBasicMode ? null : {
        name: 'vanity',
        text: t('Vanity address')
      }].filter(x => x !== null)
    });
  }

  static showEditState() {
    return {
      hidden: []
    };
  }

  static hideEditState() {
    // Hide vanity as well - since the route order and matching changes, the
    // /create/:seed route become problematic, so don't allow that option
    return {
      hidden: ['edit', 'vanity']
    };
  }

  static getDerivedStateFromProps(_ref, _ref2) {
    let {
      allAccounts = {}
    } = _ref;
    let {
      hidden
    } = _ref2;
    const hasAddresses = Object.keys(allAccounts).length !== 0;

    if (hidden.length === 0) {
      return hasAddresses ? null : AccountsApp.hideEditState();
    }

    return hasAddresses ? AccountsApp.showEditState() : null;
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      hidden,
      tabs
    } = this.state;
    const renderCreator = this.renderComponent(_Creator.default);
    return _react.default.createElement("main", {
      className: "accounts--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: tabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/create/:seed"),
      render: renderCreator
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/create"),
      render: renderCreator
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/restore"),
      render: this.renderComponent(_Restore.default)
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/vanity"),
      render: this.renderComponent(_Vanity.default)
    }), _react.default.createElement(_reactRouter.Route, {
      render: hidden.includes('edit') ? renderCreator : this.renderComponent(_Editor.default)
    })));
  }

  renderComponent(Component) {
    return (_ref3) => {
      let {
        match
      } = _ref3;
      const {
        basePath,
        location,
        onStatusChange
      } = this.props;
      return _react.default.createElement(Component, {
        basePath: basePath,
        location: location,
        match: match,
        onStatusChange: onStatusChange
      });
    };
  }

}

var _default = (0, _uiApi.withMulti)(AccountsApp, _translate.default, (0, _uiApi.withObservable)(_accounts.default.subject, {
  propName: 'allAccounts'
}));

exports.default = _default;