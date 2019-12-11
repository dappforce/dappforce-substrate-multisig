"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BlockHeaders = _interopRequireDefault(require("./BlockHeaders"));

var _EventsRecent = _interopRequireDefault(require("./EventsRecent"));

var _Summary = _interopRequireDefault(require("./Summary"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Main extends _react.default.PureComponent {
  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Summary.default, null), _react.default.createElement("div", {
      className: "explorer--Overview ui--flex-medium"
    }, _react.default.createElement("div", {
      className: "column"
    }, _react.default.createElement("h1", null, t('recent blocks')), _react.default.createElement(_BlockHeaders.default, null)), _react.default.createElement("div", {
      className: "column"
    }, _react.default.createElement("h1", null, t('recent events')), _react.default.createElement(_EventsRecent.default, null))));
  }

}

var _default = (0, _translate.default)(Main);

exports.default = _default;