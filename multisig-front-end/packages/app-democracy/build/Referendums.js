"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _Referendum = _interopRequireDefault(require("./Referendum"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Referendums extends _react.default.PureComponent {
  render() {
    const {
      t
    } = this.props;
    return _react.default.createElement("section", {
      className: "democracy--Referendums"
    }, _react.default.createElement("h1", null, t('referendums')), this.renderReferendums());
  }

  renderReferendums() {
    const {
      democracy_referendums = [],
      t
    } = this.props;
    const referendums = democracy_referendums.filter(opt => opt.isSome).map(opt => opt.unwrap());

    if (!referendums.length) {
      return _react.default.createElement("div", {
        className: "ui disabled"
      }, t('no available referendums'));
    }

    return referendums.map(referendum => _react.default.createElement(_Referendum.default, {
      idNumber: referendum.index,
      key: referendum.index.toString(),
      value: referendum
    }));
  }

}

var _default = (0, _translate.default)((0, _uiApi.withCalls)('derive.democracy.referendums')(Referendums));

exports.default = _default;