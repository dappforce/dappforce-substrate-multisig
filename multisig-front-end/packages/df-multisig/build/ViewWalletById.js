"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translate = _interopRequireDefault(require("./translate"));

var _ViewWallet = _interopRequireDefault(require("./ViewWallet"));

var _types = require("@polkadot/types");

class Component extends _react.default.PureComponent {
  render() {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    return id ? _react.default.createElement(_ViewWallet.default, {
      walletId: new _types.AccountId(id)
    }) : null;
  }

}

var _default = (0, _translate.default)(Component);

exports.default = _default;