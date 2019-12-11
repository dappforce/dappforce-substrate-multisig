"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Item extends _react.default.PureComponent {
  render() {
    const {
      children,
      idNumber,
      proposal,
      proposalExtra
    } = this.props;

    const {
      meta,
      method,
      section
    } = _types.Method.findFunction(proposal.callIndex); // FIXME This is _very_ similar to what we have in explorer/BlockByHash


    return _react.default.createElement("article", {
      className: "democracy--Item"
    }, _react.default.createElement("div", {
      className: "democracy--Item-header"
    }, _react.default.createElement("div", {
      className: "democracy--Item-header-info"
    }, _react.default.createElement("h3", null, section, ".", method), _react.default.createElement("div", {
      className: "democracy--Item-header-description"
    }, meta && meta.documentation ? meta.documentation.join(' ') : '')), _react.default.createElement("div", {
      className: "democracy--Item-header-id"
    }, "#", (0, _util.formatNumber)(idNumber))), _react.default.createElement("div", {
      className: "democracy--Item-body"
    }, _react.default.createElement(_uiApp.Call, {
      className: "democracy--Item-extrinsic",
      value: proposal
    }, proposalExtra), _react.default.createElement("div", {
      className: "democracy--Item-children"
    }, children)));
  }

}

var _default = (0, _translate.default)(Item);

exports.default = _default;