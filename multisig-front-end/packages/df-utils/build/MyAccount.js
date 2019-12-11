"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMyAccount = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _with = require("@polkadot/ui-api/with");

var _MyAccountContext = require("@polkadot/df-utils/MyAccountContext");

function withMyAddress(Component) {
  return function (props) {
    const {
      state: {
        address
      }
    } = (0, _MyAccountContext.useMyAccount)();
    return _react.default.createElement(Component, (0, _extends2.default)({
      myAddress: address
    }, props));
  };
}

const withMyAccount = Component => (0, _with.withMulti)(Component, withMyAddress);

exports.withMyAccount = withMyAccount;