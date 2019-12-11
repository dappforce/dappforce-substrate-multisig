"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../InputExtrinsic/InputExtrinsic.css");

var _react = _interopRequireDefault(require("react"));

var _jsonrpc = _interopRequireDefault(require("@polkadot/jsonrpc"));

var _Labelled = _interopRequireDefault(require("../Labelled"));

var _translate = _interopRequireDefault(require("../translate"));

var _SelectMethod = _interopRequireDefault(require("./SelectMethod"));

var _SelectSection = _interopRequireDefault(require("./SelectSection"));

var _method = _interopRequireDefault(require("./options/method"));

var _section = _interopRequireDefault(require("./options/section"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// TODO: We have a lot shared between this and InputExtrinsic & InputStorage
class InputRpc extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onMethodChange = newValue => {
      const {
        onChange
      } = this.props;
      const {
        value
      } = this.state;

      if (value.section === newValue.section && value.method === newValue.method) {
        return;
      }

      this.setState({
        value: newValue
      }, () => onChange && onChange(newValue));
    };

    this.onSectionChange = newSection => {
      const {
        value
      } = this.state;

      if (newSection === value.section) {
        return;
      }

      const optionsMethod = (0, _method.default)(newSection);
      const newValue = _jsonrpc.default[newSection].methods[optionsMethod[0].value];
      this.setState({
        optionsMethod
      }, () => this.onMethodChange(newValue));
    };

    const {
      section
    } = this.props.defaultValue;
    this.state = {
      optionsMethod: (0, _method.default)(section),
      optionsSection: (0, _section.default)(),
      value: this.props.defaultValue
    };
  }

  render() {
    const {
      className,
      help,
      label,
      style,
      withLabel
    } = this.props;
    const {
      optionsMethod,
      optionsSection,
      value
    } = this.state;
    return _react.default.createElement("div", {
      className: className,
      style: style
    }, _react.default.createElement(_Labelled.default, {
      help: help,
      label: label,
      withLabel: withLabel
    }, _react.default.createElement("div", {
      className: " ui--DropdownLinked ui--row"
    }, _react.default.createElement(_SelectSection.default, {
      className: "small",
      onChange: this.onSectionChange,
      options: optionsSection,
      value: value
    }), _react.default.createElement(_SelectMethod.default, {
      className: "large",
      onChange: this.onMethodChange,
      options: optionsMethod,
      value: value
    }))));
  }

}

var _default = (0, _translate.default)(InputRpc);

exports.default = _default;