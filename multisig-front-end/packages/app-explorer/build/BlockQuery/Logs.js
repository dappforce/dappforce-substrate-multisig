"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiParams = _interopRequireDefault(require("@polkadot/ui-params"));

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Logs extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderItem = (item, index) => {
      let content;

      if (item.value instanceof _types.Struct) {
        content = this.formatStruct(item.value);
      } else if (item.value instanceof _types.Tuple) {
        content = this.formatTuple(item.value);
      } else if (item.value instanceof _types.Vector) {
        content = this.formatVector(item.value);
      } else if (item.value instanceof _types.U8a) {
        content = this.formatU8a(item.value);
      } else {
        content = _react.default.createElement("div", null, item.value.toString().split(',').join(', '));
      }

      return _react.default.createElement("div", {
        className: "explorer--BlockByHash-block",
        key: index
      }, _react.default.createElement("article", {
        className: "explorer--Container"
      }, _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("h3", null, item.type.toString())), _react.default.createElement("details", null, _react.default.createElement("summary", null, "Details"), content)));
    };
  }

  render() {
    const {
      t,
      value
    } = this.props;

    if (!value || !value.length) {
      return null;
    }

    return _react.default.createElement("section", null, _react.default.createElement("h1", null, t('logs')), _react.default.createElement("div", {
      className: "explorer--BlockByHash-flexable ui--flex-medium"
    }, value.map(this.renderItem)));
  }

  formatU8a(value) {
    return _react.default.createElement(_uiParams.default, {
      isDisabled: true,
      params: [{
        type: (0, _types.getTypeDef)('Bytes')
      }],
      values: [{
        isValid: true,
        value
      }]
    });
  }

  formatStruct(struct) {
    const types = struct.Type;
    const params = Object.keys(types).map(name => ({
      name,
      type: (0, _types.getTypeDef)(types[name])
    }));
    const values = struct.toArray().map(value => ({
      isValid: true,
      value
    }));
    return _react.default.createElement(_uiParams.default, {
      isDisabled: true,
      params: params,
      values: values
    });
  }

  formatTuple(tuple) {
    const types = tuple.Types;
    const params = types.map(type => ({
      type: (0, _types.getTypeDef)(type)
    }));
    const values = tuple.toArray().map(value => ({
      isValid: true,
      value
    }));
    return _react.default.createElement(_uiParams.default, {
      isDisabled: true,
      params: params,
      values: values
    });
  }

  formatVector(vector) {
    const type = (0, _types.getTypeDef)(vector.Type);
    const values = vector.toArray().map(value => ({
      isValid: true,
      value
    }));
    const params = values.map((_, index) => ({
      name: "".concat(index),
      type
    }));
    return _react.default.createElement(_uiParams.default, {
      isDisabled: true,
      params: params,
      values: values
    });
  }

}

var _default = (0, _translate.default)(Logs);

exports.default = _default;