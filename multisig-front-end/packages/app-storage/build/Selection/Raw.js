"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("../translate"));

var _util = require("@polkadot/util");

var _types = require("@polkadot/types");

// Copyright 2017-2019 @polkadot/app-storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Raw extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isValid: false,
      key: new Uint8Array([])
    };

    this.onAdd = () => {
      const {
        onAdd
      } = this.props;
      const {
        key
      } = this.state;
      onAdd({
        key
      });
    };

    this.onChangeKey = key => {
      const u8a = (0, _util.u8aToU8a)(key);
      const isValid = u8a.length !== 0;
      this.setState({
        isValid,
        key: _types.Compact.addLengthPrefix(u8a)
      });
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isValid
    } = this.state;
    return _react.default.createElement("section", {
      className: "storage--actionrow"
    }, _react.default.createElement("div", {
      className: "storage--actionrow-value"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      label: t('hex-encoded storage key'),
      onChange: this.onChangeKey
    })), _react.default.createElement("div", {
      className: "storage--actionrow-buttons"
    }, _react.default.createElement(_uiApp.Button, {
      icon: "plus",
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onAdd
    })));
  }

}

var _default = (0, _translate.default)(Raw);

exports.default = _default;