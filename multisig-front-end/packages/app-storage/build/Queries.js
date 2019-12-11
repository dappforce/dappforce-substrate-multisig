"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Query = _interopRequireDefault(require("./Query"));

// Copyright 2017-2019 @polkadot/app-storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Queries extends _react.default.PureComponent {
  render() {
    const {
      onRemove,
      value
    } = this.props;

    if (!value || !value.length) {
      return null;
    }

    return _react.default.createElement("section", {
      className: "storage--Queries"
    }, value.map(query => _react.default.createElement(_Query.default, {
      key: query.id,
      onRemove: onRemove,
      value: query
    })));
  }

}

exports.default = Queries;