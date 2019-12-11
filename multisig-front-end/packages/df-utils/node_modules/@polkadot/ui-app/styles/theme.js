"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoPadding = exports.logoBackground = exports.primaryColor = void 0;

var _styledTheming = _interopRequireDefault(require("styled-theming"));

/* Copyright 2017-2019 @polkadot/ui-app authors & contributors
/* This software may be modified and distributed under the terms
/* of the Apache-2.0 license. See the LICENSE file for details. */
const primaryColor = (0, _styledTheming.default)('theme', {
  substrate: '#DB2828',
  polkadot: '#E6007A'
});
exports.primaryColor = primaryColor;
const logoBackground = (0, _styledTheming.default)('theme', {
  substrate: '#333',
  polkadot: 'none'
});
exports.logoBackground = logoBackground;
const logoPadding = (0, _styledTheming.default)('theme', {
  substrate: '4px',
  polkadot: '0px'
});
exports.logoPadding = logoPadding;