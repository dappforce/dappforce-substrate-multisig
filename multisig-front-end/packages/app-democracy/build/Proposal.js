"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _Item = _interopRequireDefault(require("./Item"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ProposalDisplay extends _react.default.PureComponent {
  render() {
    const {
      idNumber,
      value
    } = this.props;
    return _react.default.createElement(_Item.default, {
      idNumber: idNumber,
      proposal: value[1],
      proposalExtra: this.renderExtra()
    });
  }

  renderExtra() {
    const {
      democracy_depositOf,
      t
    } = this.props;

    if (!democracy_depositOf || democracy_depositOf.isNone) {
      return null;
    }

    const value = democracy_depositOf.unwrap();
    const balance = value[0];
    const addresses = value[1];
    return _react.default.createElement("div", {
      className: "democracy--Proposal-info"
    }, _react.default.createElement(_uiApp.Labelled, {
      label: t('depositors')
    }, _react.default.createElement("div", null, addresses.map((address, index) => _react.default.createElement(_uiApp.AddressMini, {
      isPadded: false,
      key: "".concat(index, ":").concat(address),
      value: address
    })))), _react.default.createElement(_uiApp.Static, {
      label: t('balance')
    }, (0, _util.formatBalance)(balance)));
  }

}

var _default = (0, _uiApi.withMulti)(ProposalDisplay, _translate.default, (0, _uiApi.withCall)('query.democracy.depositOf', {
  paramName: 'idNumber'
}));

exports.default = _default;