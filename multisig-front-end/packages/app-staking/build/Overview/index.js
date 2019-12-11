"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@polkadot/types");

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

var _util = require("@polkadot/util");

var _CurrentList = _interopRequireDefault(require("./CurrentList"));

var _Summary = _interopRequireDefault(require("./Summary"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const ZERO = new _types.Balance(0);

class Overview extends _react.default.PureComponent {
  render() {
    const {
      balances,
      chain_subscribeNewHead,
      controllers,
      recentlyOffline,
      validators
    } = this.props;
    const nextSorted = this.sortByBalance(controllers.filter(address => !validators.includes(address)));
    const validatorsSorted = this.sortByBalance(validators);
    let lastBlock = '—';
    let lastAuthor;

    if (chain_subscribeNewHead) {
      lastBlock = (0, _util.formatNumber)(chain_subscribeNewHead.blockNumber);
      lastAuthor = (chain_subscribeNewHead.author || '').toString();
    }

    return _react.default.createElement("div", {
      className: "staking--Overview"
    }, _react.default.createElement(_Summary.default, {
      balances: balances,
      controllers: controllers,
      lastBlock: lastBlock,
      lastAuthor: lastAuthor,
      validators: validators
    }), _react.default.createElement(_CurrentList.default, {
      balances: balances,
      current: validatorsSorted,
      lastBlock: lastBlock,
      lastAuthor: lastAuthor,
      next: nextSorted,
      recentlyOffline: recentlyOffline
    }));
  }

  sortByBalance(list) {
    const {
      balances
    } = this.props;
    return list.sort((a, b) => {
      const balanceA = balances[a] || {
        stakingBalance: ZERO
      };
      const balanceB = balances[b] || {
        stakingBalance: ZERO
      };
      return balanceB.stakingBalance.cmp(balanceA.stakingBalance);
    });
  }

}

var _default = (0, _with.withMulti)(Overview, (0, _with.withCalls)('derive.chain.subscribeNewHead'));

exports.default = _default;