"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _index = require("@polkadot/ui-app/index");

class Component extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = event => {
      const {
        onChange
      } = this.props;
      const {
        value
      } = event.target;
      onChange && onChange(value);
    };
  }

  render() {
    const _this$props = this.props,
          {
      as,
      autoHeight,
      rows,
      style,
      value,
      label,
      labelClass,
      labelStyle,
      withLabel = true,
      onChange
    } = _this$props,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["as", "autoHeight", "rows", "style", "value", "label", "labelClass", "labelStyle", "withLabel", "onChange"]);
    return _react.default.createElement(_index.Labelled, {
      className: labelClass,
      style: labelStyle,
      label: label,
      withLabel: withLabel
    }, _react.default.createElement("div", {
      className: "ui form"
    }, _react.default.createElement(_semanticUiReact.TextArea, (0, _extends2.default)({}, otherProps, {
      as: as,
      autoHeight: autoHeight,
      rows: rows,
      style: style,
      value: value,
      onChange: this.onChange
    }))));
  }

}

exports.default = Component;