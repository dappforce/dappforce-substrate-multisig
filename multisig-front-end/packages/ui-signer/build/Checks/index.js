"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FeeDisplay = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

var _Proposal = _interopRequireDefault(require("./Proposal"));

var _Transfer = _interopRequireDefault(require("./Transfer"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const LENGTH_PUBLICKEY = 32 + 1; // publicKey + prefix

const LENGTH_SIGNATURE = 64;
const LENGTH_ERA = 1;
const SIGNATURE_SIZE = LENGTH_PUBLICKEY + LENGTH_SIGNATURE + LENGTH_ERA;

class FeeDisplay extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      allFees: new _bn.default(0),
      allTotal: new _bn.default(0),
      allWarn: false,
      extraAmount: new _bn.default(0),
      extraFees: new _bn.default(0),
      extraWarn: false,
      hasAvailable: false,
      isRemovable: false,
      isReserved: false,
      overLimit: false
    };

    this.onExtraUpdate = extra => {
      this.setState(_objectSpread({}, extra));
    };
  }

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      accountId,
      balances_votingBalance = _constants.ZERO_BALANCE,
      extrinsic,
      balances_fees = _constants.ZERO_FEES,
      system_accountNonce = new _bn.default(0)
    } = _ref;

    if (!accountId || !extrinsic) {
      return null;
    }

    const fn = _types.Method.findFunction(extrinsic.callIndex);

    const extMethod = fn.method;
    const extSection = fn.section;
    const txLength = SIGNATURE_SIZE + (0, _util.compactToU8a)(system_accountNonce).length + (extrinsic ? extrinsic.encodedLength : 0);
    const isSameExtrinsic = prevState.extMethod === extMethod && prevState.extSection === extSection;
    const extraAmount = isSameExtrinsic ? prevState.extraAmount : new _bn.default(0);
    const extraFees = isSameExtrinsic ? prevState.extraFees : new _bn.default(0);
    const extraWarn = isSameExtrinsic ? prevState.extraWarn : false;
    const allFees = extraFees.add(balances_fees.transactionBaseFee).add(balances_fees.transactionByteFee.muln(txLength));
    const allTotal = extraAmount.add(allFees);
    const hasAvailable = balances_votingBalance.freeBalance.gte(allTotal);
    const isRemovable = balances_votingBalance.votingBalance.sub(allTotal).lte(balances_fees.existentialDeposit);
    const isReserved = balances_votingBalance.freeBalance.isZero() && balances_votingBalance.reservedBalance.gtn(0);
    const allWarn = extraWarn;
    const overLimit = txLength >= _constants.MAX_SIZE_BYTES;
    return {
      allFees,
      allTotal,
      allWarn,
      extMethod,
      extSection,
      extraAmount,
      extraFees,
      extraWarn,
      hasAvailable,
      isRemovable,
      isReserved,
      overLimit
    };
  }

  componentDidUpdate() {
    const {
      onChange
    } = this.props;
    const {
      hasAvailable
    } = this.state;
    onChange && onChange(hasAvailable);
  }

  render() {
    const {
      accountId,
      className,
      isSendable,
      t
    } = this.props;
    const {
      allFees,
      allTotal,
      allWarn,
      hasAvailable,
      isRemovable,
      isReserved,
      overLimit
    } = this.state;

    if (!accountId) {
      return null;
    }

    const feeClass = !hasAvailable || overLimit || isRemovable ? 'error' : allWarn ? 'warning' : 'normal'; // display all the errors, warning and information messages (in that order)

    return _react.default.createElement("article", {
      className: [className, feeClass, 'padded'].join(' '),
      key: "txinfo"
    }, isSendable ? undefined : _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "ban"
    }), t('The selected account does not exist on your keyring')), hasAvailable ? undefined : _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "ban"
    }), t('The selected account does not have the required balance available for this transaction')), overLimit ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "ban"
    }), t("This transaction will be rejected by the node as it is greater than the maximum size of ".concat(_constants.MAX_SIZE_MB, "MB")), ">") : undefined, isRemovable && hasAvailable ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "ban"
    }), t('Submitting this transaction will drop the account balance to below the existential amount, which can result in the account being removed from the chain state associated funds burned.')) : undefined, this.renderTransfer(), this.renderProposal(), isReserved ? _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "arrow right"
    }), t('This account does have a reserved/locked balance, not taken into account')) : undefined, _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "arrow right"
    }), t('Fees includes the transaction fee and the per-byte fee')), _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "arrow right"
    }), t('Fees totalling {{fees}} will be applied to the submission', {
      replace: {
        fees: (0, _util.formatBalance)(allFees)
      }
    })), _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "arrow right"
    }), t('{{total}} total transaction amount (fees + value)', {
      replace: {
        total: (0, _util.formatBalance)(allTotal)
      }
    })));
  }

  renderProposal() {
    const {
      extrinsic,
      balances_fees
    } = this.props;
    const {
      extMethod,
      extSection
    } = this.state;

    if (!balances_fees || !extrinsic || extSection !== 'democracy' || extMethod !== 'propose') {
      return null;
    }

    const [, deposit] = extrinsic.args;
    return _react.default.createElement(_Proposal.default, {
      deposit: deposit,
      fees: balances_fees,
      onChange: this.onExtraUpdate
    });
  }

  renderTransfer() {
    const {
      extrinsic,
      balances_fees
    } = this.props;
    const {
      extMethod,
      extSection
    } = this.state;

    if (!balances_fees || !extrinsic || extSection !== 'balances' || extMethod !== 'transfer') {
      return null;
    }

    const [recipientId, amount] = extrinsic.args;
    return _react.default.createElement(_Transfer.default, {
      amount: amount,
      fees: balances_fees,
      recipientId: recipientId,
      onChange: this.onExtraUpdate
    });
  }

}

exports.FeeDisplay = FeeDisplay;

var _default = (0, _translate.default)((0, _uiApi.withCalls)('derive.balances.fees', ['derive.balances.votingBalance', {
  paramName: 'accountId'
}], ['query.system.accountNonce', {
  paramName: 'accountId'
}])(FeeDisplay));

exports.default = _default;