"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

var _react = _interopRequireDefault(require("react"));

var _jsonrpc = _interopRequireDefault(require("@polkadot/jsonrpc"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function createOptions(sectionName) {
  const section = _jsonrpc.default[sectionName];

  if (!section) {
    return [];
  }

  return Object.keys(section.methods).sort().filter(value => {
    const {
      isDeprecated,
      isHidden,
      isSubscription
    } = section.methods[value];
    return !isDeprecated && !isHidden && !isSubscription;
  }).map(value => {
    const {
      description,
      params
    } = section.methods[value];
    const inputs = params.map((_ref) => {
      let {
        name
      } = _ref;
      return name;
    }).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: "".concat(sectionName, "_").concat(value),
      text: [_react.default.createElement("div", {
        className: "ui--DropdownLinked-Item-call",
        key: "".concat(sectionName, "_").concat(value, ":call")
      }, value, "(", inputs, ")"), _react.default.createElement("div", {
        className: "ui--DropdownLinked-Item-text",
        key: "".concat(sectionName, "_").concat(value, ":text")
      }, description || value)],
      value
    };
  });
}