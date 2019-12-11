"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _uiReactive = require("@polkadot/ui-reactive");

var _util2 = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class BondedDisplay extends _react.default.PureComponent {
  render() {
    const {
      bonded,
      params,
      className,
      label,
      style
    } = this.props;

    if (!params) {
      return null;
    }

    return bonded ? this.renderProvided() : _react.default.createElement(_uiReactive.Bonded, {
      className: (0, _util2.classes)('ui--Bonded', className),
      label: label,
      params: params,
      style: style
    });
  }

  renderProvided() {
    const {
      bonded,
      className,
      label,
      style
    } = this.props;
    let value = "".concat((0, _util.formatBalance)(Array.isArray(bonded) ? bonded[0] : bonded));

    if (Array.isArray(bonded)) {
      const totals = bonded.filter((value, index) => index !== 0);
      const total = totals.reduce((total, value) => total.add(value), new _bn.default(0)).gtn(0) ? "(+".concat(totals.map(bonded => (0, _util.formatBalance)(bonded)).join(', '), ")") : '';
      value = "".concat(value, "  ").concat(total);
    }

    return _react.default.createElement("div", {
      className: (0, _util2.classes)('ui--Bonded', className),
      style: style
    }, label, value);
  }

}

exports.default = BondedDisplay;