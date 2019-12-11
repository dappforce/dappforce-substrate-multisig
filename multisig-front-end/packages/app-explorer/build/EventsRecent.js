"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _utilCrypto = require("@polkadot/util-crypto");

var _BlockHeaders = require("./BlockHeaders");

var _Events = _interopRequireDefault(require("./Events"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class EventsRecent extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      prevEventHash: '',
      recentEvents: []
    };
  }

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      system_events = []
    } = _ref;
    const prevEventHash = (0, _utilCrypto.xxhashAsHex)((0, _util.stringToU8a)(JSON.stringify(system_events)));

    if (prevEventHash === prevState.prevEventHash) {
      return null;
    }

    const recentEvents = system_events.filter((_ref2) => {
      let {
        event
      } = _ref2;
      return event.section !== 'system';
    }).concat(prevState.recentEvents).filter((_, index) => index < _BlockHeaders.MAX_ITEMS);
    return {
      prevEventHash,
      recentEvents
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      recentEvents
    } = this.state;
    return _react.default.createElement("div", null, _react.default.createElement(_Events.default, {
      emptyLabel: t('no recent non-system events available'),
      value: recentEvents,
      withoutIndex: true
    }));
  }

}

var _default = (0, _uiApi.withMulti)(EventsRecent, _translate.default, (0, _uiApi.withCall)('query.system.events'));

exports.default = _default;