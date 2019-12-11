"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiReactive = require("@polkadot/ui-reactive");

var _SummarySession = _interopRequireDefault(require("./SummarySession"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Summary extends _react.default.PureComponent {
  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement(_uiApp.SummaryBox, null, _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      className: "ui--media-small",
      label: t('target')
    }, _react.default.createElement(_uiReactive.TimePeriod, null)), _react.default.createElement(_uiApp.CardSummary, {
      label: t('last block')
    }, _react.default.createElement(_uiReactive.TimeNow, null))), _react.default.createElement("section", {
      className: "ui--media-large"
    }, _react.default.createElement(_SummarySession.default, null)), _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('finalized')
    }, _react.default.createElement(_uiReactive.BestFinalized, null)), _react.default.createElement(_uiApp.CardSummary, {
      label: t('best')
    }, _react.default.createElement(_uiReactive.BestNumber, null))));
  }

}

var _default = (0, _translate.default)(Summary);

exports.default = _default;