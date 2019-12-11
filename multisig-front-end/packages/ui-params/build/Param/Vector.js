"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("@polkadot/ui-app/translate"));

var _util = require("@polkadot/util");

var _initValue = _interopRequireDefault(require("../initValue"));

var _Bare = _interopRequireDefault(require("./Bare"));

var _findComponent = _interopRequireDefault(require("./findComponent"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Vector extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      Component: null,
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

    this.rowAdd = () => {
      this.setState((_ref4, _ref5) => {
        let {
          values
        } = _ref4;
        let {
          type: {
            sub
          }
        } = _ref5;
        const value = (0, _initValue.default)(sub);
        return {
          values: values.concat({
            isValid: !(0, _util.isUndefined)(value),
            value
          })
        };
      });
    };

    this.rowRemove = () => {
      this.setState((_ref6) => {
        let {
          values
        } = _ref6;
        return {
          values: values.slice(0, values.length - 1)
        };
      });
    };
  }

  static getDerivedStateFromProps(_ref7, prevState) {
    let {
      defaultValue: {
        value = []
      },
      isDisabled,
      type: {
        sub,
        type
      }
    } = _ref7;

    if (type === prevState.type) {
      return null;
    }

    const values = isDisabled || prevState.values.length === 0 ? value.map(value => (0, _util.isUndefined)(value) || (0, _util.isUndefined)(value.isValid) ? {
      isValid: !(0, _util.isUndefined)(value),
      value
    } : value) : prevState.values;
    return {
      Component: (0, _findComponent.default)(sub),
      type,
      values
    };
  }

  render() {
    const {
      className,
      isDisabled,
      style,
      type,
      withLabel
    } = this.props;
    const {
      Component,
      values
    } = this.state;
    const subType = type.sub;

    if (!Component) {
      return null;
    }

    return _react.default.createElement(_Bare.default, {
      className: className,
      style: style
    }, values.map((value, index) => _react.default.createElement(Component, {
      defaultValue: value,
      isDisabled: isDisabled,
      key: index,
      label: "".concat(index, ": ").concat(subType.type),
      onChange: this.onChange(index),
      type: subType,
      withLabel: withLabel
    })), this.renderButtons());
  }

  renderButtons() {
    const {
      isDisabled,
      t
    } = this.props;
    const {
      values
    } = this.state;

    if (isDisabled) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "ui--Param-Vector-buttons"
    }, _react.default.createElement(_uiApp.Button, {
      isPrimary: true,
      onClick: this.rowAdd,
      label: t('Add item')
    }), _react.default.createElement(_uiApp.Button, {
      isDisabled: values.length === 1,
      isNegative: true,
      onClick: this.rowRemove,
      label: t('Remove item')
    }));
  }

}

var _default = (0, _translate.default)(Vector);

exports.default = _default;