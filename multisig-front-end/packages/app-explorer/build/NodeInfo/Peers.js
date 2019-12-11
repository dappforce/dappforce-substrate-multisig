"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-nodeinfo authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Peers extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderPeer = peer => {
      const peerId = peer.peerId.toString();
      return _react.default.createElement("tr", {
        key: peerId
      }, _react.default.createElement("td", {
        className: "roles"
      }, peer.roles.toString().toLowerCase()), _react.default.createElement("td", {
        className: "peerid ui--media-medium"
      }, peerId), _react.default.createElement("td", {
        className: "number"
      }, (0, _util.formatNumber)(peer.bestNumber)), _react.default.createElement("td", {
        className: "hash"
      }, peer.bestHash.toHex()));
    };
  }

  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement("section", {
      className: "status--Peers"
    }, _react.default.createElement("h1", null, t('connected peers')), this.renderPeers());
  }

  renderPeers() {
    const {
      peers,
      t
    } = this.props;

    if (!peers || !peers.length) {
      return _react.default.createElement("div", {
        className: "ui disabled"
      }, t('no peers connected'));
    }

    return _react.default.createElement("article", null, _react.default.createElement("table", null, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", {
      className: "roles"
    }, t('role')), _react.default.createElement("th", {
      className: "peerid ui--media-medium"
    }, t('peer id')), _react.default.createElement("th", {
      className: "number"
    }, t('best #')), _react.default.createElement("th", {
      className: "hash"
    }, t('best hash')))), _react.default.createElement("tbody", null, peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber)).map(this.renderPeer))));
  }

}

var _default = (0, _translate.default)(Peers);

exports.default = _default;