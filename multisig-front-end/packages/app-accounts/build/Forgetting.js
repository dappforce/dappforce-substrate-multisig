"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Forgetting extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_uiApp.Modal, {
      className: "accounts--Forgetting-Modal",
      dimmer: "inverted",
      open: true,
      size: "tiny"
    }, this.renderContent(), this.renderButtons());
  }

  renderButtons() {
    const {
      onClose,
      doForget,
      t
    } = this.props;
    return _react.default.createElement(_uiApp.Modal.Actions, null, _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isNegative: true,
      onClick: onClose,
      label: t('Cancel')
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isPrimary: true,
      onClick: doForget,
      label: t('Forget')
    })));
  }

  renderContent() {
    const {
      address,
      t
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_uiApp.Modal.Header, null, t('Confirm key removal')), _react.default.createElement(_uiApp.Modal.Content, null, _react.default.createElement(_uiApp.AddressSummary, {
      value: address
    })));
  }

}

var _default = (0, _translate.default)(Forgetting);

exports.default = _default;