"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _Progress = _interopRequireDefault(require("./Progress"));

var _Labelled = _interopRequireDefault(require("./Labelled"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const Card = _styledComponents.default.article.withConfig({
  displayName: "CardSummary__Card",
  componentId: "sc-1cc78po-0"
})(["align-items:center;box-shadow:none;color:rgba(0,0,0,0.6);display:flex;flex:0 1 auto;flex-flow:row wrap;justify-content:flex-end;min-height:5.7rem;padding:0.5rem 1.5rem;> div{font-size:2.1rem;font-weight:100;position:relative;line-height:2.1rem;text-align:right;> *{margin:0.6rem 0;&:first-child{margin-top:0;}&:last-child{margin-bottom:0;}}> label{line-height:1rem;font-size:0.95rem;}.progress{margin:0.2rem 0 -0.5rem !important;background:rgba(0,0,0,0.05);}}@media(max-width:767px){min-height:4.8rem;padding:0.25 0.4em;> div{font-size:1.4rem;line-height:1.4rem;}}"]);

class CardSummary extends _react.default.PureComponent {
  render() {
    const {
      children,
      className,
      help,
      label,
      progress,
      style
    } = this.props;
    const value = progress && progress.value;
    const total = progress && progress.total;
    const left = progress && !(0, _util.isUndefined)(value) && !(0, _util.isUndefined)(total) && value.gten(0) && total.gtn(0) ? value.gt(total) ? ">".concat(progress.isPercent ? '100' : total.toString()) : progress.isPercent ? value.muln(100).div(total).toString() : value.toString() : undefined;

    if (progress && (0, _util.isUndefined)(left)) {
      return null;
    }

    return _react.default.createElement(Card, {
      className: className,
      style: style
    }, _react.default.createElement(_Labelled.default, {
      help: help,
      isSmall: true,
      label: label
    }, children, progress && !progress.hideValue && (!left || (0, _util.isUndefined)(progress.total) ? '-' : "".concat(left).concat(progress.isPercent ? '' : '/').concat(progress.isPercent ? '%' : progress.total.toString())), progress && _react.default.createElement(_Progress.default, progress)));
  }

}

exports.default = CardSummary;