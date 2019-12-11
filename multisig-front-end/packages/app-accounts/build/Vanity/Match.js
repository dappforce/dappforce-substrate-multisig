"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Match extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onCreate = () => {
      const {
        onCreateToggle
      } = this.props;
      const {
        hexSeed
      } = this.state;
      onCreateToggle(hexSeed);
    };

    this.onRemove = () => {
      const {
        address,
        onRemove
      } = this.props;
      onRemove(address);
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      seed
    } = _ref;
    return {
      hexSeed: (0, _util.u8aToHex)(seed)
    };
  }

  render() {
    const {
      address,
      count,
      offset
    } = this.props;
    const {
      hexSeed
    } = this.state;
    return _react.default.createElement("div", {
      className: "vanity--Match"
    }, _react.default.createElement("div", {
      className: "vanity--Match-item"
    }, _react.default.createElement(_uiApp.IdentityIcon, {
      className: "vanity--Match-icon",
      size: 48,
      value: address
    }), _react.default.createElement("div", {
      className: "vanity--Match-data"
    }, _react.default.createElement("div", {
      className: "vanity--Match-addr"
    }, _react.default.createElement("span", {
      className: "no"
    }, address.slice(0, offset)), _react.default.createElement("span", {
      className: "yes"
    }, address.slice(offset, count + offset)), _react.default.createElement("span", {
      className: "no"
    }, address.slice(count + offset))), _react.default.createElement("div", {
      className: "vanity--Match-seed"
    }, hexSeed)), _react.default.createElement("div", {
      className: "vanity--Match-buttons"
    }, _react.default.createElement(_uiApp.Button, {
      icon: "plus",
      isPrimary: true,
      onClick: this.onCreate,
      size: "tiny"
    }), _react.default.createElement(_uiApp.Button, {
      icon: "close",
      isNegative: true,
      onClick: this.onRemove,
      size: "tiny"
    }))));
  }

}

exports.default = Match;