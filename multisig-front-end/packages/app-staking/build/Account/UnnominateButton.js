"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class UnnominateButton extends _react.default.Component {
  constructor() {
    super(...arguments);

    this.onClick = () => {
      const {
        accountId,
        staking_nominatorsFor,
        onClick
      } = this.props;
      onClick(staking_nominatorsFor.map(accountId => accountId.toString()).indexOf(accountId));
    };
  }

  render() {
    const {
      nominating,
      staking_nominatorsFor,
      style,
      t
    } = this.props;

    if (!nominating || !staking_nominatorsFor) {
      return null;
    }

    return _react.default.createElement(_uiApp.Button, {
      className: "staking--Account-buttons",
      style: style,
      isNegative: true,
      onClick: this.onClick,
      label: t('Unnominate')
    });
  }

}

var _default = (0, _uiApi.withMulti)(UnnominateButton, _translate.default, (0, _uiApi.withCall)('query.staking.nominatorsFor', {
  paramName: 'nominating'
}));

exports.default = _default;