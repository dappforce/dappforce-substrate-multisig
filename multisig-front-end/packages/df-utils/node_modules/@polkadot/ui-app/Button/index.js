"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Button.css");

var _Button2 = _interopRequireDefault(require("./Button"));

var _Divider = _interopRequireDefault(require("./Divider"));

var _Group = _interopRequireDefault(require("./Group"));

var _Or = _interopRequireDefault(require("./Or"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
_Button2.default.Divider = _Divider.default;
_Button2.default.Group = _Group.default;
_Button2.default.Or = _Or.default;
var _default = _Button2.default;
exports.default = _default;