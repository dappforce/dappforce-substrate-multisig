"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withApi;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _ApiContext = require("../ApiContext");

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function withApi(Inner) {
  let defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return class WithApi extends _react.default.PureComponent {
    render() {
      return _react.default.createElement(_ApiContext.ApiConsumer, null, apiProps => {
        (0, _util.assert)(apiProps && apiProps.api, "Application root must be wrapped inside 'rx-react/Api' to provide API context");
        return (// @ts-ignore Something here with the props are going wonky
          _react.default.createElement(Inner, (0, _extends2.default)({}, defaultProps, apiProps, this.props))
        );
      });
    }

  };
}