"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _Proposal = _interopRequireDefault(require("./Proposal"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Proposals extends _react.default.PureComponent {
  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement("section", {
      className: "democracy--Proposals"
    }, _react.default.createElement("h1", null, t('proposals')), this.renderProposals());
  }

  renderProposals() {
    const {
      democracy_publicProps,
      t
    } = this.props;

    if (!democracy_publicProps || !democracy_publicProps.length) {
      return _react.default.createElement("div", {
        className: "ui disabled"
      }, t('no available proposals'));
    }

    return democracy_publicProps.map(proposal => _react.default.createElement(_Proposal.default, {
      idNumber: proposal[0],
      key: proposal[0].toString(),
      value: proposal
    }));
  }

}

var _default = (0, _uiApi.withMulti)(Proposals, _translate.default, (0, _uiApi.withCall)('query.democracy.publicProps'));

exports.default = _default;