"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Proposal = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Proposal extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      extraFees: new _bn.default(0),
      extraAmount: new _bn.default(0),
      extraWarn: false,
      isBelowMinimum: false
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      deposit,
      democracy_minimumDeposit = new _bn.default(0),
      onChange
    } = _ref;
    const extraAmount = deposit instanceof _types.Compact ? deposit.toBn() : deposit;
    const isBelowMinimum = extraAmount.lt(democracy_minimumDeposit);
    const update = {
      extraAmount,
      extraFees: new _bn.default(0),
      extraWarn: isBelowMinimum
    };
    onChange(update);
    return _objectSpread({}, update, {
      isBelowMinimum
    });
  }

  render() {
    const {
      democracy_minimumDeposit = new _bn.default(0),
      t
    } = this.props;
    const {
      extraAmount,
      isBelowMinimum
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, isBelowMinimum ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "warning sign"
    }), t('The deposit is below the {{minimum}} minimum required for the proposal to be evaluated', {
      replace: {
        minimum: (0, _util.formatBalance)(democracy_minimumDeposit)
      }
    })) : undefined, extraAmount.isZero() ? undefined : _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "arrow right"
    }), t('The deposit of {{deposit}} will be reserved until the proposal is completed', {
      replace: {
        deposit: (0, _util.formatBalance)(extraAmount)
      }
    })));
  }

}

exports.Proposal = Proposal;

var _default = (0, _uiApi.withMulti)(Proposal, _translate.default, (0, _uiApi.withCall)('query.democracy.minimumDeposit'));

exports.default = _default;