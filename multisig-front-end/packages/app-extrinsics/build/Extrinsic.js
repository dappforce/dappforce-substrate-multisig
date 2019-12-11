"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApp = require("@polkadot/ui-app");

var _uiParams = _interopRequireDefault(require("@polkadot/ui-params"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _Params = _interopRequireDefault(require("./Params"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ExtrinsicDisplay extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeMethod = methodfn => {
      this.nextState({
        methodfn,
        params: this.getParams(methodfn),
        values: []
      });
    };

    this.onChangeValues = values => {
      this.nextState({
        values
      });
    };

    this.state = {
      methodfn: props.defaultValue,
      params: this.getParams(props.defaultValue),
      values: []
    };
  }

  render() {
    const {
      defaultValue,
      isDisabled,
      isError,
      isPrivate,
      label,
      withLabel
    } = this.props;
    const {
      methodfn: {
        method,
        section
      },
      params
    } = this.state;
    return _react.default.createElement("div", {
      className: "extrinsics--Extrinsic"
    }, _react.default.createElement(_uiApp.InputExtrinsic, {
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: isPrivate,
      label: label,
      onChange: this.onChangeMethod,
      withLabel: withLabel
    }), _react.default.createElement(_uiParams.default, {
      key: "".concat(section, ".").concat(method, ":params")
      /* force re-render on change */
      ,
      onChange: this.onChangeValues,
      overrides: _Params.default,
      params: params
    }));
  }

  nextState(newState) {
    this.setState(newState, () => {
      const {
        onChange
      } = this.props;
      const {
        methodfn,
        params,
        values
      } = this.state;
      const isValid = values.reduce((isValid, value) => isValid && !(0, _util.isUndefined)(value) && !(0, _util.isUndefined)(value.value) && value.isValid, params.length === values.length);
      let method;

      if (isValid) {
        try {
          method = methodfn(...values.map((_ref) => {
            let {
              value
            } = _ref;
            return value;
          }));
        } catch (error) {// swallow
        }
      }

      onChange(method);
    });
  }

  getParams(methodfn) {
    return _types.Method.filterOrigin(methodfn.meta).map(arg => ({
      name: arg.name.toString(),
      type: (0, _types.getTypeDef)(arg.type)
    }));
  }

}

var _default = (0, _uiApi.withApi)(ExtrinsicDisplay);

exports.default = _default;