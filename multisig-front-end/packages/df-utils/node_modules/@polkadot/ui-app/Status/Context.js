"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueProvider = exports.QueueConsumer = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const defaultState = {
  stqueue: [],
  txqueue: []
};

const Context = _react.default.createContext(defaultState);

const QueueConsumer = Context.Consumer;
exports.QueueConsumer = QueueConsumer;
const QueueProvider = Context.Provider;
exports.QueueProvider = QueueProvider;
var _default = Context;
exports.default = _default;