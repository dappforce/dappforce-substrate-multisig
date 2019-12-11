"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Settings = void 0;

var _store = _interopRequireDefault(require("store"));

var _defaults = require("./defaults");

// Copyright 2017-2019 @polkadot/ui-settings authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Settings {
  constructor() {
    this._apiUrl = void 0;
    this._i18nLang = void 0;
    this._uiMode = void 0;
    this._uiTheme = void 0;
    const settings = _store.default.get('settings') || {};
    this._apiUrl = settings.apiUrl || process.env.WS_URL || _defaults.ENDPOINT_DEFAULT;
    this._i18nLang = settings.i18nLang || _defaults.LANGUAGE_DEFAULT;
    this._uiMode = settings.uiMode || _defaults.UIMODE_DEFAULT;
    this._uiTheme = settings.uiTheme || _defaults.UITHEME_DEFAULT;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  get i18nLang() {
    return this._i18nLang;
  }

  get uiMode() {
    return this._uiMode;
  }

  get isBasicMode() {
    return this._uiMode === 'light';
  }

  get isFullMode() {
    return this._uiMode === 'full';
  }

  get uiTheme() {
    return this._uiTheme;
  }

  get availableNodes() {
    return _defaults.ENDPOINTS;
  }

  get availableCryptos() {
    return _defaults.CRYPTOS;
  }

  get availableLanguages() {
    return _defaults.LANGUAGES;
  }

  get availableUIModes() {
    return _defaults.UIMODES;
  }

  get availableUIThemes() {
    return _defaults.UITHEMES;
  }

  get() {
    return {
      apiUrl: this._apiUrl,
      i18nLang: this._i18nLang,
      uiMode: this._uiMode,
      uiTheme: this._uiTheme
    };
  }

  set(settings) {
    this._apiUrl = settings.apiUrl || this._apiUrl;
    this._i18nLang = settings.i18nLang || this._i18nLang;
    this._uiMode = settings.uiMode || this._uiMode;
    this._uiTheme = settings.uiTheme || this._uiTheme;

    _store.default.set('settings', this.get());
  }

}

exports.Settings = Settings;
const settings = new Settings();
var _default = settings;
exports.default = _default;