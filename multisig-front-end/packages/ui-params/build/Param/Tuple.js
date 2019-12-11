"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _Bare = _interopRequireDefault(require("./Bare"));

var _findComponent = _interopRequireDefault(require("./findComponent"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Tuple extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      Components: [],
      sub: [],
      subTypes: [],
      values: []
    };

    this.onChange = index => {
      return value => {
        this.setState((_ref) => {
          let {
            values
          } = _ref;
          return {
            values: values.map((svalue, sindex) => sindex === index ? value : svalue)
          };
        }, () => {
          const {
            values
          } = this.state;
          const {
            onChange
          } = this.props;
          onChange && onChange({
            isValid: values.reduce((result, _ref2) => {
              let {
                isValid
              } = _ref2;
              return result && isValid;
            }, true),
            value: values.map((_ref3) => {
              let {
                value
              } = _ref3;
              return value;
            })
          });
        });
      };
    };
  }

  static getDerivedStateFromProps(_ref4, prevState) {
    let {
      defaultValue: {
        value
      },
      type: {
        sub,
        type
      }
    } = _ref4;

    if (type === prevState.type) {
      return null;
    }

    const subTypes = sub && Array.isArray(sub) ? sub : [];
    const values = value.map(value => (0, _util.isUndefined)(value) || (0, _util.isUndefined)(value.isValid) ? {
      isValid: !(0, _util.isUndefined)(value),
      value
    } : value);
    return {
      Components: subTypes.map(type => (0, _findComponent.default)(type)),
      sub: subTypes.map((_ref5) => {
        let {
          type
        } = _ref5;
        return type;
      }),
      subTypes,
      type,
      values
    };
  }

  render() {
    const {
      className,
      isDisabled,
      style,
      withLabel
    } = this.props;
    const {
      Components,
      sub,
      subTypes,
      values
    } = this.state;
    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, Components.map((Component, index) => _react.default.createElement(Component, {
      defaultValue: values[index] || {},
      isDisabled: isDisabled,
      key: index,
      label: sub[index],
      onChange: this.onChange(index),
      type: subTypes[index],
      withLabel: withLabel
    })));
  }

}

exports.default = Tuple;