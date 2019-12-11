"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/ui-app/util");

var _util2 = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Address extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.getDisplayName = () => {
      const {
        defaultName,
        stashId
      } = this.props;

      if (!stashId) {
        return defaultName;
      }

      return (0, _util.getAddrName)(stashId) || defaultName;
    };

    this.state = {
      controllerId: props.address,
      sessionId: null,
      stashActive: null,
      stashTotal: null,
      badgeExpanded: false
    };
  }

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      session_nextKeyFor,
      staking_bonded,
      staking_ledger
    } = _ref;
    const ledger = staking_ledger ? staking_ledger.unwrapOr(null) : null;
    return {
      controllerId: !staking_bonded || staking_bonded.isNone ? prevState.controllerId : staking_bonded.unwrap().toString(),
      sessionId: !session_nextKeyFor || session_nextKeyFor.isNone ? prevState.sessionId : session_nextKeyFor.unwrap().toString(),
      stashActive: !ledger ? prevState.stashActive : (0, _util2.formatBalance)(ledger.active),
      stashTotal: !ledger ? prevState.stashTotal : (0, _util2.formatBalance)(ledger.total)
    };
  }

  render() {
    const {
      address,
      lastAuthor,
      lastBlock,
      stashId,
      staking_stakers
    } = this.props;
    const {
      controllerId
    } = this.state;
    const isAuthor = [address, controllerId, stashId].includes(lastAuthor);
    const bonded = staking_stakers && !staking_stakers.own.isZero() ? [staking_stakers.own, staking_stakers.total.sub(staking_stakers.own)] : undefined;
    return _react.default.createElement("article", {
      key: stashId || controllerId
    }, _react.default.createElement(_uiApp.AddressRow, {
      bonded: bonded,
      name: this.getDisplayName(),
      value: stashId || null,
      withBalance: false,
      withBonded: true,
      withCopy: false,
      withNonce: false
    }, this.renderKeys(), this.renderNominators(), this.renderOffline()), isAuthor && stashId ? _react.default.createElement("div", {
      className: "blockNumber"
    }, "#", lastBlock) : null);
  }

  renderKeys() {
    const {
      t
    } = this.props;
    const {
      controllerId,
      sessionId
    } = this.state;
    const isSame = controllerId === sessionId;
    return _react.default.createElement("div", {
      className: "staking--accounts-info"
    }, controllerId ? _react.default.createElement("div", null, _react.default.createElement("label", {
      className: "staking--label"
    }, isSame ? t('controller/session') : t('controller')), _react.default.createElement(_uiApp.AddressMini, {
      value: controllerId
    })) : null, !isSame && sessionId ? _react.default.createElement("div", null, _react.default.createElement("label", {
      className: "staking--label"
    }, t('session')), _react.default.createElement(_uiApp.AddressMini, {
      value: sessionId
    })) : null);
  }

  renderNominators() {
    const {
      staking_stakers,
      t
    } = this.props;
    const nominators = staking_stakers ? staking_stakers.others.map((_ref2) => {
      let {
        who,
        value
      } = _ref2;
      return [who, value];
    }) : [];

    if (!nominators.length) {
      return null;
    }

    return _react.default.createElement("details", {
      className: "staking--Account-detail"
    }, _react.default.createElement("summary", null, t('Nominators ({{count}})', {
      replace: {
        count: nominators.length
      }
    })), nominators.map((_ref3) => {
      let [who, bonded] = _ref3;
      return _react.default.createElement(_uiApp.AddressMini, {
        bonded: bonded,
        key: who.toString(),
        value: who,
        withBonded: true
      });
    }));
  }

  renderOffline() {
    const {
      recentlyOffline,
      stashId
    } = this.props;

    if (!stashId || !recentlyOffline[stashId]) {
      return null;
    }

    const offline = recentlyOffline[stashId];
    return _react.default.createElement(_uiApp.RecentlyOffline, {
      accountId: stashId,
      offline: offline,
      tooltip: true
    });
  }

}

var _default = (0, _with.withMulti)(Address, _translate.default, (0, _with.withCalls)(['query.staking.bonded', {
  paramName: 'address'
}], ['query.session.nextKeyFor', {
  paramName: 'address'
}], ['query.staking.ledger', {
  paramName: 'address'
}], ['query.staking.ledger', {
  paramName: 'address',
  propName: 'stashId',
  transform: ledger => ledger.unwrapOr({
    stash: {
      toString: () => {
        return null;
      }
    }
  }).stash.toString()
}], ['query.staking.stakers', {
  paramName: 'stashId'
}]));

exports.default = _default;