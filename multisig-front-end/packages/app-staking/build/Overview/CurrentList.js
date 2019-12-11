"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translate = _interopRequireDefault(require("../translate"));

var _Address = _interopRequireDefault(require("./Address"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class CurrentList extends _react.default.PureComponent {
  render() {
    return _react.default.createElement("div", {
      className: "validator--ValidatorsList ui--flex-medium"
    }, _react.default.createElement("div", {
      className: "validator--current"
    }, this.renderCurrent()), _react.default.createElement("div", {
      className: "validator--next"
    }, this.renderNext()));
  }

  renderCurrent() {
    const {
      current,
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h1", null, t('validators', {
      replace: {
        count: current.length
      }
    })), this.renderColumn(current, t('validator (stash)')));
  }

  renderNext() {
    const {
      next,
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h1", null, t('next up')), this.renderColumn(next, t('intention (stash)')));
  }

  renderColumn(addresses, defaultName) {
    const {
      balances,
      lastAuthor,
      lastBlock,
      recentlyOffline,
      t
    } = this.props;

    if (addresses.length === 0) {
      return _react.default.createElement("div", null, t('no addresses found'));
    }

    return _react.default.createElement("div", null, addresses.map(address => _react.default.createElement(_Address.default, {
      address: address,
      balances: balances,
      defaultName: defaultName,
      key: address,
      lastAuthor: lastAuthor,
      lastBlock: lastBlock,
      recentlyOffline: recentlyOffline
    })));
  }

}

var _default = (0, _translate.default)(CurrentList);

exports.default = _default;