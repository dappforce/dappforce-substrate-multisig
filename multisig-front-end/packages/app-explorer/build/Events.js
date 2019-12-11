"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Events extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderEvent = (_ref, index) => {
      let {
        event,
        phase
      } = _ref;
      const {
        withoutIndex
      } = this.props;
      const extIndex = !withoutIndex && phase.type === 'ApplyExtrinsic' ? phase.asApplyExtrinsic : -1;

      if (!event.method || !event.section) {
        return null;
      }

      return _react.default.createElement("article", {
        className: "explorer--Container",
        key: index
      }, _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("h3", null, event.section, ".", event.method, "\xA0", extIndex !== -1 ? "(#".concat((0, _util.formatNumber)(extIndex), ")") : '')), _react.default.createElement("details", null, _react.default.createElement("summary", null, event.meta && event.meta.documentation ? event.meta.documentation.join(' ') : 'Details'), _react.default.createElement(_uiApp.Event, {
        className: "details",
        value: event
      })));
    };
  }

  render() {
    const {
      emptyLabel,
      eventClassName,
      value,
      t
    } = this.props;

    if (!value || value.length === 0) {
      return emptyLabel || t('no events available');
    }

    return value.filter((_ref2) => {
      let {
        event
      } = _ref2;
      return event;
    }) // event.section !== 'system')
    .map((event, index) => {
      const rendered = this.renderEvent(event, index);
      return eventClassName ? _react.default.createElement("div", {
        className: eventClassName,
        key: index
      }, rendered) : rendered;
    });
  }

}

var _default = (0, _translate.default)(Events);

exports.default = _default;