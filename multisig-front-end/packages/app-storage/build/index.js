"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _Queries = _interopRequireDefault(require("./Queries"));

var _Selection = _interopRequireDefault(require("./Selection"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class StorageApp extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      queue: []
    };

    this.onAdd = query => {
      this.setState(prevState => ({
        queue: [query].concat(prevState.queue)
      }));
    };

    this.onRemove = id => {
      this.setState(prevState => ({
        queue: prevState.queue.filter(item => item.id !== id)
      }));
    };
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      queue
    } = this.state;
    return _react.default.createElement("main", {
      className: "storage--App"
    }, _react.default.createElement(_Selection.default, {
      basePath: basePath,
      onAdd: this.onAdd
    }), _react.default.createElement(_Queries.default, {
      onRemove: this.onRemove,
      value: queue
    }));
  }

}

var _default = (0, _translate.default)(StorageApp);

exports.default = _default;