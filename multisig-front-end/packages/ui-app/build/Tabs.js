"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _util = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Tabs extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderItem = (_ref, index) => {
      let {
        hasParams,
        name,
        text
      } = _ref;
      const {
        basePath
      } = this.props;
      const to = index === 0 ? basePath : "".concat(basePath, "/").concat(name); // only do exact matching when not the fallback (first position tab),
      // params are problematic for dynamic hidden such as app-accounts

      const isExact = !hasParams || index === 0;
      return _react.default.createElement(_reactRouterDom.NavLink, {
        activeClassName: "active",
        className: "item",
        exact: isExact,
        key: to,
        strict: isExact,
        to: to
      }, text);
    };
  }

  render() {
    const {
      className,
      hidden = [],
      items,
      style
    } = this.props;
    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--Menu ui menu tabular', className),
      style: style
    }, items.filter((_ref2) => {
      let {
        name
      } = _ref2;
      return !hidden.includes(name);
    }).map(this.renderItem));
  }

}

exports.default = Tabs;