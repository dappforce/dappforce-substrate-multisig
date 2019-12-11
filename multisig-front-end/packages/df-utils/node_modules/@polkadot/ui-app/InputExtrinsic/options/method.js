"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createOptions;

var _react = _interopRequireDefault(require("react"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function createOptions(api, sectionName) {
  const section = api.tx[sectionName];

  if (!section) {
    return [];
  }

  return Object.keys(section).sort().map(value => {
    const method = section[value];
    const inputs = method.meta.arguments.filter(arg => arg.type.toString() !== 'Origin').map(arg => arg.name.toString()).join(', ');
    return {
      className: 'ui--DropdownLinked-Item',
      key: "".concat(sectionName, "_").concat(value),
      text: [_react.default.createElement("div", {
        className: "ui--DropdownLinked-Item-call",
        key: "".concat(sectionName, "_").concat(value, ":call")
      }, value, "(", inputs, ")"), _react.default.createElement("div", {
        className: "ui--DropdownLinked-Item-text",
        key: "".concat(sectionName, "_").concat(value, ":text")
      }, (method.meta.documentation[0] || value).toString())],
      value
    };
  });
}