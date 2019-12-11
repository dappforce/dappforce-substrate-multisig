"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelledField = LabelledField;
exports.LabelledText = LabelledText;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _dfUtils = require("@polkadot/df-utils/");

function LabelledField() {
  return props => {
    const {
      name,
      label,
      invisibleLabel = false,
      touched,
      errors,
      children
    } = props;
    const hasError = name && touched[name] && errors[name];

    const fieldWithError = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, children), name && _react.default.createElement(_formik.ErrorMessage, {
      name: name,
      component: "div",
      className: "ui pointing red label"
    }));

    return label || invisibleLabel ? _react.default.createElement("div", {
      className: "ui--Labelled field ".concat(hasError ? 'error' : '')
    }, _react.default.createElement("label", {
      htmlFor: name
    }, (0, _dfUtils.nonEmptyStr)(label) && label + ':'), _react.default.createElement("div", {
      className: "ui--Labelled-content"
    }, fieldWithError)) : _react.default.createElement("div", {
      className: "field ".concat(hasError ? 'error' : '')
    }, fieldWithError);
  };
}

function LabelledText() {
  const LF = LabelledField();
  return props => {
    const {
      name,
      placeholder,
      className,
      style
    } = props,
          otherProps = (0, _objectWithoutProperties2.default)(props, ["name", "placeholder", "className", "style"]);
    const fieldProps = {
      className,
      style,
      name,
      placeholder
    };
    return _react.default.createElement(LF, (0, _extends2.default)({
      name: name
    }, otherProps), _react.default.createElement(_formik.Field, (0, _extends2.default)({
      id: name,
      disabled: otherProps.isSubmitting
    }, fieldProps)));
  };
}