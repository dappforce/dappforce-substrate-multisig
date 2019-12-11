"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

require("./index.css");

var _reactRouterDom = require("react-router-dom");

var _ViewWallet = _interopRequireDefault(require("./ViewWallet"));

var _MyAccount = require("@polkadot/df-utils/MyAccount");

var _utils = require("./utils");

var _Section = _interopRequireDefault(require("@polkadot/df-utils/Section"));

// const initialWalletsId = [
//   '5GNSoTxHwJvayiBgcfYvNN5boZ7VnJHjdRReUKiMuSftAbRp',
//   '5Dab58So9q8zK8SsLMvHQ1LrEi76tt7o9XTRziHgUkumqR9U',
//   '5H4gVboSoitvBhW2LU59a6rDYywH3Uea4ENpbhskVv9AYgJ5',
//   '5DuKatYA1RSo939f9uMCDsLeveyzNkkkv7h5vy5bW5fJQVed'
// ];
// export const initialState =
//   {
//     created: new Change(),
//     id: new AccountId('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'),
//     owners: [new AccountId('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')],
//     max_tx_value: new u64(54),
//     confirms_required: new u16(2)
//   };
const renderCreateWalletButton = _react.default.createElement(_reactRouterDom.Link, {
  to: "/wallet/new",
  style: {
    marginTop: '.5rem',
    float: 'right'
  },
  className: "ui tiny button primary"
}, _react.default.createElement("i", {
  className: "plus icon"
}), "Create wallet");

const InnerViewWallets = props => {
  const {
    walletIds
  } = props;
  if (!walletIds) return _react.default.createElement("em", null, "Loading your wallets...");
  console.log(walletIds);

  const renderWallets = () => {
    return _react.default.createElement(_Section.default, {
      title: _react.default.createElement("div", {
        className: "WalletsTitle"
      }, 'My Wallets', " ", renderCreateWalletButton)
    }, walletIds.map((walletId, index) => _react.default.createElement(_ViewWallet.default, {
      walletId: walletId,
      key: index,
      withPreview: true
    })));
  };

  return _react.default.createElement(_react.default.Fragment, null, renderWallets());
};

var _default = (0, _with.withMulti)(InnerViewWallets, _MyAccount.withMyAccount, (0, _with.withCalls)((0, _utils.queryMultisigToProp)('walletIdsByAccountId', {
  paramName: 'myAddress',
  propName: 'walletIds'
})));

exports.default = _default;