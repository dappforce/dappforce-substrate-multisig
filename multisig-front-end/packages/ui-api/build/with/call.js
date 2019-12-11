"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCall;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _util2 = require("../util");

var _echo = _interopRequireDefault(require("../transform/echo"));

var _api = _interopRequireDefault(require("./api"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const NOOP = () => {// ignore
};

function withCall(endpoint) {
  let {
    at,
    atProp,
    callOnResult,
    params = [],
    paramName,
    paramValid = false,
    propName,
    transform = _echo.default
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Inner => {
    class WithPromise extends _react.default.Component {
      constructor(props) {
        super(props);
        this.state = {
          callResult: void 0,
          callUpdated: false,
          callUpdatedAt: 0
        };
        this.destroy = void 0;
        this.isActive = false;
        this.propName = void 0;
        this.timerId = -1;
        const [, section, method] = endpoint.split('.');
        this.propName = "".concat(section, "_").concat(method);
      }

      componentDidUpdate(prevProps) {
        const newParams = this.getParams(this.props);
        const oldParams = this.getParams(prevProps);

        if (this.isActive && !(0, _util2.isEqual)(newParams, oldParams)) {
          this.subscribe(newParams).then(NOOP).catch(NOOP);
        }
      }

      componentDidMount() {
        this.isActive = true;
        this.timerId = window.setInterval(() => {
          const elapsed = Date.now() - (this.state.callUpdatedAt || 0);
          const callUpdated = elapsed <= 1500;

          if (callUpdated !== this.state.callUpdated) {
            this.nextState({
              callUpdated
            });
          }
        }, 500);
        this.subscribe(this.getParams(this.props)).then(NOOP).catch(NOOP);
      }

      componentWillUnmount() {
        this.isActive = false;
        this.unsubscribe().then(NOOP).catch(NOOP);

        if (this.timerId !== -1) {
          clearInterval(this.timerId);
        }
      }

      nextState(state) {
        if (this.isActive) {
          this.setState(state);
        }
      }

      getParams(props) {
        const paramValue = paramName ? props[paramName] : undefined;

        if (atProp) {
          at = props[atProp];
        } // When we are specifying a param and have an invalid, don't use it. For 'params',
        // we default to the original types, i.e. no validation (query app uses this)


        if (!paramValid && paramName && ((0, _util.isUndefined)(paramValue) || (0, _util.isNull)(paramValue))) {
          return [false, []];
        }

        const values = (0, _util.isUndefined)(paramValue) ? params : params.concat(Array.isArray(paramValue) ? paramValue : [paramValue]);
        return [true, values];
      }

      getApiMethod(newParams) {
        const {
          api
        } = this.props;

        if (endpoint === 'subscribe') {
          const [fn, ...params] = newParams;
          return [fn, params, true];
        }

        const [area, section, method, ...others] = endpoint.split('.');
        (0, _util.assert)(area.length && section.length && method.length && others.length === 0, "Invalid API format, expected <area>.<section>.<method>, found ".concat(endpoint));
        (0, _util.assert)(['rpc', 'query', 'derive'].includes(area), "Unknown api.".concat(area, ", expected rpc, query or derive"));
        (0, _util.assert)(!at || area === 'query', 'Only able todo an at query on the api.query interface');
        const apiSection = api[area][section];
        (0, _util.assert)(apiSection && apiSection[method], "Unable to find api.".concat(area, ".").concat(section, ".").concat(method));
        const meta = apiSection[method].meta;

        if (area === 'query' && meta && meta.type.isMap) {
          const arg = newParams[0];
          (0, _util.assert)(!(0, _util.isUndefined)(arg) && !(0, _util.isNull)(arg) || meta.type.asMap.isLinked, "".concat(meta.name, " expects one argument"));
        }

        return [apiSection[method], newParams, area === 'derive' || area === 'query' && !at && !atProp || method.startsWith('subscribe')];
      }

      async subscribe(_ref) {
        let [isValid, newParams] = _ref;

        if (!isValid) {
          return;
        }

        const {
          api
        } = this.props;
        await api.isReady;

        try {
          const [apiMethod, params, isSubscription] = this.getApiMethod(newParams);
          (0, _util.assert)(at || !atProp, 'Unable to perform query on non-existent at hash');
          await this.unsubscribe();

          if (isSubscription) {
            this.destroy = await apiMethod(...params, value => this.triggerUpdate(this.props, value));
          } else {
            const value = at ? await apiMethod.at(at, ...params) : await apiMethod(...params);
            this.triggerUpdate(this.props, value);
          }
        } catch (error) {// console.error(endpoint, '::', error);
        }
      }

      async unsubscribe() {
        if (this.destroy) {
          this.destroy();
          this.destroy = undefined;
        }
      }

      triggerUpdate(props, value) {
        try {
          const callResult = (props.transform || transform)(value);

          if (!this.isActive || (0, _util2.isEqual)(callResult, this.state.callResult)) {
            return;
          }

          (0, _util2.triggerChange)(callResult, callOnResult, props.callOnResult);
          this.nextState({
            callResult,
            callUpdated: true,
            callUpdatedAt: Date.now()
          });
        } catch (error) {// console.error(endpoint, '::', error.message);
        }
      }

      render() {
        const {
          callUpdated,
          callUpdatedAt,
          callResult
        } = this.state;

        const _props = _objectSpread({}, this.props, {
          callUpdated,
          callUpdatedAt,
          [propName || this.propName]: callResult
        });

        return _react.default.createElement(Inner, _props);
      }

    }

    return (0, _api.default)(WithPromise);
  };
}