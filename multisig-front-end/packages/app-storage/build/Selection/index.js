"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _uiApp = require("@polkadot/ui-app");

var _Modules = _interopRequireDefault(require("./Modules"));

var _Raw = _interopRequireDefault(require("./Raw"));

var _translate = _interopRequireDefault(require("../translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let id = -1;

class Selection extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    this.onAdd = query => {
      const {
        onAdd
      } = this.props;
      onAdd(_objectSpread({}, query, {
        id: ++id
      }));
    };

    const {
      t
    } = this.props;
    this.state = {
      items: [{
        name: 'modules',
        text: t('Modules')
      }, {
        name: 'raw',
        text: t('Raw key')
      }]
    };
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      items
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      items: items
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/raw"),
      render: this.renderComponent(_Raw.default)
    }), _react.default.createElement(_reactRouter.Route, {
      render: this.renderComponent(_Modules.default)
    })));
  }

  renderComponent(Component) {
    return () => {
      return _react.default.createElement(Component, {
        onAdd: this.onAdd
      });
    };
  }

}

var _default = (0, _translate.default)(Selection);

exports.default = _default;