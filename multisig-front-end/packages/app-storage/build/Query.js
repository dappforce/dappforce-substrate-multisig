"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _valueToText = _interopRequireDefault(require("@polkadot/ui-params/valueToText"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const cache = [];

class Query extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      spread: {}
    };

    this.onRemove = () => {
      const {
        onRemove,
        value: {
          id
        }
      } = this.props;
      delete cache[id];
      onRemove(id);
    };
  }

  static getCachedComponent(query) {
    const {
      id,
      key,
      params = []
    } = query;

    if (!cache[id]) {
      const values = params.map((_ref) => {
        let {
          value
        } = _ref;
        return value;
      });
      const type = key.meta ? key.meta.type.toString() : 'Data';
      const defaultProps = {
        className: 'ui--output'
      }; // render function to create an element for the query results which is plugged to the api

      const renderHelper = (0, _uiApi.withCallDiv)('subscribe', {
        paramName: 'params',
        paramValid: true,
        params: [key, ...values]
      });
      const Component = renderHelper( // By default we render a simple div node component with the query results in it
      value => (0, _valueToText.default)(type, value, true, true), defaultProps);
      cache[query.id] = Query.createComponent(type, Component, defaultProps, renderHelper);
    }

    return cache[id];
  }

  static createComponent(type, Component, defaultProps, renderHelper) {
    return {
      Component,
      // In order to replace the default component during runtime we can provide a RenderFn to create a new 'plugged' component
      render: createComponent => {
        return renderHelper(createComponent, defaultProps);
      },
      // In order to modify the parameters which are used to render the default component, we can use this method
      refresh: (swallowErrors, contentShorten) => {
        return renderHelper(value => (0, _valueToText.default)(type, value, swallowErrors, contentShorten), defaultProps);
      }
    };
  }

  static getDerivedStateFromProps(_ref2, prevState) {
    let {
      value
    } = _ref2;
    const Component = Query.getCachedComponent(value).Component;
    const inputs = (0, _util.isU8a)(value.key) ? [] // FIXME We need to render the actual key params
    // const { key, params } = value;
    // const inputs = key.params.map(({ name, type }, index) => (
    //   <span key={`param_${name}_${index}`}>
    //     {name}={valueToText(type, params[index].value)}
    //   </span>
    // ));
    : [];
    return {
      Component,
      inputs
    };
  }

  render() {
    const {
      value
    } = this.props;
    const {
      Component
    } = this.state;
    const {
      key
    } = value;
    const type = (0, _util.isU8a)(key) ? 'Data' : key.meta.modifier.isOptional ? "Option<".concat(key.meta.type, ">") : key.meta.type.toString();
    return _react.default.createElement("div", {
      className: "storage--Query storage--actionrow"
    }, _react.default.createElement("div", {
      className: "storage--actionrow-value"
    }, _react.default.createElement(_uiApp.Labelled, {
      label: _react.default.createElement("div", {
        className: "ui--Param-text"
      }, this.keyToName(key), ": ", type)
    }, _react.default.createElement(Component, null))), _react.default.createElement("div", {
      className: "storage--actionrow-buttons"
    }, _react.default.createElement("div", {
      className: "container"
    }, this.renderButtons())));
  }

  renderButtons() {
    const {
      id,
      key
    } = this.props.value;
    const buttons = [_react.default.createElement(_uiApp.Button, {
      icon: "close",
      isNegative: true,
      key: "close",
      onClick: this.onRemove
    })];

    if (key.meta && ['Bytes', 'Data'].includes(key.meta.type.toString())) {
      // TODO We are currently not performing a copy
      // buttons.unshift(
      //   <Button
      //     icon='copy'
      //     onClick={this.copyHandler(id)}
      //   />
      // );
      buttons.unshift(_react.default.createElement(_uiApp.Button, {
        icon: "ellipsis horizontal",
        key: "spread",
        onClick: this.spreadHandler(id)
      }));
    }

    return buttons;
  }

  keyToName(key) {
    if ((0, _util.isU8a)(key)) {
      const u8a = _types.Compact.stripLengthPrefix(key); // If the string starts with `:`, handle it as a pure string


      return u8a[0] === 0x3a ? (0, _util.u8aToString)(u8a) : (0, _util.u8aToHex)(u8a);
    }

    return "".concat(key.section, ".").concat(key.method);
  }

  spreadHandler(id) {
    return () => {
      const {
        spread
      } = this.state;
      cache[id].Component = cache[id].refresh(true, !!spread[id]);
      spread[id] = !spread[id];
      this.setState(_objectSpread({}, this.state, {}, spread, {
        Component: cache[id].Component
      }));
    };
  }

}

var _default = (0, _translate.default)(Query);

exports.default = _default;