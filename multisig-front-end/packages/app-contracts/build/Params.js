"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiParams = _interopRequireDefault(require("@polkadot/ui-params"));

var _types = require("@polkadot/types");

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Params extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      params: []
    };

    this.onChange = values => {
      const {
        onChange
      } = this.props;
      onChange(values.map((_ref) => {
        let {
          value
        } = _ref;
        return value;
      }));
    };
  }

  static getDerivedStateFromProps(_ref2) {
    let {
      params
    } = _ref2;

    if (!params) {
      return {
        params: []
      };
    }

    return {
      params: params.map((_ref3) => {
        let {
          name,
          type
        } = _ref3;
        return {
          name,
          type: (0, _types.getTypeDef)(type, name)
        };
      })
    };
  }

  render() {
    const {
      params
    } = this.state;

    if (!params.length) {
      return null;
    }

    return _react.default.createElement(_uiParams.default, {
      onChange: this.onChange,
      params: params
    });
  }

}

exports.default = Params;