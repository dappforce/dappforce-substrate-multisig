"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class RecentlyOffline extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false
    };

    this.toggleOpen = () => {
      this.setState((_ref) => {
        let {
          isOpen
        } = _ref;
        return {
          isOpen: !isOpen
        };
      });
    };
  }

  render() {
    const {
      offline,
      inline,
      tooltip = false,
      t
    } = this.props;
    const {
      isOpen
    } = this.state;
    const accountId = this.props.accountId.toString();
    const count = offline.reduce((total, _ref2) => {
      let {
        count
      } = _ref2;
      return total.add(count);
    }, new _bn.default(0));
    const blockNumbers = offline.map((_ref3) => {
      let {
        blockNumber
      } = _ref3;
      return "#".concat((0, _util.formatNumber)(blockNumber));
    });
    const tooltipData = {
      'data-for': "offline-".concat(accountId),
      'data-tip': true,
      'data-tip-disable': !tooltip
    };
    const text = t('Reported offline {{count}} times, last at {{blockNumber}}', {
      replace: {
        count,
        blockNumber: blockNumbers[blockNumbers.length - 1]
      }
    });
    return _react.default.createElement("div", (0, _extends2.default)({
      className: ['ui--RecentlyOffline', isOpen ? 'expand' : '', tooltip ? 'tooltip' : '', inline ? 'inline' : ''].join(' ')
    }, !tooltip ? {
      onClick: this.toggleOpen
    } : {}, tooltipData), _react.default.createElement("div", {
      className: "badge"
    }, count.toString()), _react.default.createElement("div", {
      className: "detail"
    }, text), _react.default.createElement(_reactTooltip.default, {
      delayShow: 250,
      effect: "solid",
      id: "offline-".concat(accountId),
      place: "bottom"
    }, text));
  }

}

var _default = (0, _translate.default)(RecentlyOffline);

exports.default = _default;