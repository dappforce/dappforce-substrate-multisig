"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePeriod = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/ui-reactive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class TimePeriod extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      label = '',
      style,
      timestamp_blockPeriod,
      timestamp_minimumPeriod
    } = this.props;
    const period = timestamp_minimumPeriod || (timestamp_blockPeriod ? timestamp_blockPeriod.toNumber ? timestamp_blockPeriod : timestamp_blockPeriod.unwrapOr(null) : null);
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, label, period ? "".concat((0, _util.formatNumber)(period.toNumber() * 2), "s") : '-', children);
  }

}

exports.TimePeriod = TimePeriod;

var _default = (0, _uiApi.withCalls)('query.timestamp.blockPeriod', 'query.timestamp.minimumPeriod')(TimePeriod);

exports.default = _default;