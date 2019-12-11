"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@polkadot/types");

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _uiParams = _interopRequireDefault(require("@polkadot/ui-params"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/app-storage authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Modules extends _react.default.PureComponent {
  constructor(props) {
    var _this;

    super(props);
    _this = this;
    this.defaultValue = void 0;
    this.state = void 0;

    this.onAdd = () => {
      const {
        onAdd
      } = this.props;
      const {
        key,
        values
      } = this.state;
      onAdd({
        key,
        params: values
      });
    };

    this.onChangeKey = key => {
      this.nextState({
        isValid: false,
        key,
        values: [],
        params: []
      });
    };

    this.onChangeParams = function () {
      let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.nextState({
        values
      });
    };

    const {
      api
    } = this.props;
    this.defaultValue = api.query.timestamp.now;
    this.state = {
      isValid: true,
      key: this.defaultValue,
      values: [],
      params: []
    };
  }

  render() {
    const {
      t
    } = this.props;
    const {
      isValid,
      key: {
        method,
        section
      },
      params
    } = this.state;
    return _react.default.createElement("section", {
      className: "storage--actionrow"
    }, _react.default.createElement("div", {
      className: "storage--actionrow-value"
    }, _react.default.createElement(_uiApp.InputStorage, {
      defaultValue: this.defaultValue,
      label: t('selected state query'),
      onChange: this.onChangeKey
    }), _react.default.createElement(_uiParams.default, {
      key: "".concat(section, ".").concat(method, ":params")
      /* force re-render on change */
      ,
      onChange: this.onChangeParams,
      params: params
    })), _react.default.createElement("div", {
      className: "storage--actionrow-buttons"
    }, _react.default.createElement(_uiApp.Button, {
      icon: "plus",
      isDisabled: !isValid,
      isPrimary: true,
      onClick: this.onAdd
    })));
  }

  nextState(newState) {
    this.setState(prevState => {
      const {
        key = prevState.key,
        values = prevState.values
      } = newState;
      const hasParam = key.meta.type.isMap;
      const isValid = values.length === (hasParam ? 1 : 0) && values.reduce((isValid, value) => isValid && !(0, _util.isUndefined)(value) && !(0, _util.isUndefined)(value.value) && value.isValid, true);
      return {
        isValid,
        key,
        values,
        params: hasParam ? [{
          type: (0, _types.getTypeDef)(key.meta.type.asMap.key.toString())
        }] : []
      };
    });
  }

}

var _default = (0, _uiApi.withMulti)(Modules, _translate.default, _uiApi.withApi);

exports.default = _default;