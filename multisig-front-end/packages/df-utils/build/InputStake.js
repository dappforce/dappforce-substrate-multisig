"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("@polkadot/ui-app/index");

var _util = require("@polkadot/util");

class Component extends _react.default.PureComponent {
  render() {
    const {
      min,
      label,
      isValid,
      onChange
    } = this.props;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_index.InputBalance, {
      className: "medium",
      label: label || 'Amount to be staked:',
      onChange: onChange
    }), min && !min.isZero() && _react.default.createElement("div", {
      className: "medium",
      style: {
        marginLeft: '.5rem'
      }
    }, _react.default.createElement(_index.Bubble, {
      className: "left pointing ".concat(isValid ? 'ok' : 'warn'),
      icon: isValid ? 'check' : 'warning sign',
      label: "Minimum stake"
    }, (0, _util.formatBalance)(min))));
  }

}

exports.default = Component;