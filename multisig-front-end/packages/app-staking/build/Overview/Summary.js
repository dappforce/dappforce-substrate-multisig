"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SummarySession = _interopRequireDefault(require("@polkadot/app-explorer/SummarySession"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Summary extends _react.default.PureComponent {
  render() {
    const {
      className,
      controllers,
      lastAuthor,
      lastBlock,
      style,
      t,
      staking_validatorCount,
      validators
    } = this.props;
    const waiting = controllers.length > validators.length ? controllers.length - validators.length : 0;
    return _react.default.createElement(_uiApp.SummaryBox, {
      className: className,
      style: style
    }, _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('validators')
    }, validators.length, "/", staking_validatorCount ? staking_validatorCount.toString() : '-'), _react.default.createElement(_uiApp.CardSummary, {
      label: t('waiting')
    }, waiting)), _react.default.createElement("section", null, _react.default.createElement(_uiApp.CardSummary, {
      label: t('last block')
    }, lastAuthor && _react.default.createElement(_uiApp.AddressMini, {
      className: "summary",
      isPadded: false,
      value: lastAuthor,
      withAddress: false
    }), lastBlock)), _react.default.createElement("section", null, _react.default.createElement(_SummarySession.default, {
      withBroken: false
    })));
  }

}

var _default = (0, _uiApi.withMulti)(Summary, _translate.default, (0, _uiApi.withCall)('query.staking.validatorCount'));

exports.default = _default;