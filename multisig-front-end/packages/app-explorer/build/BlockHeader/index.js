"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./BlockHeader.css");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BlockHeader extends _react.default.PureComponent {
  render() {
    const {
      isSummary,
      value,
      withLink = false
    } = this.props;

    if (!value) {
      return null;
    }

    const {
      author,
      blockNumber,
      hash
    } = value;
    const hashHex = hash.toHex();
    const textNumber = (0, _util.formatNumber)(blockNumber);
    return _react.default.createElement("article", {
      className: "explorer--BlockHeader"
    }, _react.default.createElement("div", {
      className: "header-outer"
    }, _react.default.createElement("div", {
      className: "header"
    }, _react.default.createElement("div", {
      className: "number"
    }, withLink ? _react.default.createElement(_reactRouterDom.Link, {
      to: "/explorer/query/".concat(hashHex)
    }, textNumber) : textNumber, "\xA0"), _react.default.createElement("div", {
      className: "hash"
    }, hashHex), _react.default.createElement("div", {
      className: "author ui--media-small"
    }, author ? _react.default.createElement(_uiApp.AddressMini, {
      value: author
    }) : undefined))), isSummary ? undefined : this.renderDetails(value));
  }

  renderDetails(_ref) {
    let {
      blockNumber,
      extrinsicsRoot,
      parentHash,
      stateRoot
    } = _ref;
    const parentHex = parentHash.toHex();
    return _react.default.createElement("div", {
      className: "contains"
    }, _react.default.createElement("div", {
      className: "info"
    }, _react.default.createElement("label", null, "parentHash"), _react.default.createElement("div", {
      className: "hash"
    }, blockNumber.gtn(1) ? _react.default.createElement(_reactRouterDom.Link, {
      to: "/explorer/query/".concat(parentHex)
    }, parentHex) : parentHex)), _react.default.createElement("div", {
      className: "info"
    }, _react.default.createElement("label", null, "extrinsicsRoot"), _react.default.createElement("div", {
      className: "hash"
    }, extrinsicsRoot.toHex())), _react.default.createElement("div", {
      className: "info"
    }, _react.default.createElement("label", null, "stateRoot"), _react.default.createElement("div", {
      className: "hash"
    }, stateRoot.toHex())));
  }

}

exports.default = BlockHeader;