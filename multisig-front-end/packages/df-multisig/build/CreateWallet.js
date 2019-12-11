"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withGeneratedAddress = withGeneratedAddress;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _utilCrypto = require("@polkadot/util-crypto");

var _formik = require("formik");

var Yup = _interopRequireWildcard(require("yup"));

var _MyAccountContext = require("@polkadot/df-utils/MyAccountContext");

var _translate = _interopRequireDefault(require("./translate"));

var _bn = _interopRequireDefault(require("bn.js"));

var _TxButton = _interopRequireDefault(require("@polkadot/df-utils/TxButton"));

var _uiApi = require("@polkadot/ui-api");

var _keyring = _interopRequireDefault(require("@polkadot/keyring"));

var DfForms = _interopRequireWildcard(require("@polkadot/df-utils/forms"));

const MIN_TX_VALUE = new _bn.default(1);
const MIN_CONFIRMS = new _bn.default(2);
const LabelledField = DfForms.LabelledField();

const buildSchema = () => Yup.object().shape({
  maxTxValue: Yup.number().min(MIN_TX_VALUE.toNumber(), 'Max transaction value should be more than 0'),
  confirmsRequired: Yup.number().min(MIN_CONFIRMS.toNumber(), 'Min value for required confirmations is 2')
});

function withGeneratedAddress(Component) {
  return function (props) {
    const mnemonic = (0, _utilCrypto.mnemonicGenerate)();
    const keyring = new _keyring.default();
    const isValidMnemonic = (0, _utilCrypto.mnemonicValidate)(mnemonic);
    const address = isValidMnemonic ? keyring.addFromMnemonic(mnemonic).address() : '';
    return _react.default.createElement(Component, (0, _extends2.default)({
      walletId: address
    }, props));
  };
}

const InnerWallet = props => {
  const {
    state: {
      address: myAddress
    }
  } = (0, _MyAccountContext.useMyAccount)();
  const {
    t,
    walletId,
    setFieldValue,
    setFieldError,
    values,
    isSubmitting,
    isValid,
    dirty,
    history,
    setSubmitting
  } = props;
  const {
    maxTxValue,
    confirmsRequired
  } = values;
  const [walletIdState] = (0, _react.useState)(walletId ? walletId : '');
  const [owners, setOwners] = (0, _react.useState)(new Array(myAddress ? myAddress : '')); // const [ maxTxValue, setMaxTxValue ] = useState(new BN(1));
  // const [ confirmsRequired, setConfirmsRequired ] = useState(MIN_CONFIRMS);

  if (!myAddress) return null;

  const onChangeOwners = account => {
    console.log(account);
    setOwners([myAddress, ...account]);
  };

  const onChangeBalance = value => {
    const data = value && value.toNumber();
    console.log(data);
    setFieldValue('maxTxValue', data);
  };

  const onChangeConfirms = value => {
    if (!value) return;
    const data = value.toNumber();
    console.log(data);

    if (owners.length.valueOf > data.valueOf) {
      setFieldError('confrimsRequired', 'The number of required confirmations can\'t be more than number of owners');
      setFieldValue('confirmsRequired', data, false);
    } else {
      setFieldValue('confirmsRequired', data);
    }
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

  const buildTxParams = () => {
    if (!isValid) return [];
    return [walletIdState, owners, maxTxValue, confirmsRequired];
  };

  const goToView = () => {
    if (history && walletId) {
      history.push("/wallet/".concat(walletId));
    }
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_formik.Form, null, _react.default.createElement("div", {
    className: "transfer--Transfer-data"
  }, _react.default.createElement(_uiApp.AddressSummary, {
    className: "shrink",
    value: walletIdState
  }), _react.default.createElement("div", {
    className: "InputData"
  }, _react.default.createElement(_uiApp.InputAddress, {
    label: t('Owner address'),
    onChange: onChangeOwners,
    onChangeMulti: onChangeOwners,
    isMultiple: true,
    type: "all"
  }), _react.default.createElement(LabelledField, (0, _extends2.default)({
    name: "maxTxValue"
  }, props), _react.default.createElement(_formik.Field, {
    component: _uiApp.InputBalance,
    autoFocus: true,
    name: "maxTxValue",
    value: maxTxValue,
    onChange: onChangeBalance,
    label: t('Max value of transaction')
  })), _react.default.createElement(LabelledField, (0, _extends2.default)({
    name: "confirmsRequired"
  }, props), _react.default.createElement(_formik.Field, {
    component: _uiApp.InputNumber,
    name: confirmsRequired,
    value: MIN_CONFIRMS,
    onChange: onChangeConfirms,
    label: t('Confirmations required for one transaction')
  })), _react.default.createElement(_uiApp.Labelled, {
    style: {
      marginTop: '.5rem'
    },
    label: '',
    withLabel: true
  }, _react.default.createElement(_TxButton.default, {
    type: "submit",
    size: "large",
    label: 'Create wallet',
    isDisabled: !dirty || isSubmitting || !isValid,
    onClick: onSubmit,
    txCancelledCb: onTxCancelled,
    txFailedCb: onTxFailed,
    txSuccessCb: onTxSuccess,
    params: buildTxParams(),
    tx: 'wallet.createWallet'
  }))))));
};

const EditForm = (0, _formik.withFormik)({
  mapPropsToValues: props => {
    const {
      maxTxValue,
      confirmsRequired
    } = props;

    if (maxTxValue && confirmsRequired) {
      return {
        maxTxValue,
        confirmsRequired
      };
    } else {
      return {
        maxTxValue: MIN_TX_VALUE,
        confirmsRequired: MIN_CONFIRMS
      };
    }
  },
  validationSchema: buildSchema,
  handleSubmit: values => {// do submitting things
  }
})(InnerWallet);

var _default = (0, _uiApi.withMulti)(EditForm, withGeneratedAddress, _translate.default);

exports.default = _default;