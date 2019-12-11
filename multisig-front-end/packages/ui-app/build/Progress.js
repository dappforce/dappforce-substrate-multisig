"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Progress = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/modules/Progress/Progress"));

var _util = require("@polkadot/util");

var _util2 = require("./util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Progress extends _react.default.PureComponent {
  render() {
    const {
      className,
      color = 'blue',
      percent,
      total,
      style,
      value
    } = this.props;
    let calculated;

    const _total = (0, _util.bnToBn)(total);

    const _value = (0, _util.bnToBn)(value);

    if (_total.gtn(0)) {
      calculated = 100.0 * _value.toNumber() / _total.toNumber();
    } else {
      calculated = (0, _util.isBn)(percent) ? percent.toNumber() : percent;
    }

    if ((0, _util.isUndefined)(calculated) || calculated < 0) {
      return null;
    }

    let rainbow;

    if (color === 'auto' || color === 'autoReverse') {
      if (calculated > 66.6) {
        rainbow = color === 'auto' ? 'green' : 'red';
      } else if (calculated > 33.3) {
        rainbow = 'orange';
      } else {
        rainbow = color === 'auto' ? 'red' : 'green';
      }
    } else {
      rainbow = color;
    }

    return _react.default.createElement(_Progress.default, {
      className: (0, _util2.classes)('ui--Progress', className),
      color: rainbow,
      percent: calculated,
      size: "tiny",
      style: style
    });
  }

}

exports.default = Progress;