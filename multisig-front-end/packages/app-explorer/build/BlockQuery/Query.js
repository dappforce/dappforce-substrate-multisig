"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Query extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    this.setHash = value => {
      this.setState(this.stateFromValue(value));
    };

    this.onQuery = () => {
      const {
        value
      } = this.state;
      window.location.hash = "/explorer/query/".concat(value);
    };

    const {
      value: _value
    } = this.props;
    this.state = this.stateFromValue(_value || '');
  }

  render() {
    const {
      t
    } = this.props;
    const {
      value,
      isValid
    } = this.state;
    return _react.default.createElement("summary", null, _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement("div", {
      className: "storage--actionrow head"
    }, _react.default.createElement(_uiApp.Input, {
      className: "storage--actionrow-value",
      defaultValue: this.props.value,
      isError: !isValid && value.length !== 0,
      placeholder: t('block hash or number to query'),
      onChange: this.setHash,
      withLabel: false
    }), _react.default.createElement(_uiApp.Button, {
      icon: "play",
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onQuery
    }))));
  }

  stateFromValue(value) {
    const isValidHex = (0, _util.isHex)(value, 256);
    const isNumber = !isValidHex && /^\d+$/.test(value);
    return {
      value,
      isNumber,
      isValid: isValidHex || isNumber
    };
  }

}

var _default = (0, _translate.default)(Query);

exports.default = _default;