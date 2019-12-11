"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactChartjs = require("react-chartjs-2");

var _util = require("@polkadot/util");

var _util2 = require("../util");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ChartDoughnut extends _react.default.PureComponent {
  render() {
    const {
      className,
      size = 100,
      style,
      values
    } = this.props;
    const options = values.reduce((options, _ref) => {
      let {
        colors: [normalColor = '#00f', hoverColor],
        label,
        value
      } = _ref;
      options.colorNormal.push(normalColor);
      options.colorHover.push(hoverColor || normalColor);
      options.data.push((0, _util.bnToBn)(value).toNumber());
      options.labels.push(label);
      return options;
    }, {
      colorNormal: [],
      colorHover: [],
      data: [],
      labels: []
    });
    return _react.default.createElement("div", {
      className: (0, _util2.classes)('ui--Chart', className),
      style: style
    }, _react.default.createElement(_reactChartjs.Doughnut, {
      data: {
        labels: options.labels,
        datasets: [{
          data: options.data,
          backgroundColor: options.colorNormal,
          hoverBackgroundColor: options.colorHover
        }]
      },
      height: size,
      width: size
    }));
  }

}

exports.default = ChartDoughnut;