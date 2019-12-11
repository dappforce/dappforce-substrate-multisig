"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Params.css");

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/ui-app/util");

var _translate = _interopRequireDefault(require("@polkadot/ui-app/translate"));

var _Param = _interopRequireDefault(require("./Param"));

var _values = _interopRequireDefault(require("./values"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Params extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.onChangeParam = (at, newValue) => {
      const {
        isDisabled
      } = this.props;

      if (isDisabled) {
        return;
      }

      const {
        isValid = false,
        value
      } = newValue;
      this.setState(prevState => ({
        values: prevState.values.map((prev, index) => index !== at ? prev : {
          isValid,
          value
        })
      }), this.triggerUpdate);
    };

    this.triggerUpdate = () => {
      const {
        values
      } = this.state;
      const {
        onChange,
        isDisabled
      } = this.props;

      if (isDisabled) {
        return;
      }

      onChange && onChange(values);
    };

    this.state = {
      onChangeParam: this.onChangeParam
    };
  }

  static getDerivedStateFromProps(props, _ref) {
    let {
      params,
      onChangeParam
    } = _ref;
    const isSame = JSON.stringify(params) === JSON.stringify(props.params);

    if (props.isDisabled || isSame) {
      return null;
    }

    const values = (0, _values.default)(props.params);
    const handlers = values.map((value, index) => value => onChangeParam(index, value));
    return {
      handlers,
      params: props.params,
      values
    };
  } // Fire the intial onChange (we did update) when the component is loaded


  componentDidMount() {
    this.componentDidUpdate({}, {});
  } // This is needed in the case where the item changes, i.e. the values get
  // initialised and we need to alert the parent that we have new values


  componentDidUpdate(prevProps, prevState) {
    const {
      onChange,
      isDisabled
    } = this.props;
    const {
      values
    } = this.state;

    if (!isDisabled && prevState.values !== values) {
      onChange && onChange(values);
    }
  }

  render() {
    const {
      className,
      isDisabled,
      overrides,
      params,
      style
    } = this.props;
    const {
      handlers = [],
      values = this.props.values
    } = this.state;

    if (!params || params.length === 0 || !values || values.length === 0) {
      return null;
    }

    return _react.default.createElement("div", {
      className: (0, _util.classes)('ui--Params', className),
      style: style
    }, _react.default.createElement("div", {
      className: "ui--Params-Content"
    }, params.map((_ref2, index) => {
      let {
        name,
        type
      } = _ref2;
      return _react.default.createElement(_Param.default, {
        defaultValue: values[index],
        isDisabled: isDisabled,
        key: "".concat(name, ":").concat(name, ":").concat(index),
        name: name,
        onChange: handlers[index],
        overrides: overrides,
        type: type
      });
    })));
  }

}

var _default = (0, _translate.default)(Params);

exports.default = _default;