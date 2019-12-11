"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pluralize = Pluralize;

var _react = _interopRequireDefault(require("react"));

function Pluralize(props) {
  let {
    count,
    singularText,
    pluralText
  } = props;

  if (!count) {
    count = 0;
  } else {
    count = typeof count !== 'number' ? count.toNumber() : count;
  }

  const plural = () => !pluralText ? singularText + 's' : pluralText;

  const text = count === 1 ? singularText : plural();
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("b", null, count), " ", text);
}