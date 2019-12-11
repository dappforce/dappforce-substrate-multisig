"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-xhr-backend';
_i18next.default // .use(Backend)
// .use(LanguageDetector)
.use(_reactI18next.initReactI18next).init({
  // backend: {
  //   loadPath: 'locales/{{lng}}/{{ns}}.json'
  // },
  debug: false,
  defaultNS: 'ui',
  fallbackLng: false,
  interpolation: {
    escapeValue: false
  },
  lng: 'en',
  ns: ['ui'],
  react: {
    wait: true
  }
}).then(() => console.log('i18n: success')).catch(error => console.log('i18n: failure', error));

var _default = _i18next.default;
exports.default = _default;