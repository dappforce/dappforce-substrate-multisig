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

// Copyright 2017-2019 @polkadot/ui-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ValidateController extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      bondedId: null,
      stashId: null
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      staking_bonded,
      staking_ledger
    } = _ref;
    return {
      bondedId: staking_bonded && staking_bonded.isSome ? staking_bonded.unwrap().toString() : null,
      stashId: staking_ledger && staking_ledger.isSome ? staking_ledger.unwrap().stash.toString() : null
    };
  }

  render() {
    const {
      accountId,
      controllerId,
      t
    } = this.props;
    const {
      bondedId,
      stashId
    } = this.state;
    let error;

    if (controllerId === accountId) {
      error = t('A controller account which is not the same as your selected account is recommended');
    } else if (bondedId) {
      error = t('A controller account should not map to another stash. This selected controller is a stash, controlled by {{bondedId}}', {
        replace: {
          bondedId
        }
      });
    } else if (stashId) {
      error = t('A controller account should not be set to manages multiple stashes. The selected controller is already controlling {{stashId}}', {
        replace: {
          stashId
        }
      });
    } else {
      return null;
    }

    return _react.default.createElement("article", {
      className: "warning"
    }, _react.default.createElement("div", null, _react.default.createElement(_uiApp.Icon, {
      name: "warning sign"
    }), error));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)(['query.staking.bonded', {
  paramName: 'controllerId'
}], ['query.staking.ledger', {
  paramName: 'controllerId'
}])(ValidateController));

exports.default = _default;