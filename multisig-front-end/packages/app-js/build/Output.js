"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const format = value => {
  if ((0, _util.isError)(value)) {
    return value.stack ? value.stack : value.toString();
  } else if ((0, _util.isUndefined)(value)) {
    return 'undefined';
  } else if ((0, _util.isNull)(value)) {
    return 'null';
  } else if (Array.isArray(value)) {
    return "[".concat(value.map(value => format(value)).join(', '), "]");
  } else if (value instanceof Map) {
    return "{".concat([...value.entries()].map((_ref) => {
      let [key, value] = _ref;
      return key + ': ' + format(value);
    }).join(', '), "}");
  }

  return value.toString();
};

const renderEntry = (_ref2, index) => {
  let {
    args,
    type
  } = _ref2;
  return _react.default.createElement("div", {
    className: "js--Log ".concat(type),
    key: index
  }, args.map(arg => format(arg)).join(' '));
};

var _default = props => {
  return _react.default.createElement("article", {
    className: "container js--Output"
  }, _react.default.createElement("div", {
    className: "logs-wrapper"
  }, _react.default.createElement("div", {
    className: "logs-container"
  }, _react.default.createElement("pre", {
    className: "logs-content"
  }, props.logs.map(renderEntry)))), props.children);
};

exports.default = _default;