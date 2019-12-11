"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@polkadot/ui-app/Button"));

var _uiApi = require("@polkadot/ui-api");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-transfer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Submit extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onMakeTransfer = () => {
      const {
        accountId,
        system_accountNonce,
        extrinsic,
        queueExtrinsic
      } = this.props;

      if (!extrinsic) {
        return;
      }

      queueExtrinsic({
        extrinsic,
        accountId,
        accountNonce: system_accountNonce
      });
    };
  }

  render() {
    const {
      extrinsic,
      isDisabled,
      t
    } = this.props;
    return _react.default.createElement(_Button.default.Group, null, _react.default.createElement(_Button.default, {
      isDisabled: isDisabled || !extrinsic,
      isPrimary: true,
      onClick: this.onMakeTransfer,
      label: t('Make Transfer')
    }));
  }

}

var _default = (0, _uiApi.withMulti)(Submit, _translate.default, (0, _uiApi.withCall)('query.system.accountNonce', {
  paramName: 'accountId'
}));

exports.default = _default;