"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const StyledSummary = _styledComponents.default.div.withConfig({
  displayName: "SummaryBox__StyledSummary",
  componentId: "sc-1bt5mxw-0"
})(["align-items:stretch;border-radius:4px;display:flex;flex-wrap:no-wrap;justify-content:space-between;margin-bottom:2.5em;> section{display:flex;flex:0 1 auto;text-align:left;}details &{display:block;margin:0.5rem 0.25rem;opacity:0.75;outline:none;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap;+ div{margin-top:0.75rem;}}@media(max-width:767px){padding:0;.ui--media-small{display:none !important;}}.ui.label{padding-left:0;padding-right:0;padding-top:0;}"]);

class SummaryBox extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(StyledSummary, null, this.props.children);
  }

}

exports.default = SummaryBox;