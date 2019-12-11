"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _uiReactive = require("@polkadot/ui-reactive");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-nodeinfo authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Summary extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  static getDerivedStateFromProps(_ref) {
    let {
      info = {}
    } = _ref;

    if (!info.peers) {
      return null;
    }

    const bestPeer = info.peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber))[0];
    return {
      peerBest: bestPeer ? bestPeer.bestNumber : new _bn.default(0)
    };
  }

  render() {
    const {
      info = {},
      nextRefresh,
      t
    } = this.props;
    const {
      peerBest
    } = this.state;
    return _react.default.createElement(_uiApp.SummaryBox, null, _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('refresh in')
    }, _react.default.createElement(_uiReactive.Elapsed, {
      value: nextRefresh
    })), _react.default.createElement(_uiApp.CardSummary, {
      className: "ui--media-small",
      label: t('total peers')
    }, info.health ? "".concat(info.health.peers.toNumber()) : '-'), _react.default.createElement(_uiApp.CardSummary, {
      className: "ui--media-small",
      label: t('syncing')
    }, info.health ? info.health.isSyncing.valueOf() ? t('yes') : t('no') : '-')), _react.default.createElement("section", {
      className: "ui--media-large"
    }, _react.default.createElement(_uiApp.CardSummary, {
      label: t('queued tx')
    }, info.extrinsics ? "".concat(info.extrinsics.length) : '-')), _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('peer best')
    }, (0, _util.formatNumber)(peerBest)), _react.default.createElement(_uiApp.CardSummary, {
      label: t('our best')
    }, _react.default.createElement(_uiReactive.BestNumber, null))));
  }

}

var _default = (0, _translate.default)(Summary);

exports.default = _default;