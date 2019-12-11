"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Events = _interopRequireDefault(require("../Events"));

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Events extends _react.default.PureComponent {
  render() {
    const {
      t,
      value
    } = this.props;

    if (!value || !value.length) {
      return null;
    }

    return _react.default.createElement("section", null, _react.default.createElement("h1", null, t('events')), _react.default.createElement("div", {
      className: "explorer--BlockByHash-flexable ui--flex-medium"
    }, _react.default.createElement(_Events.default, {
      eventClassName: "explorer--BlockByHash-block",
      value: value
    })));
  }

}

var _default = (0, _translate.default)(Events);

exports.default = _default;