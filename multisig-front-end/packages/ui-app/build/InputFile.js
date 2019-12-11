"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _util = require("./util");

var _Labelled = _interopRequireDefault(require("./Labelled"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class InputFile extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.onDrop = files => {
      const {
        onChange,
        onFileSelected
      } = this.props;
      files.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => {// ignore
        };

        reader.onerror = () => {// ignore
        }; // @ts-ignore ummm... events are not properly specified here?


        reader.onload = (_ref) => {
          let {
            target: {
              result
            }
          } = _ref;
          const data = new Uint8Array(result);
          const name = file.name;
          onChange && onChange(data, name);
          onFileSelected && onFileSelected(data, file);
          this.setState({
            file: {
              name,
              size: data.length
            }
          });
        };

        reader.readAsArrayBuffer(file);
      });
    };
  }

  render() {
    const {
      accept,
      className,
      clearContent,
      help,
      isDisabled,
      isError = false,
      label,
      placeholder,
      t,
      withLabel
    } = this.props;
    const {
      file
    } = this.state;
    return _react.default.createElement(_Labelled.default, {
      help: help,
      label: label,
      withLabel: withLabel
    }, _react.default.createElement(_reactDropzone.default, {
      accept: accept,
      className: (0, _util.classes)('ui--InputFile', isError ? 'error' : '', className),
      disabled: isDisabled,
      multiple: false,
      onDrop: this.onDrop
    }, _react.default.createElement("div", {
      className: "label"
    }, !file || clearContent ? placeholder || t('drag and drop the file here') : placeholder || t('{{name}} ({{size}} bytes)', {
      replace: file
    }))));
  }

}

var _default = (0, _translate.default)(InputFile);

exports.default = _default;