"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _ByHash = _interopRequireDefault(require("./ByHash"));

var _ByNumber = _interopRequireDefault(require("./ByNumber"));

var _Query = _interopRequireDefault(require("./Query"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Entry extends _react.default.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: undefined
    };
  }

  static getDerivedStateFromProps(_ref) {
    let {
      chain_bestNumber,
      match: {
        params
      }
    } = _ref;
    let {
      value
    } = params;

    if ((!value || !value.length) && chain_bestNumber) {
      value = chain_bestNumber.toString();
    }

    return {
      value
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.match !== nextProps.match || !this.state.value;
  }

  render() {
    const {
      value
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Query.default, {
      value: value
    }), this.renderBlock());
  }

  renderBlock() {
    const {
      value
    } = this.state;

    if (!value) {
      return null;
    }

    return (0, _util.isHex)(value) ? _react.default.createElement(_ByHash.default, {
      key: value,
      value: value
    }) : _react.default.createElement(_ByNumber.default, {
      key: value,
      value: value
    });
  }

}

var _default = (0, _uiApi.withMulti)(Entry, (0, _uiApi.withCall)('derive.chain.bestNumber'));

exports.default = _default;