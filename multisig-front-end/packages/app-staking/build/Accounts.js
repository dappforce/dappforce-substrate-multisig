"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/ui-app/util");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _item = _interopRequireDefault(require("@polkadot/ui-keyring/options/item"));

var _Account = _interopRequireDefault(require("./Account"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Accounts__Wrapper",
  componentId: "h9d03u-0"
})([".accounts{display:flex;flex-wrap:wrap;.spacer{flex:1 1;margin:.25rem;padding:1rem 1.5rem;}}.filter{display:flex;justify-content:flex-end;margin-bottom:0.75rem;> div{max-width:30rem;}}"]);

class Accounts extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeFilter = filter => {
      this.setState({
        filter
      });
    };

    const {
      t
    } = props;
    this.state = {
      filter: 'all',
      filterOptions: [{
        text: t('Show all accounts'),
        value: 'all'
      }, {
        text: t('Show all unbonded'),
        value: 'unbonded'
      }, {
        text: t('Show only stashes'),
        value: 'stash'
      }, {
        text: t('Show only controllers'),
        value: 'controller'
      }]
    };
  }

  render() {
    const {
      balances,
      recentlyOffline,
      t,
      validators
    } = this.props;
    const {
      filter,
      filterOptions
    } = this.state;

    const accounts = _uiKeyring.default.getAccounts();

    return _react.default.createElement(Wrapper, null, _react.default.createElement("div", {
      className: "filter"
    }, _react.default.createElement(_uiApp.Dropdown, {
      help: t('Select which types of accounts to display, either all, only the stash accounts or the controller accounts.'),
      label: t('filter'),
      onChange: this.onChangeFilter,
      options: filterOptions,
      value: filter
    })), _react.default.createElement("div", {
      className: "accounts"
    }, accounts.map(account => {
      const address = account.address();
      const name = account.getMeta().name || '';
      return _react.default.createElement(_Account.default, {
        accountId: address,
        balances: balances,
        filter: filter,
        isValidator: validators.includes(address),
        key: address,
        name: name,
        recentlyOffline: recentlyOffline,
        stashOptions: this.getStashOptions(),
        validators: validators
      });
    }), _react.default.createElement("div", {
      className: "spacer"
    })));
  }

  getStashOptions() {
    const {
      stashes
    } = this.props;
    return stashes.map(stashId => (0, _item.default)(stashId, (0, _util.getAddrName)(stashId)));
  }

}

var _default = (0, _translate.default)(Accounts);

exports.default = _default;