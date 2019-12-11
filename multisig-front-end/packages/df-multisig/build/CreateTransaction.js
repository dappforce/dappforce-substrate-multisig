"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _formik = require("formik");

var Yup = _interopRequireWildcard(require("yup"));

var _bn = _interopRequireDefault(require("bn.js"));

var _TxButton = _interopRequireDefault(require("@polkadot/df-utils/TxButton"));

var _uiApi = require("@polkadot/ui-api");

var DfForms = _interopRequireWildcard(require("@polkadot/df-utils/forms"));

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _translate = _interopRequireDefault(require("./translate"));

var _utils = require("./utils");

const MAX_NOTES_LENGTH = 53;
const LabelledField = DfForms.LabelledField();

const buildSchema = () => Yup.object().shape({
  txValue: Yup.number().min(1, 'Min transaction value should not be less than 1'),
  notes: Yup.string().max(MAX_NOTES_LENGTH, "The note is too long. Max note length is ".concat(MAX_NOTES_LENGTH))
});

const InnerTransfer = props => {
  const {
    currentWalletId,
    t,
    values,
    setFieldValue,
    setFieldError,
    isValid,
    isSubmitting,
    setSubmitting,
    history
  } = props;
  const {
    txValue,
    notes
  } = values;
  const [senderAddress] = (0, _react.useState)(currentWalletId);
  const [currentWallet, setCurrentWallet] = (0, _react.useState)(null);
  const [recipientAddress, setRecipientAddress] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (senderAddress === null) return; // tslint:disable-next-line: no-floating-promises

    _uiApi.api.query.multisigWalletModule.walletById(senderAddress, walletOpt => {
      if (walletOpt.isSome) {
        const wallet = walletOpt.unwrap();
        setCurrentWallet(wallet);
      }
    });
  }, [senderAddress]);

  const onChangeTo = recipientAddress => {
    console.log(recipientAddress);
    setRecipientAddress(recipientAddress);
  };

  const onChangeAmount = value => {
    if (!value || !currentWallet) return;
    const data = value.toNumber();
    console.log(data);

    if (value.gt(currentWallet.max_tx_value)) {
      setFieldError('txValue', "Max transaction value should be less than ".concat(currentWallet.max_tx_value.toString()));
      setFieldValue('txValue', data, false);
    } else {
      setFieldValue('txValue', data);
    }
  };

  const onChangeNotes = value => {
    setFieldValue('notes', value);
  };

  const renderAddress = (accountId, media) => {
    if (!accountId) {
      return null;
    }

    try {
      _uiKeyring.default.decodeAddress(accountId);
    } catch (err) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "transfer--Transfer-address ui--media-".concat(media)
    }, _react.default.createElement(_uiApp.AddressSummary, {
      value: accountId,
      withCopy: false
    }));
  };

  const onSubmit = sendTx => {
    setSubmitting(false);
    sendTx();
  };

  const onTxCancelled = () => {
    setSubmitting(false);
  };

  const onTxFailed = _txResult => {
    setSubmitting(false);
  };

  const onTxSuccess = _txResult => {
    setSubmitting(false);
    goToView();
  };

  const goToView = () => {
    if (history && currentWallet) {
      history.push("/wallet/".concat(currentWalletId));
    }
  };

  const buildTxParams = () => {
    if (!isValid) return [];
    return [currentWalletId, recipientAddress, txValue, notes];
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_formik.Form, null, _react.default.createElement("div", {
    className: "transfer--Transfer-info DfTransfer"
  }, renderAddress(senderAddress, 'medium'), _react.default.createElement("div", {
    className: "transfer--Transfer-data"
  }, _react.default.createElement(_uiApp.InputAddress, {
    label: t('to the recipient address'),
    default: null,
    onChange: onChangeTo,
    type: "all"
  }), _react.default.createElement(LabelledField, (0, _extends2.default)({
    name: "txValue"
  }, props), _react.default.createElement(_formik.Field, {
    component: _uiApp.InputBalance,
    name: txValue,
    autoFocus: true,
    label: t('value of transaction'),
    onChange: onChangeAmount
  })), _react.default.createElement(LabelledField, (0, _extends2.default)({
    name: "notes"
  }, props), _react.default.createElement(_formik.Field, {
    component: _uiApp.Input,
    id: "notes",
    name: notes,
    label: t('notes'),
    placeholder: "Add notes for your transaction",
    onChange: onChangeNotes
  })), _react.default.createElement(_uiApp.Labelled, {
    style: {
      marginTop: '.5rem'
    },
    label: '',
    withLabel: true
  }, _react.default.createElement(_TxButton.default, {
    type: "submit",
    size: "large",
    label: 'Submit a transaction',
    isDisabled: isSubmitting,
    params: buildTxParams(),
    onClick: onSubmit,
    txCancelledCb: onTxCancelled,
    txFailedCb: onTxFailed,
    txSuccessCb: onTxSuccess,
    tx: 'wallet.submitTransaction'
  }))), _react.default.createElement("div", {
    className: "ui--AddressSummary-base right"
  }, renderAddress(recipientAddress, 'medium')))));
};

const ValidationForm = (0, _formik.withFormik)({
  mapPropsToValues: props => {
    const {
      txValue,
      notes
    } = props;

    if (txValue && notes) {
      return {
        txValue,
        notes
      };
    } else {
      return {
        txValue: new _bn.default(0),
        notes: ''
      };
    }
  },
  validationSchema: buildSchema,
  handleSubmit: values => {// do submitting things
  }
})(InnerTransfer);

function withWalletIdFromUrl(Component) {
  return function (props) {
    const {
      match: {
        params: {
          id
        }
      }
    } = props;

    try {
      return _react.default.createElement(Component, (0, _extends2.default)({
        currentWalletId: id
      }, props));
    } catch (err) {
      return _react.default.createElement("em", null, "Invalid wallet ID: ", id);
    }
  };
}

var _default = (0, _uiApi.withMulti)(ValidationForm, _uiApi.withApi, withWalletIdFromUrl, (0, _uiApi.withCalls)((0, _utils.queryMultisigToProp)('walletIdsByAccountId', {
  paramName: 'myAddress',
  propName: 'walletIds'
})), _translate.default);

exports.default = _default;