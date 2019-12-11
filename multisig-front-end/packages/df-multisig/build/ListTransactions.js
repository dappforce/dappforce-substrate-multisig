"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uiApi = require("@polkadot/ui-api");

require("./index.css");

var _semanticUiReact = require("semantic-ui-react");

var _TxButton = _interopRequireDefault(require("@polkadot/df-utils/TxButton"));

var _utils = require("./utils");

var _MyAccountContext = require("@polkadot/df-utils/MyAccountContext");

var _reactRouterDom = require("react-router-dom");

var _uiApp = require("@polkadot/ui-app");

var _Pluralize = require("./Pluralize");

const ViewTransaction = props => {
  const {
    txId,
    walletId,
    confirms_required,
    withStatus = false
  } = props;
  const [transaction, setTransaction] = (0, _react.useState)(undefined);
  const [disableButton, setDisableButton] = (0, _react.useState)(false);
  const {
    state: {
      address
    }
  } = (0, _MyAccountContext.useMyAccount)();
  (0, _react.useEffect)(() => {
    const loadTx = async () => {
      const TxOpt = await _uiApi.api.query.multisigWalletModule.txById(txId);

      if (TxOpt.isSome) {
        setTransaction(TxOpt.unwrap());
      }
    };

    loadTx().catch(console.log);
  }, [false]);
  if (!transaction || !address) return _react.default.createElement("em", null, "Loading...");
  const {
    destination,
    value,
    notes,
    confirmed_by,
    executed,
    created: {
      time,
      block
    }
  } = transaction;
  console.log('Tx', {
    transaction
  }, transaction.created);
  const iConfirmed = confirmed_by.toString().indexOf(address) >= 0;

  const onSubmit = sendTx => {
    setDisableButton(true);
    sendTx();
  };

  const onTxCancelled = () => {
    setDisableButton(false);
  };

  const onTxFailed = _txResult => {
    setDisableButton(false);
  };

  const onTxSuccess = _txResult => {
    setDisableButton(false);
  };

  const buildTxParams = () => {
    return [walletId, txId];
  };

  const renderConfirmations = () => {
    if (confirmed_by.length > 1) {
      for (let i = 1; i < confirmed_by.length; i++) {
        return _react.default.createElement(_uiApp.AddressRow, {
          value: confirmed_by[i].toString(),
          identIconSize: 30,
          isShort: false,
          withNonce: false
        });
      }
    }

    return null;
  };

  const submitedBy = confirmed_by[0].toString();
  const isTxExecuted = executed.eq(true);

  const ConfirmTxButton = () => {
    if (submitedBy === address) {
      return _react.default.createElement("em", null, "You submited this tx");
    } else if (iConfirmed) {
      return _react.default.createElement("em", null, "You confirmed");
    } else if (isTxExecuted) {
      return _react.default.createElement("em", null, "You didn't confirm");
    } else {
      return _react.default.createElement(_TxButton.default, {
        type: "submit",
        isDisabled: disableButton,
        onClick: onSubmit,
        txCancelledCb: onTxCancelled,
        txFailedCb: onTxFailed,
        txSuccessCb: onTxSuccess,
        params: buildTxParams(),
        tx: 'wallet.confirmTransaction'
      }, _react.default.createElement("i", {
        className: "plus icon"
      }), "Confirm");
    }
  };

  return _react.default.createElement(_semanticUiReact.Table.Row, null, _react.default.createElement(_semanticUiReact.Table.Cell, null, _react.default.createElement("div", {
    className: "TxInfo"
  }, _react.default.createElement("div", null, _react.default.createElement("b", null, "Tx id:"), " ", txId.toString()), _react.default.createElement("div", null, _react.default.createElement("b", null, "Tx value:"), " ", value.toString()), _react.default.createElement("div", null, _react.default.createElement("b", null, "Time:"), " ", time.toString(), " "), _react.default.createElement("div", null, _react.default.createElement("b", null, "Block:"), " ", block.toString()), _react.default.createElement("div", null, _react.default.createElement("b", null, "Comment:"), " ", notes.toString()))), _react.default.createElement(_semanticUiReact.Table.Cell, null, _react.default.createElement("div", {
    className: "TxDestination"
  }, _react.default.createElement("b", null, "Destination:"), _react.default.createElement(_uiApp.AddressRow, {
    value: destination.toString(),
    identIconSize: 30,
    isShort: false,
    withNonce: false
  }), _react.default.createElement("b", null, "Submitted by:"), _react.default.createElement(_uiApp.AddressRow, {
    value: submitedBy,
    identIconSize: 30,
    isShort: false,
    withNonce: false
  }), confirmed_by.length > 1 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("b", null, "Confirmed by:"), " ", renderConfirmations()))), _react.default.createElement(_semanticUiReact.Table.Cell, {
    style: {
      textAlign: 'center'
    }
  }, "".concat(confirmed_by.length, "/").concat(confirms_required)), withStatus && _react.default.createElement(_semanticUiReact.Table.Cell, null, isTxExecuted ? 'Executed' : 'Pending'), _react.default.createElement(_semanticUiReact.Table.Cell, null, _react.default.createElement(ConfirmTxButton, null)));
};

