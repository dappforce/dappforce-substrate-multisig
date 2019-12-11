"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiApi = require("@polkadot/ui-api");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class SummarySession extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_react.default.Fragment, null, this.renderSession(), this.renderEra());
  } // private renderBroken () {
  //   const { sessionBrokenValue, sessionBrokenPercentLate, t, withBroken = true } = this.props;
  //   if (!withBroken) {
  //     return null;
  //   }
  //   return (
  //     <CardSummary
  //       label={t('lateness')}
  //       progress={{
  //         color: 'autoReverse',
  //         isPercent: true,
  //         total: sessionBrokenPercentLate,
  //         value: sessionBrokenValue
  //       }}
  //     />
  //   );
  // }


  renderEra() {
    const {
      session_eraLength,
      session_eraProgress,
      t,
      withEra = true
    } = this.props;

    if (!withEra) {
      return null;
    }

    return _react.default.createElement(_uiApp.CardSummary, {
      label: t('era'),
      progress: {
        total: session_eraLength,
        value: session_eraProgress
      }
    });
  }

  renderSession() {
    const {
      session_sessionProgress,
      session_sessionLength = new _bn.default(0),
      t,
      withSession = true
    } = this.props;

    if (!withSession) {
      return null;
    }

    return _react.default.createElement(_uiApp.CardSummary, {
      label: t('session'),
      progress: {
        total: session_sessionLength,
        value: session_sessionProgress
      }
    });
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)('derive.session.eraLength', 'derive.session.eraProgress', 'derive.session.sessionProgress', 'query.session.sessionLength')(SummarySession));

exports.default = _default;