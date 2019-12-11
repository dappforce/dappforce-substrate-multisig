"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwnersListModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

require("./index.css");

var _semanticUiReact = require("semantic-ui-react");

var _uiApp = require("@polkadot/ui-app");

const InnerOwnersListModal = props => {
  const {
    owners,
    open,
    close
  } = props;

  const renderAccounts = () => {
    return owners && owners.map((owner, index) => _react.default.createElement("div", {
      key: index,
      style: {
        textAlign: 'left',
        margin: '1rem'
      }
    }, _react.default.createElement(_uiApp.AddressRow, {
      value: owner.toString(),
      identIconSize: 48,
      withBalance: true,
      isShort: false
    })));
  };

  return _react.default.createElement(_semanticUiReact.Modal, {
    open: open,
    centered: true,
    style: {
      marginTop: '3rem'
    }
  }, _react.default.createElement(_semanticUiReact.Modal.Header, null, _react.default.createElement("h1", null, "Wallet owners")), _react.default.createElement(_semanticUiReact.Modal.Content, {
    scrolling: true
  }, renderAccounts()), _react.default.createElement(_semanticUiReact.Modal.Actions, null, _react.default.createElement(_semanticUiReact.Button, {
    content: "Close",
    onClick: close
  })));
};

const OwnersListModal = (0, _with.withMulti)(InnerOwnersListModal);
exports.OwnersListModal = OwnersListModal;