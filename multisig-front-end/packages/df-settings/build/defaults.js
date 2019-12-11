"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UITHEMES = exports.UITHEME_DEFAULT = exports.UIMODES = exports.UIMODE_DEFAULT = exports.LANGUAGES = exports.LANGUAGE_DEFAULT = exports.ENDPOINTS = exports.ENDPOINT_DEFAULT = exports.CRYPTOS = void 0;
// Copyright 2017-2019 @polkadot/ui-settings authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const WSS_LOCALHOST = 'ws://127.0.0.1:9944/';
const ENDPOINTS = [{
  text: 'Local Node (127.0.0.1:9944)',
  value: WSS_LOCALHOST
}];
exports.ENDPOINTS = ENDPOINTS;
const LANGUAGE_DEFAULT = 'default';
exports.LANGUAGE_DEFAULT = LANGUAGE_DEFAULT;
const CRYPTOS = [{
  text: 'Edwards (ed25519)',
  value: 'ed25519'
}, {
  text: 'Schnorrkel (sr25519)',
  value: 'sr25519'
}];
exports.CRYPTOS = CRYPTOS;
const LANGUAGES = [{
  value: LANGUAGE_DEFAULT,
  text: 'Default browser language (auto-detect)'
}];
exports.LANGUAGES = LANGUAGES;
const UIMODES = [{
  value: 'full',
  text: 'Fully featured'
}, {
  value: 'light',
  text: 'Basic features only'
}];
exports.UIMODES = UIMODES;
const UITHEMES = [{
  value: 'substrate',
  text: 'Substrate'
}];
exports.UITHEMES = UITHEMES;
const ENDPOINT_DEFAULT = WSS_LOCALHOST;
exports.ENDPOINT_DEFAULT = ENDPOINT_DEFAULT;
const UITHEME_DEFAULT = 'substrate'; // tslint:disable-next-line

exports.UITHEME_DEFAULT = UITHEME_DEFAULT;
const UIMODE_DEFAULT = typeof window !== 'undefined' ? 'light' : 'full';
exports.UIMODE_DEFAULT = UIMODE_DEFAULT;