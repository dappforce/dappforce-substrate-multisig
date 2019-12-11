"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _Checks = _interopRequireDefault(require("./Checks"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Transaction extends _react.default.PureComponent {
  render() {
    const {
      children,
      value: {
        extrinsic
      }
    } = this.props;

    if (!extrinsic) {
      return null;
    }

    const {
      meta,
      method,
      section
    } = _types.Method.findFunction(extrinsic.callIndex);

    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, section, ".", method, _react.default.createElement("label", null, meta && meta.documentation ? meta.documentation.join(' ') : '')), _react.default.createElement(_uiApp.Modal.Content, {
      className: "ui--signer-Signer-Content"
    }, this.renderAccount(), _react.default.createElement(_uiApp.Call, {
      value: extrinsic
    }), this.renderChecks(), children));
  }

  renderAccount() {
    const {
      t,
      value: {
        accountId,
        isUnsigned
      }
    } = this.props;

    if (isUnsigned || !accountId) {
      return null;
    }

    return _react.default.createElement(_uiApp.InputAddress, {
      className: "full",
      defaultValue: accountId,
      isDisabled: true,
      isInput: true,
      label: t('sending from my account'),
      withLabel: true
    });
  }

  renderChecks() {
    const {
      isSendable,
      value: {
        accountId,
        extrinsic,
        isUnsigned
      }
    } = this.props;

    if (isUnsigned) {
      return null;
    }

    return _react.default.createElement(_Checks.default, {
      accountId: accountId,
      extrinsic: extrinsic,
      isSendable: isSendable
    });
  }

}

var _default = (0, _translate.default)(Transaction);

exports.default = _default;