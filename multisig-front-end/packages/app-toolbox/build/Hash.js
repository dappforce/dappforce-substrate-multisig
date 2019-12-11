"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

var _utilCrypto = require("@polkadot/util-crypto");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Hash extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      data: '',
      hash: (0, _utilCrypto.blake2AsHex)((0, _util.stringToU8a)(''), 256),
      isHexData: false
    };

    this.onChangeData = data => {
      const isHexData = (0, _util.isHex)(data);
      const hash = (0, _utilCrypto.blake2AsHex)(isHexData ? (0, _util.hexToU8a)(data) : (0, _util.stringToU8a)(data), 256);
      this.setState({
        data,
        hash,
        isHexData
      });
    };
  }

  render() {
    return _react.default.createElement("div", {
      className: "toolbox--Hash"
    }, this.renderInput(), this.renderOutput());
  }

  renderInput() {
    const {
      t
    } = this.props;
    const {
      data,
      isHexData
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "large",
      label: t('from the following data (hex or string)'),
      onChange: this.onChangeData,
      value: data
    }), _react.default.createElement(_uiApp.Static, {
      className: "small",
      label: t('hex input data'),
      value: isHexData ? t('Yes') : t('No')
    }));
  }

  renderOutput() {
    const {
      t
    } = this.props;
    const {
      hash
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Output, {
      className: "full toolbox--hex",
      isHidden: hash.length === 0,
      label: t('the resulting hash is'),
      value: hash,
      withCopy: true
    }));
  }

}

var _default = (0, _translate.default)(Hash);

exports.default = _default;