"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiProvider = exports.ApiConsumer = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const ApiContext = _react.default.createContext({});

const ApiConsumer = ApiContext.Consumer;
exports.ApiConsumer = ApiConsumer;
const ApiProvider = ApiContext.Provider;
exports.ApiProvider = ApiProvider;
var _default = ApiContext;
exports.default = _default;