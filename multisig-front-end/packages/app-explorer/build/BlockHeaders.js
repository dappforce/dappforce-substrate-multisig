"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MAX_ITEMS = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _BlockHeader = _interopRequireDefault(require("./BlockHeader"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const MAX_ITEMS = 15;
exports.MAX_ITEMS = MAX_ITEMS;
let blockHeaders = [];

const transform = header => {
  if (!header) {
    return blockHeaders;
  }

  blockHeaders = blockHeaders.filter((old, index) => index < MAX_ITEMS && old.blockNumber.lt(header.blockNumber)).reduce((next, header) => {
    next.push(header);
    return next;
  }, [header]).sort((a, b) => b.blockNumber.cmp(a.blockNumber));
  return blockHeaders;
};

class BlockHeaders extends _react.default.PureComponent {
  render() {
    const {
      headers = []
    } = this.props;
    return _react.default.createElement("div", {
      className: "explorer--BlockHeaders"
    }, headers.map((header, index) => _react.default.createElement(_BlockHeader.default, {
      isSummary: !!index,
      key: header.blockNumber.toString(),
      value: header,
      withLink: !header.blockNumber.isZero()
    })));
  }

}

var _default = (0, _uiApi.withCall)('derive.chain.subscribeNewHead', {
  propName: 'headers',
  transform
})(BlockHeaders);

exports.default = _default;