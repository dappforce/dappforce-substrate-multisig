"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _VoteThreshold = _interopRequireDefault(require("@polkadot/ui-params/Param/VoteThreshold"));

var _uiApi = require("@polkadot/ui-api");

var _uiSettings = _interopRequireDefault(require("@polkadot/ui-settings"));

var _util = require("@polkadot/util");

var _Item = _interopRequireDefault(require("./Item"));

var _Voting = _interopRequireDefault(require("./Voting"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const COLORS_YAY = _uiSettings.default.uiTheme === 'substrate' ? ['#4d4', '#4e4'] : ['#64bebe', '#5badad'];
const COLORS_NAY = _uiSettings.default.uiTheme === 'substrate' ? ['#d44', '#e44'] : ['#d75ea1', '#e189ba'];

class Referendum extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      voteCount: 0,
      voteCountYay: 0,
      voteCountNay: 0,
      votedTotal: new _bn.default(0),
      votedYay: new _bn.default(0),
      votedNay: new _bn.default(0)
    };
  }

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      democracy_referendumVotesFor
    } = _ref;

    if (!democracy_referendumVotesFor) {
      return null;
    }

    const newState = democracy_referendumVotesFor.reduce((state, _ref2) => {
      let {
        balance,
        vote
      } = _ref2;

      if (vote.ltn(0)) {
        state.voteCountYay++;
        state.votedYay = state.votedYay.add(balance);
      } else {
        state.voteCountNay++;
        state.votedNay = state.votedNay.add(balance);
      }

      state.voteCount++;
      state.votedTotal = state.votedTotal.add(balance);
      return state;
    }, {
      voteCount: 0,
      voteCountYay: 0,
      voteCountNay: 0,
      votedTotal: new _bn.default(0),
      votedYay: new _bn.default(0),
      votedNay: new _bn.default(0)
    });

    if (newState.votedYay.eq(prevState.votedNay) && newState.votedNay.eq(prevState.votedNay)) {
      return null;
    }

    return newState;
  }

  render() {
    const {
      chain_bestNumber,
      value
    } = this.props;

    if (!chain_bestNumber || value.end.sub(chain_bestNumber).lten(0)) {
      return null;
    }

    return _react.default.createElement(_Item.default, {
      idNumber: value.index,
      proposal: value.proposal,
      proposalExtra: this.renderExtra()
    }, _react.default.createElement(_Voting.default, {
      referendumId: value.index
    }), this.renderResults());
  }

  renderExtra() {
    const {
      chain_bestNumber,
      democracy_publicDelay,
      t,
      value: {
        end,
        threshold
      }
    } = this.props;

    if (!chain_bestNumber) {
      return null;
    }

    const enactBlock = (democracy_publicDelay || new _bn.default(0)).add(end);
    return _react.default.createElement("div", {
      className: "democracy--Referendum-info"
    }, _react.default.createElement(_uiApp.Static, {
      label: t('ending at')
    }, t('block #{{blockNumber}}, {{remaining}} blocks remaining', {
      replace: {
        blockNumber: (0, _util.formatNumber)(end),
        remaining: (0, _util.formatNumber)(end.sub(chain_bestNumber).subn(1))
      }
    })), _react.default.createElement(_uiApp.Static, {
      label: t('activate at (if passed)')
    }, t('block #{{blockNumber}}', {
      replace: {
        blockNumber: (0, _util.formatNumber)(enactBlock)
      }
    })), _react.default.createElement(_VoteThreshold.default, {
      isDisabled: true,
      defaultValue: {
        value: threshold
      },
      label: t('vote threshold'),
      name: "voteThreshold",
      type: {
        info: 0,
        type: 'VoteThreshold'
      }
    }));
  }

  renderResults() {
    const {
      voteCount,
      voteCountYay,
      voteCountNay,
      votedTotal,
      votedYay,
      votedNay
    } = this.state;

    if (voteCount === 0 || votedTotal.eqn(0)) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "democracy--Referendum-results chart"
    }, _react.default.createElement(_uiApp.Chart.Doughnut, {
      values: [{
        colors: COLORS_YAY,
        label: "".concat((0, _util.formatBalance)(votedYay), " (").concat((0, _util.formatNumber)(voteCountYay), ")"),
        value: votedYay.muln(10000).div(votedTotal).toNumber() / 100
      }, {
        colors: COLORS_NAY,
        label: "".concat((0, _util.formatBalance)(votedNay), " (").concat((0, _util.formatNumber)(voteCountNay), ")"),
        value: votedNay.muln(10000).div(votedTotal).toNumber() / 100
      }]
    }));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)('derive.chain.bestNumber', ['derive.democracy.referendumVotesFor', {
  paramName: 'idNumber'
}], 'query.democracy.publicDelay')(Referendum));

exports.default = _default;