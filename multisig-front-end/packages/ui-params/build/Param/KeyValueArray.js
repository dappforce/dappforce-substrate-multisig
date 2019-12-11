"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translate = _interopRequireDefault(require("@polkadot/ui-app/translate"));

var _util = require("@polkadot/util");

var _Base = _interopRequireDefault(require("./Base"));

var _Bytes = _interopRequireDefault(require("./Bytes"));

var _File = _interopRequireDefault(require("./File"));

var _KeyValue = _interopRequireDefault(require("./KeyValue"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const BYTES_TYPE = {
  type: 'Bytes',
  info: 0
};

class KeyValueArray extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.placeholderEmpty = void 0;

    this.onChange = raw => {
      const {
        onChange,
        t
      } = this.props;
      let encoded = {
        isValid: false,
        value: []
      };

      try {
        encoded = this.parseFile(raw);
        this.setState({
          placeholder: t('{{count}} key/value pairs encoded for submission', {
            replace: {
              count: encoded.value.length
            }
          })
        });
      } catch (error) {
        console.error('Error converting json k/v', error);
        this.setState({
          placeholder: this.placeholderEmpty
        });
      }

      onChange && onChange(encoded);
    };

    this.placeholderEmpty = props.t('drag and drop JSON key/value (hex-encoded) file');
    this.state = {
      placeholder: this.placeholderEmpty
    };
  }

  render() {
    const {
      className,
      isDisabled,
      isError,
      label,
      style,
      withLabel
    } = this.props;
    const {
      placeholder
    } = this.state;

    if (isDisabled) {
      return this.renderReadOnly();
    }

    return _react.default.createElement(_File.default, {
      className: className,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: this.onChange,
      placeholder: placeholder,
      style: style,
      withLabel: withLabel
    });
  }

  renderReadOnly() {
    const {
      className,
      defaultValue: {
        value
      },
      label,
      style
    } = this.props;
    const pairs = value;
    return _react.default.createElement(_Base.default, {
      className: className,
      label: label,
      size: "full",
      style: style
    }, pairs.map((_ref) => {
      let {
        key,
        value
      } = _ref;
      const keyHex = (0, _util.u8aToHex)(key.toU8a(true));
      return _react.default.createElement(_Bytes.default, {
        defaultValue: {
          value
        },
        isDisabled: true,
        key: keyHex,
        label: keyHex,
        name: keyHex,
        type: BYTES_TYPE
      });
    }));
  }

  parseFile(raw) {
    const json = JSON.parse((0, _util.u8aToString)(raw));
    const keys = Object.keys(json);
    let isValid = keys.length !== 0;
    const value = keys.map(key => {
      const value = json[key];
      (0, _util.assert)((0, _util.isHex)(key) && (0, _util.isHex)(value), "Non-hex key/value pair found in ".concat(key.toString(), " => ").concat(value.toString()));

      const encKey = _KeyValue.default.createParam(key);

      const encValue = _KeyValue.default.createParam(value);

      isValid = isValid && encKey.isValid && encValue.isValid;
      return {
        key: encKey.u8a,
        value: encValue.u8a
      };
    });
    return {
      isValid,
      value
    };
  }

}

var _default = (0, _translate.default)(KeyValueArray);

exports.default = _default;