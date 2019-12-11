"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/util");

// Copyright 2017-2019 @polkadot/app-toolbox authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Results extends _react.default.PureComponent {
  render() {
    const {
      queue = []
    } = this.props;
    const filtered = queue.filter((_ref) => {
      let {
        error,
        result
      } = _ref;
      return !(0, _util.isUndefined)(error) || !(0, _util.isUndefined)(result);
    }).reverse();

    if (!filtered.length) {
      return null;
    }

    return _react.default.createElement("section", {
      className: "rpc--Results"
    }, filtered.map((_ref2) => {
      let {
        error,
        id,
        result,
        rpc: {
          section,
          method
        }
      } = _ref2;
      return _react.default.createElement(_uiApp.Output, {
        isError: !!error,
        key: id,
        label: "".concat(id, ": ").concat(section, ".").concat(method),
        value: error ? error.message : _react.default.createElement("pre", null, JSON.stringify(result, null, 2))
      });
    }));
  }

}

exports.default = Results;