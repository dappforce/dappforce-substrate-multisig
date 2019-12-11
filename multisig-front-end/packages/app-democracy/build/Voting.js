"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _Context = require("@polkadot/ui-app/Status/Context");

var _accounts = _interopRequireDefault(require("@polkadot/ui-keyring/observable/accounts"));

var _uiApi = require("@polkadot/ui-api");

var _VotingButtons = _interopRequireDefault(require("./VotingButtons"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Voting extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onChangeAccount = accountId => {
      this.setState({
        accountId
      });
    };
  }

  render() {
    const {
      allAccounts,
      t
    } = this.props;
    const hasAccounts = allAccounts && Object.keys(allAccounts).length !== 0;

    if (!hasAccounts) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "democracy--Referendum-vote"
    }, _react.default.createElement(_uiApp.InputAddress, {
      label: t('vote using my account'),
      onChange: this.onChangeAccount,
      placeholder: "0x...",
      type: "account",
      withLabel: true
    }), this.renderButtons());
  }

  renderButtons() {
    const {
      referendumId
    } = this.props;
    const {
      accountId
    } = this.state;

    if (!accountId) {
      return null;
    }

    return _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        queueExtrinsic
      } = _ref;
      return _react.default.createElement(_VotingButtons.default, {
        accountId: accountId,
        queueExtrinsic: queueExtrinsic,
        referendumId: referendumId
      });
    });
  }

}

var _default = (0, _uiApi.withMulti)(Voting, _translate.default, (0, _uiApi.withObservable)(_accounts.default.subject, {
  propName: 'allAccounts'
}));

exports.default = _default;