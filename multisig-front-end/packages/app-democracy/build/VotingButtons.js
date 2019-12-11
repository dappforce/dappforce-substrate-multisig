"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class VotingButton extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onClickYes = () => {
      this.doVote(true);
    };

    this.onClickNo = () => {
      this.doVote(false);
    };
  }

  render() {
    const {
      accountId,
      t
    } = this.props;
    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !accountId,
      isNegative: true,
      label: t('Nay'),
      onClick: this.onClickNo
    }), _react.default.createElement(_uiApp.Button.Or, null), _react.default.createElement(_uiApp.Button, {
      isDisabled: !accountId,
      isPositive: true,
      label: t('Aye'),
      onClick: this.onClickYes
    }));
  }

  doVote(vote) {
    const {
      accountId,
      api,
      queueExtrinsic,
      referendumId
    } = this.props;

    if (!accountId) {
      return;
    }

    queueExtrinsic({
      extrinsic: api.tx.democracy.vote(referendumId, vote ? -1 : 0),
      accountId
    });
  }

}

var _default = (0, _uiApi.withMulti)(VotingButton, _translate.default, _uiApi.withApi);

exports.default = _default;