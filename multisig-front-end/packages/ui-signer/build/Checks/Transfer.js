"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Transfer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Transfer extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      extraFees: new _bn.default(0),
      extraAmount: new _bn.default(0),
      extraWarn: false,
      isCreation: false,
      isNoEffect: false
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      amount,
      balances_votingBalance = _constants.ZERO_BALANCE,
      fees,
      onChange
    } = _ref;
    let extraFees = new _bn.default(fees.transferFee);

    if (balances_votingBalance.votingBalance.isZero()) {
      extraFees = extraFees.add(fees.creationFee);
    }

    const extraAmount = amount instanceof _types.Compact ? amount.toBn() : new _bn.default(amount);
    const isCreation = balances_votingBalance.votingBalance.isZero() && fees.creationFee.gtn(0);
    const isNoEffect = extraAmount.add(balances_votingBalance.votingBalance).lte(fees.existentialDeposit);
    const extraWarn = isCreation || isNoEffect;
    const update = {
      extraAmount,
      extraFees,
      extraWarn
    };
    onChange(update);
    return _objectSpread({}, update, {
      isCreation,
      isNoEffect
    });
  }

  render() {
    const {
      fees,
      t
    } = this.props;
    const {
      isCreation,
      isNoEffect
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, isNoEffect ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "warning sign"
    }), t('The final recipient balance is less than the existential amount and will not be reflected')) : undefined, isCreation ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "warning sign"
    }), t('A fee of {{creationFee}} will be deducted from the sender since the destination account does not exist', {
      replace: {
        creationFee: (0, _util.formatBalance)(fees.creationFee)
      }
    })) : undefined);
  }

}

exports.Transfer = Transfer;

var _default = (0, _uiApi.withMulti)(Transfer, _translate.default, (0, _uiApi.withCall)('derive.balances.votingBalance', {
  paramName: 'recipientId'
}));

exports.default = _default;