"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _with = require("@polkadot/ui-api/with");

require("./index.css");

var _semanticUiReact = require("semantic-ui-react");

var _reactRouterDom = require("react-router-dom");

var _OwnersModal = require("./OwnersModal");

var _ListTransactions = _interopRequireDefault(require("./ListTransactions"));

var _uiApp = require("@polkadot/ui-app");

const InnerViewWallet = props => {
  const {
    walletId,
    withPreview = false,
    api
  } = props;
  const [wallet, setWallet] = (0, _react.useState)(undefined);
  const [ownersOpen, setOwnersOpen] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const loadWallet = async () => {
      const walletOpt = await api.query.multisigWalletModule.walletById(walletId);

      if (walletOpt.isSome) {
        setWallet(walletOpt.unwrap());
      }
    };

    loadWallet().catch(console.log);
  }, [false]);
  if (!wallet) return _react.default.createElement("em", null, "Loading...");
  const {
    owners,
    max_tx_value,
    confirms_required,
    pending_tx_count,
    executed_tx_count
  } = wallet; // TODO useEffect

  console.log(walletId.toString());

  const renderWallet = () => {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: "WalletHeader"
    }, _react.default.createElement(_uiApp.AddressRow, {
      value: walletId.toString(),
      identIconSize: 60,
      isShort: false,
      withNonce: false
    })), _react.default.createElement("div", {
      className: "WalletDetails"
    }, _react.default.createElement("div", null, "Max value for transaction: ", max_tx_value.toNumber()), _react.default.createElement("div", null, "Number of required confirmations: ", confirms_required.toNumber()), _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.Link, {
      to: "#",
      onClick: () => setOwnersOpen(true)
    }, "Owners: ".concat(owners.length))), ownersOpen && _react.default.createElement(_OwnersModal.OwnersListModal, {
      owners: owners,
      open: ownersOpen,
      close: () => setOwnersOpen(false)
    })));
  };

  const renderWalletPreview = () => {
    return _react.default.createElement(_semanticUiReact.Segment, {
      className: "WalletPreview"
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: "/wallet/".concat(walletId.toString())
    }, _react.default.createElement(_uiApp.AddressRow, {
      value: walletId.toString(),
      identIconSize: 60,
      isShort: false,
      withNonce: false
    })), _react.default.createElement("div", {
      className: "WalletPreviewDetails"
    }, _react.default.createElement(_semanticUiReact.Label, {
      as: "a",
      onClick: () => setOwnersOpen(true)
    }, _react.default.createElement(_semanticUiReact.Label.Detail, null, "Owners: "), " ".concat(owners.length)), _react.default.createElement(_semanticUiReact.Label, {
      color: pending_tx_count.toNumber() > 0 ? 'orange' : undefined
    }, _react.default.createElement(_semanticUiReact.Label.Detail, null, "Pending txs: "), " ".concat(pending_tx_count.toString())), _react.default.createElement(_semanticUiReact.Label, null, _react.default.createElement(_semanticUiReact.Label.Detail, null, "Executed txs: "), " ".concat(executed_tx_count.toNumber())), _react.default.createElement(_semanticUiReact.Label, null, _react.default.createElement(_semanticUiReact.Label.Detail, null, "Max tx value: "), " ".concat(max_tx_value.toNumber())), _react.default.createElement(_semanticUiReact.Label, null, _react.default.createElement(_semanticUiReact.Label.Detail, null, "Confirmations required: "), " ".concat(confirms_required.toNumber()))), ownersOpen && _react.default.createElement(_OwnersModal.OwnersListModal, {
      owners: owners,
      open: ownersOpen,
      close: () => setOwnersOpen(false)
    }));
  };

  if (withPreview) {
    return renderWalletPreview();
  } else {
    return _react.default.createElement(_react.default.Fragment, null, renderWallet(), _react.default.createElement(_ListTransactions.default, {
      wallet: wallet,
      walletId: walletId
    }));
  }
};

var _default = (0, _with.withMulti)(InnerViewWallet, _with.withApi);

exports.default = _default;