const InnerListTxs = props => {
  const {
    wallet,
    pendingTxIds,
    executedTxIds
  } = props;
  const {
    id,
    confirms_required
  } = wallet;
  if (!pendingTxIds || !executedTxIds) return _react.default.createElement("em", null, "Loading list...");
  const allTxs = [...pendingTxIds, ...executedTxIds];
  const count = allTxs.length;

  const RenderTabPane = props => {
    const {
      transactionsIds,
      withStatus = false
    } = props;
    return _react.default.createElement(_semanticUiReact.Tab.Pane, {
      as: "div",
      style: {
        marginTop: '1rem'
      }
    }, !transactionsIds.length ? _react.default.createElement("em", null, "No transactions yet.") : _react.default.createElement(_semanticUiReact.Table, {
      celled: true,
      selectable: true,
      compact: true,
      className: "ProfileDetailsTable"
    }, _react.default.createElement(_semanticUiReact.Table.Header, null, _react.default.createElement(_semanticUiReact.Table.Row, null, _react.default.createElement(_semanticUiReact.Table.HeaderCell, null, "Information"), _react.default.createElement(_semanticUiReact.Table.HeaderCell, null, "Destination"), _react.default.createElement(_semanticUiReact.Table.HeaderCell, null, "Confirmations"), withStatus && _react.default.createElement(_semanticUiReact.Table.HeaderCell, null, "Status"), _react.default.createElement(_semanticUiReact.Table.HeaderCell, null, "My response"))), _react.default.createElement(_semanticUiReact.Table.Body, null, transactionsIds.map((transactionId, index) => _react.default.createElement(ViewTransaction, {
      withStatus: withStatus,
      key: index,
      txId: transactionId,
      walletId: id,
      confirms_required: confirms_required
    })))));
  };

  const SubmitTxButton = () => _react.default.createElement(_reactRouterDom.Link, {
    to: "/wallet/".concat(wallet.id, "/transfer"),
    style: {
      marginLeft: '1rem',
      verticalAlign: 'middle'
    },
    className: "ui button"
  }, _react.default.createElement("i", {
    className: "plus icon"
  }), "Submit transaction");

  const panes = [{
    key: 'all',
    menuItem: "All (".concat(allTxs.length, ")"),
    render: () => _react.default.createElement(RenderTabPane, {
      transactionsIds: allTxs,
      withStatus: true
    })
  }, {
    key: 'pending',
    menuItem: "Pending (".concat(pendingTxIds.length, ")"),
    render: () => _react.default.createElement(RenderTabPane, {
      transactionsIds: pendingTxIds
    })
  }, {
    key: 'executed',
    menuItem: "Executed (".concat(executedTxIds.length, ")"),
    render: () => _react.default.createElement(RenderTabPane, {
      transactionsIds: executedTxIds
    })
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h3", {
    className: "TransactionsHeader"
  }, _react.default.createElement(_Pluralize.Pluralize, {
    count: count,
    singularText: "transaction"
  }), _react.default.createElement(SubmitTxButton, null)), _react.default.createElement("hr", null), _react.default.createElement(_semanticUiReact.Tab, {
    panes: panes
  }));
};

var _default = (0, _uiApi.withMulti)(InnerListTxs, (0, _uiApi.withCalls)((0, _utils.queryMultisigToProp)('executedTxIdsByWalletId', {
  paramName: 'walletId',
  propName: 'executedTxIds'
}), (0, _utils.queryMultisigToProp)('pendingTxIdsByWalletId', {
  paramName: 'walletId',
  propName: 'pendingTxIds'
})));

exports.default = _default;