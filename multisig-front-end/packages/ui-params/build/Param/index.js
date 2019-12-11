"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/ui-app/util");

var _translate = _interopRequireDefault(require("@polkadot/ui-app/translate"));

var _util2 = require("@polkadot/util");

var _findComponent = _interopRequireDefault(require("./findComponent"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ParamComponent extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      Component: null
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      overrides,
      type
    } = _ref;
    return {
      Component: !type ? null : (0, _findComponent.default)(type, overrides)
    };
  }

  render() {
    const {
      Component
    } = this.state;

    if (Component === null) {
      return null;
    }

    const {
      className,
      defaultValue,
      isDisabled,
      name,
      onChange,
      style,
      type
    } = this.props;
    return _react.default.createElement(Component, {
      className: (0, _util.classes)('ui--Param', className),
      defaultValue: defaultValue,
      key: "".concat(name, ":").concat(type),
      isDisabled: isDisabled,
      label: (0, _util2.isUndefined)(name) ? type.type : "".concat(name, ": ").concat(type.type),
      name: name,
      onChange: onChange,
      style: style,
      type: type
    });
  }

}

var _default = (0, _translate.default)(ParamComponent);

exports.default = _default;