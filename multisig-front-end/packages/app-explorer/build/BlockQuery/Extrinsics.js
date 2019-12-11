"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _types = require("@polkadot/types");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Extrinsics extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderExtrinsic = (extrinsic, index) => {
      const {
        meta,
        method,
        section
      } = _types.Method.findFunction(extrinsic.callIndex);

      return _react.default.createElement("div", {
        className: "explorer--BlockByHash-block",
        key: "extrinsic:".concat(index)
      }, _react.default.createElement("article", {
        className: "explorer--Container"
      }, _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("h3", null, section, ".", method, "\xA0(#", (0, _util.formatNumber)(index), ")"), this.renderSigner(extrinsic)), _react.default.createElement("details", null, _react.default.createElement("summary", null, meta && meta.documentation ? meta.documentation.join(' ') : 'Details'), _react.default.createElement(_uiApp.Call, {
        className: "details",
        value: extrinsic
      }))));
    };
  }

  render() {
    const {
      label,
      t
    } = this.props;
    return _react.default.createElement("section", {
      key: "extrinsics"
    }, _react.default.createElement("h1", null, label || t('extrinsics')), this.renderContent());
  }

  renderContent() {
    const {
      t,
      value
    } = this.props;

    if (!value || !value.length) {
      return _react.default.createElement("div", {
        className: "ui disabled"
      }, t('no pending extrinsics are in the queue'));
    }

    return _react.default.createElement("div", {
      className: "explorer--BlockByHash-flexable ui--flex-medium"
    }, value.map(this.renderExtrinsic));
  } // FIXME This is _very_ similar to what we have in democracy/Item


  renderSigner(extrinsic) {
    const {
      t
    } = this.props;

    if (!extrinsic.signature.isSigned) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "explorer--BlockByHash-header-right"
    }, _react.default.createElement("div", null, _react.default.createElement(_uiApp.AddressMini, {
      value: extrinsic.signature.signer
    })), _react.default.createElement("div", {
      className: "explorer--BlockByHash-accountIndex"
    }, t('index'), " ", (0, _util.formatNumber)(extrinsic.signature.nonce)));
  }

}

var _default = (0, _translate.default)(Extrinsics);

exports.default = _default;