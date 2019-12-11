"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _BaseBytes = _interopRequireDefault(require("./BaseBytes"));

var _File = _interopRequireDefault(require("./File"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Bytes extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isFileDrop: false
    };

    this.toggleFile = () => {
      this.setState((_ref) => {
        let {
          isFileDrop
        } = _ref;
        return {
          isFileDrop: !isFileDrop
        };
      });
    };

    this.onChangeFile = value => {
      const {
        onChange
      } = this.props;
      onChange && onChange({
        isValid: value.length !== 0,
        value: _types.Compact.addLengthPrefix(value)
      });
    };
  }

  render() {
    const {
      isDisabled
    } = this.props;
    const {
      isFileDrop
    } = this.state;
    return !isDisabled && isFileDrop ? this.renderFile() : this.renderInput();
  }

  renderInput() {
    const {
      className,
      defaultValue,
      isDisabled,
      isError,
      label,
      name,
      onChange,
      style,
      type,
      withLabel
    } = this.props;
    return _react.default.createElement(_BaseBytes.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: -1,
      name: name,
      onChange: onChange,
      size: "full",
      style: style,
      type: type,
      withLabel: withLabel,
      withLength: true
    }, this.renderFileButton());
  }

  renderFileButton() {
    const {
      isDisabled
    } = this.props;

    if (isDisabled) {
      return null;
    }

    return _react.default.createElement(_uiApp.Button, {
      icon: "file",
      isPrimary: true,
      onClick: this.toggleFile
    });
  }

  renderFile() {
    const {
      className,
      isDisabled,
      isError,
      label,
      style,
      withLabel
    } = this.props;
    return _react.default.createElement(_File.default, {
      className: className,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChangeFile,
      style: style,
      withLabel: withLabel
    });
  }

}

exports.default = Bytes;