"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/elements/Button/Button"));

var _Dropdown = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown"));

var _util = require("@polkadot/util");

var _util2 = require("./util");

var _Labelled = _interopRequireDefault(require("./Labelled"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Dropdown extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = (event, _ref) => {
      let {
        value
      } = _ref;
      const {
        onChange,
        transform
      } = this.props;
      onChange && onChange(transform ? transform(value) : value);
    };
  }

  // Trigger the update on mount - ensuring that the onChange (as described below)
  // is trigerred.
  componentDidMount() {
    this.componentDidUpdate({});
  } // Here we update the component user with the initial value of the dropdown. In a number of
  // these (e.g. Accounts) the list of available values are managed by the component itself,
  // and there are defaults set (i.e. for accounts the last one used)


  componentDidUpdate(prevProps) {
    const {
      defaultValue,
      value
    } = this.props;
    const startValue = (0, _util.isUndefined)(value) ? defaultValue : value;
    const prevStart = (0, _util.isUndefined)(prevProps.value) ? prevProps.defaultValue : prevProps.value;

    if (startValue !== prevStart) {
      this.onChange(null, {
        value: startValue
      });
    }
  }

  render() {
    const {
      className,
      defaultValue,
      isPrimary = true,
      help,
      isButton,
      isDisabled,
      isError,
      isMultiple,
      label,
      onSearch,
      options,
      placeholder,
      style,
      withLabel,
      renderLabel,
      value
    } = this.props;

    const dropdown = _react.default.createElement(_Dropdown.default, {
      button: isButton,
      compact: isButton,
      disabled: isDisabled,
      error: isError,
      floating: isButton,
      multiple: isMultiple,
      onChange: this.onChange,
      options: options,
      placeholder: placeholder,
      renderLabel: renderLabel,
      search: onSearch,
      selection: true,
      value: (0, _util.isUndefined)(value) ? defaultValue : value
    });

    return isButton ? _react.default.createElement(_Button.default.Group, {
      primary: isPrimary
    }, dropdown) : _react.default.createElement(_Labelled.default, {
      className: (0, _util2.classes)('ui--Dropdown', className),
      help: help,
      label: label,
      style: style,
      withLabel: withLabel
    }, dropdown);
  }

}

exports.default = Dropdown;