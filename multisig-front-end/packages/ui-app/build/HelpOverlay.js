"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "HelpOverlay__Wrapper",
  componentId: "h0tq9u-0"
})([".help-button{color:#2196f3;cursor:pointer;font-size:2rem;padding:1.5rem 1rem 0 0;}> .help-button{position:absolute;right:0rem;top:3.75rem;}.help-slideout{background:#eee;border-left:0.25rem solid #ddd;max-width:50rem;overflow-y:scroll;position:fixed;right:0;top:0;bottom:0;z-index:10;.help-button{text-align:right;}.help-content{padding:1rem 1.5rem 5rem;}}"]);

class HelpOverlay extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isVisible: false
    };

    this.toggleVisible = () => {
      this.setState((_ref) => {
        let {
          isVisible
        } = _ref;
        return {
          isVisible: !isVisible
        };
      });
    };
  }

  render() {
    return _react.default.createElement(Wrapper, null, this.renderButton('help circle'), this.renderSlideout());
  }

  renderButton(name) {
    return _react.default.createElement("div", {
      className: "help-button"
    }, _react.default.createElement(_Icon.default, {
      name: name,
      onClick: this.toggleVisible
    }));
  }

  renderSlideout() {
    const {
      md
    } = this.props;
    const {
      isVisible
    } = this.state;

    if (!isVisible) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "help-slideout"
    }, this.renderButton('close'), _react.default.createElement(_reactMarkdown.default, {
      className: "help-content",
      escapeHtml: false,
      source: md
    }));
  }

}

exports.default = HelpOverlay;