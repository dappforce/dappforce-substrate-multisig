"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _util = require("@polkadot/ui-app/util");

var _Bare = _interopRequireDefault(require("./Bare"));

var _Unknown = _interopRequireDefault(require("./Unknown"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Proposal extends _react.default.PureComponent {
  render() {
    const {
      className,
      defaultValue: {
        value
      },
      isDisabled,
      label,
      style,
      withLabel
    } = this.props;

    if (!isDisabled) {
      return _react.default.createElement(_Unknown.default, this.props);
    }

    const proposal = value;

    const {
      method,
      section
    } = _types.Method.findFunction(proposal.callIndex);

    return _react.default.createElement(_Bare.default, null, _react.default.createElement(_uiApp.Static, {
      className: (0, _util.classes)(className, 'full'),
      label: label,
      style: style,
      withLabel: withLabel
    }, section, ".", method), _react.default.createElement(_uiApp.Call, {
      value: proposal
    }));
  }

}

exports.default = Proposal;