"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Summary extends _react.default.PureComponent {
  render() {
    const {
      chain_bestNumber = new _bn.default(0),
      democracy_launchPeriod = new _bn.default(1),
      democracy_nextTally = new _bn.default(0),
      democracy_publicPropCount,
      democracy_referendumCount = new _bn.default(0),
      t
    } = this.props;
    return _react.default.createElement(_uiApp.SummaryBox, null, _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('proposals')
    }, (0, _util.formatNumber)(democracy_publicPropCount)), _react.default.createElement(_uiApp.CardSummary, {
      label: t('referendums')
    }, (0, _util.formatNumber)(democracy_referendumCount)), _react.default.createElement(_uiApp.CardSummary, {
      label: t('active')
    }, (0, _util.formatNumber)(democracy_referendumCount.sub(democracy_nextTally)))), _react.default.createElement("section", {
      className: "ui--media-medium"
    }, _react.default.createElement(_uiApp.CardSummary, {
      label: t('launch period'),
      progress: {
        value: chain_bestNumber.mod(democracy_launchPeriod).addn(1),
        total: democracy_launchPeriod || new _bn.default(1)
      }
    })));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)('query.democracy.launchPeriod', 'query.democracy.nextTally', 'query.democracy.publicPropCount', 'query.democracy.referendumCount', 'derive.chain.bestNumber')(Summary));

exports.default = _default;