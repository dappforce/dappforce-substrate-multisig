"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ExtrinsicsApp = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _Context = require("@polkadot/ui-app/Status/Context");

var _uiApp = require("@polkadot/ui-app");

var _Selection = _interopRequireDefault(require("./Selection"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ExtrinsicsApp extends _react.default.PureComponent {
  render() {
    const {
      basePath,
      t
    } = this.props;
    return _react.default.createElement("main", {
      className: "extrinsics--App"
    }, _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      items: [{
        name: 'create',
        text: t('Extrinsic submission')
      }]
    })), _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        queueExtrinsic
      } = _ref;
      return _react.default.createElement(_Selection.default, {
        queueExtrinsic: queueExtrinsic
      });
    }));
  }

}

exports.ExtrinsicsApp = ExtrinsicsApp;

var _default = (0, _translate.default)(ExtrinsicsApp);

exports.default = _default;