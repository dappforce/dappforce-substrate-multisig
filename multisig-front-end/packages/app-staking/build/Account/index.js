"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _Bond = _interopRequireDefault(require("./Bond"));

var _BondExtra = _interopRequireDefault(require("./BondExtra"));

var _Nominating = _interopRequireDefault(require("./Nominating"));

var _SessionKey = _interopRequireDefault(require("./SessionKey"));

var _Validating = _interopRequireDefault(require("./Validating"));

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Account extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isBondOpen: false,
      isBondExtraOpen: false,
      isSessionKeyOpen: false,
      isNominateOpen: false,
      isValidatingOpen: false,
      isUnbondOpen: false
    };

    this.toggleBond = () => {
      this.setState((_ref) => {
        let {
          isBondOpen
        } = _ref;
        return {
          isBondOpen: !isBondOpen
        };
      });
    };

    this.toggleBondExtra = () => {
      this.setState((_ref2) => {
        let {
          isBondExtraOpen
        } = _ref2;
        return {
          isBondExtraOpen: !isBondExtraOpen
        };
      });
    };

    this.toggleNominate = () => {
      this.setState((_ref3) => {
        let {
          isNominateOpen
        } = _ref3;
        return {
          isNominateOpen: !isNominateOpen
        };
      });
    };

    this.toggleSessionKey = () => {
      this.setState((_ref4) => {
        let {
          isSessionKeyOpen
        } = _ref4;
        return {
          isSessionKeyOpen: !isSessionKeyOpen
        };
      });
    };

    this.toggleValidating = () => {
      this.setState((_ref5) => {
        let {
          isValidatingOpen
        } = _ref5;
        return {
          isValidatingOpen: !isValidatingOpen
        };
      });
    };
  }

  render() {
    const {
      accountId,
      controllerId,
      filter,
      name,
      stashId
    } = this.props;

    if (filter === 'controller' && !stashId || filter === 'stash' && !controllerId || filter === 'unbonded' && (controllerId || stashId)) {
      return null;
    }

    return _react.default.createElement("article", {
      className: "staking--Account"
    }, this.renderBond(), this.renderBondExtra(), this.renderNominating(), this.renderSessionKey(), this.renderValidating(), _react.default.createElement(_uiApp.AddressSummary, {
      name: name,
      value: accountId,
      identIconSize: 96,
      withBonded: true,
      withIndex: false,
      withNonce: false
    }, _react.default.createElement("div", {
      className: "staking--Account-expand"
    }, this.renderButtons(), this.renderControllerId(), this.renderStashId(), this.renderSessionId(), this.renderNominee(), this.renderNominators())));
  }

  renderBond() {
    const {
      accountId,
      controllerId
    } = this.props;
    const {
      isBondOpen
    } = this.state;
    return _react.default.createElement(_Bond.default, {
      accountId: accountId,
      controllerId: controllerId,
      isOpen: isBondOpen,
      onClose: this.toggleBond
    });
  }

  renderBondExtra() {
    const {
      accountId
    } = this.props;
    const {
      isBondExtraOpen
    } = this.state;
    return _react.default.createElement(_BondExtra.default, {
      accountId: accountId,
      isOpen: isBondExtraOpen,
      onClose: this.toggleBondExtra
    });
  }

  renderValidating() {
    const {
      accountId,
      stashId,
      staking_validators
    } = this.props;
    const {
      isValidatingOpen
    } = this.state;

    if (!staking_validators || !isValidatingOpen || !stashId) {
      return null;
    }

    return _react.default.createElement(_Validating.default, {
      accountId: accountId,
      isOpen: true,
      onClose: this.toggleValidating,
      preferences: staking_validators[0],
      stashId: stashId
    });
  }

  renderSessionKey() {
    const {
      accountId
    } = this.props;
    const {
      isSessionKeyOpen
    } = this.state;
    return _react.default.createElement(_SessionKey.default, {
      accountId: accountId,
      isOpen: isSessionKeyOpen,
      onClose: this.toggleSessionKey
    });
  } // private renderUnbond () {
  //   const { accountId } = this.props;
  //   const { controllerId, isBondingOpen } = this.state;
  //   if (!controllerId) {
  //     return null;
  //   }
  //   return (
  //     <UnBond
  //       accountId={accountId}
  //       controllerId={controllerId}
  //       isOpen={isBondingOpen}
  //       onClose={this.toggleBonding}
  //     />
  //   );
  // }


  renderNominee() {
    const {
      recentlyOffline,
      staking_nominators,
      t
    } = this.props;

    if (!staking_nominators || !staking_nominators[0].length) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "staking--Account-detail"
    }, _react.default.createElement("label", {
      className: "staking--label"
    }, t('nominating')), staking_nominators[0].map((nomineeId, index) => _react.default.createElement(_uiApp.AddressMini, {
      key: index,
      value: nomineeId,
      offlineStatus: recentlyOffline[nomineeId.toString()],
      withBalance: false,
      withBonded: true
    })));
  }

  renderNominators() {// const { staking_nominatorsFor } = this.props;
    // if (!staking_nominatorsFor) {
    //   return null;
    // }
    // return (
    //   <div className='staking--Account-detail'>
    //     <label className='staking--label'>nominators</label>
    //     <div className='ui--Nominators'>
    //       {staking_nominatorsFor.map((nominator) => (
    //         <AddressMini
    //           isPadded={false}
    //           key={nominator}
    //           value={nominator}
    //           withBalance
    //         />
    //       ))}
    //     </div>
    //   </div>
    // );
  }

  renderControllerId() {
    const {
      controllerId,
      recentlyOffline,
      t
    } = this.props;

    if (!controllerId) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "staking--Account-detail"
    }, _react.default.createElement("label", {
      className: "staking--label"
    }, t('controller')), _react.default.createElement(_uiApp.AddressMini, {
      value: controllerId,
      offlineStatus: recentlyOffline[controllerId.toString()]
    }));
  }

  renderSessionId() {
    const {
      sessionId,
      t
    } = this.props;

    if (!sessionId) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "staking--Account-detail"
    }, _react.default.createElement("label", {
      className: "staking--label"
    }, t('session')), _react.default.createElement(_uiApp.AddressMini, {
      value: sessionId
    }));
  }

  renderStashId() {
    const {
      recentlyOffline,
      stashId,
      t
    } = this.props;

    if (!stashId) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "staking--Account-detail"
    }, _react.default.createElement("label", {
      className: "staking--label"
    }, t('stash')), _react.default.createElement(_uiApp.AddressMini, {
      value: stashId,
      offlineStatus: recentlyOffline[stashId.toString()],
      withBalance: false,
      withBonded: true
    }));
  }

  renderNominating() {
    const {
      accountId,
      stashId,
      stashOptions
    } = this.props;
    const {
      isNominateOpen
    } = this.state;

    if (!stashId) {
      return null;
    }

    return _react.default.createElement(_Nominating.default, {
      accountId: accountId,
      isOpen: isNominateOpen,
      onClose: this.toggleNominate,
      stashId: stashId,
      stashOptions: stashOptions
    });
  }

  renderButtons() {
    const {
      accountId,
      controllerId,
      sessionId,
      stashId,
      staking_nominators,
      staking_validators,
      t
    } = this.props;
    const buttons = [];

    if (!stashId) {
      if (!controllerId) {
        buttons.push(_react.default.createElement(_uiApp.Button, {
          isPrimary: true,
          key: "bond",
          onClick: this.toggleBond,
          label: t('Bond Funds')
        }));
      } else {
        buttons.push(_react.default.createElement(_uiApp.Button, {
          isPrimary: true,
          key: "bond",
          onClick: this.toggleBondExtra,
          label: t('Bond Additional')
        }));
      }
    } else {
      const isNominating = staking_nominators && staking_nominators[0].length;
      const isValidating = staking_validators && !staking_validators[0].isEmpty;

      if (isValidating || isNominating) {
        buttons.push(_react.default.createElement(_uiApp.TxButton, {
          accountId: accountId,
          isNegative: true,
          label: isNominating ? t('Stop Nominating') : t('Stop Validating'),
          key: "stop",
          tx: "staking.chill"
        }));
      } else {
        if (!sessionId) {
          buttons.push(_react.default.createElement(_uiApp.Button, {
            isPrimary: true,
            key: "session",
            onClick: this.toggleSessionKey,
            label: t('Set Session Key')
          }));
        } else {
          buttons.push(_react.default.createElement(_uiApp.Button, {
            isPrimary: true,
            key: "validate",
            onClick: this.toggleValidating,
            label: t('Validate')
          }));
        }

        buttons.push(_react.default.createElement(_uiApp.Button.Or, {
          key: "nominate.or"
        }));
        buttons.push(_react.default.createElement(_uiApp.Button, {
          isPrimary: true,
          key: "nominate",
          onClick: this.toggleNominate,
          label: t('Nominate')
        }));
      }
    }

    return _react.default.createElement(_uiApp.Button.Group, null, buttons);
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)('query.staking.recentlyOffline', ['query.session.nextKeyFor', {
  paramName: 'accountId',
  propName: 'sessionId',
  transform: session => session.unwrapOr(null)
}], ['query.staking.bonded', {
  paramName: 'accountId',
  propName: 'controllerId',
  transform: bonded => bonded.unwrapOr(null)
}], ['query.staking.ledger', {
  paramName: 'accountId',
  propName: 'stashId',
  transform: ledger => ledger.unwrapOr({
    stash: null
  }).stash
}], ['query.staking.stakers', {
  paramName: 'accountId'
}], ['query.staking.nominators', {
  paramName: 'stashId'
}], ['query.staking.validators', {
  paramName: 'stashId'
}])(Account));

exports.default = _default;