"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class SummaryBar extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      nextUp: []
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      staking_intentions,
      session_validators
    } = _ref;

    if (!staking_intentions || !session_validators) {
      return null;
    }

    return {
      nextUp: staking_intentions.filter(accountId => !session_validators.find(validatorId => validatorId.eq(accountId)))
    };
  }

  render() {
    const {
      balances_totalIssuance,
      chain_bestNumber,
      chain_bestNumberLag,
      chain_getRuntimeVersion,
      session_validators = [],
      system_chain,
      system_name,
      system_version
    } = this.props;
    const {
      nextUp
    } = this.state;
    return _react.default.createElement("summary", null, _react.default.createElement("div", null, _react.default.createElement(_uiApp.Bubble, {
      icon: "tty",
      label: "node"
    }, system_name, " v", system_version), _react.default.createElement(_uiApp.Bubble, {
      icon: "chain",
      label: "chain"
    }, system_chain), _react.default.createElement(_uiApp.Bubble, {
      icon: "code",
      label: "runtime"
    }, chain_getRuntimeVersion ? "".concat(chain_getRuntimeVersion.implName, " v").concat(chain_getRuntimeVersion.implVersion) : undefined), _react.default.createElement(_uiApp.Bubble, {
      icon: "bullseye",
      label: "best #"
    }, (0, _util.formatNumber)(chain_bestNumber), " (", (0, _util.formatNumber)(chain_bestNumberLag), " lag)"), _react.default.createElement(_uiApp.Bubble, {
      icon: "chess queen",
      label: "validators"
    }, session_validators.map((accountId, index) => _react.default.createElement(_uiApp.IdentityIcon, {
      key: index,
      value: accountId,
      size: 20
    }))), _react.default.createElement(_uiApp.Bubble, {
      icon: "chess bishop",
      label: "next up"
    }, nextUp.map((accountId, index) => _react.default.createElement(_uiApp.IdentityIcon, {
      key: index,
      value: accountId,
      size: 20
    }))), _react.default.createElement(_uiApp.Bubble, {
      icon: "circle",
      label: "total tokens"
    }, (0, _util.formatBalance)(balances_totalIssuance))));
  }

} // inject the actual API calls automatically into props


var _default = (0, _translate.default)((0, _with.withCalls)('derive.chain.bestNumber', 'derive.chain.bestNumberLag', 'query.balances.totalIssuance', 'query.session.validators', 'rpc.chain.getRuntimeVersion', 'rpc.system.chain', 'rpc.system.name', 'rpc.system.version')(SummaryBar));

exports.default = _default;