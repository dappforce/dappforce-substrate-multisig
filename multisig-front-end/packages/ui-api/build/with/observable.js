"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withObservable;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _echo = _interopRequireDefault(require("../transform/echo"));

var _util = require("../util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// FIXME proper types for attributes
function withObservable(observable) {
  let {
    callOnResult,
    propName = 'value',
    transform = _echo.default
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (Inner) {
    var _temp;

    let defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let render = arguments.length > 2 ? arguments[2] : undefined;
    return _temp = class WithObservable extends _react.default.Component {
      constructor() {
        super(...arguments);
        this.state = {
          callResult: void 0,
          callUpdated: false,
          callUpdatedAt: 0,
          subscriptions: []
        };

        this.triggerUpdate = (props, callResult) => {
          try {
            if ((0, _util.isEqual)(callResult, this.state.callResult)) {
              return;
            }

            (0, _util.triggerChange)(callResult, callOnResult, props.callOnResult || defaultProps.callOnResult);
            this.setState({
              callResult,
              callUpdated: true,
              callUpdatedAt: Date.now()
            });
          } catch (error) {
            console.error(this.props, error);
          }
        };
      }

      componentDidMount() {
        this.setState({
          subscriptions: [observable.pipe((0, _operators.map)(transform), (0, _operators.catchError)(() => (0, _rxjs.of)(undefined))).subscribe(value => this.triggerUpdate(this.props, value)), (0, _util.intervalObservable)(this)]
        });
      }

      componentWillUnmount() {
        this.state.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

      render() {
        const {
          children
        } = this.props;
        const {
          callUpdated,
          callUpdatedAt,
          callResult
        } = this.state;

        const _props = _objectSpread({}, defaultProps, {}, this.props, {
          callUpdated,
          callUpdatedAt,
          [propName]: callResult
        });

        return _react.default.createElement(Inner, _props, render && render(callResult), children);
      }

    }, _temp;
  };
}