"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutedDiv = exports.MutedSpan = void 0;

var _react = _interopRequireDefault(require("react"));

function getClassNames(props) {
  const {
    smaller = false,
    className
  } = props;
  return "MutedText grey text ".concat(smaller ? 'smaller' : '', " ").concat(className);
}

const MutedSpan = props => {
  const {
    style,
    children
  } = props;
  return _react.default.createElement("span", {
    className: getClassNames(props),
    style: style
  }, children);
};

exports.MutedSpan = MutedSpan;

const MutedDiv = props => {
  const {
    style,
    children
  } = props;
  return _react.default.createElement("div", {
    className: getClassNames(props),
    style: style
  }, children);
};

exports.MutedDiv = MutedDiv;