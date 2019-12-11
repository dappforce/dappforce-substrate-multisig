"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InputNumber = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/util");

var _util2 = require("./util");

var _constants = require("./constants");

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _Input = _interopRequireWildcard(require("./Input"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const DEFAULT_BITLENGTH = _constants.BitLengthOption.NORMAL_NUMBERS;

class InputNumber extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    this.regex = () => {
      const {
        isDecimal,
        isSi
      } = this.props;
      return new RegExp(isSi || isDecimal ? "^(0|[1-9]\\d*)(\\".concat(_Input.KEYS.DECIMAL, "\\d*)?$") : "^(0|[1-9]\\d*)$");
    };

    this.onChange = value => {
      const {
        bitLength,
        onChange
      } = this.props;
      const {
        siUnit
      } = this.state;

      try {
        const valueBN = this.inputValueToBn(value, siUnit);
        const isValid = this.isValidNumber(valueBN, bitLength);
        this.setState({
          isValid,
          value,
          valueBN
        });
        onChange && onChange(isValid ? valueBN : undefined);
      } catch (error) {
        console.error(error);
      }
    };

    this.onKeyDown = event => {
      const {
        isPreKeyDown
      } = this.state;

      if (_Input.KEYS_PRE.includes(event.key)) {
        this.setState({
          isPreKeyDown: true
        });
        return;
      }

      if (event.key.length === 1 && !isPreKeyDown) {
        const {
          selectionStart: i,
          selectionEnd: j,
          value
        } = event.target;
        const newValue = "".concat(value.substring(0, i)).concat(event.key).concat(value.substring(j));

        if (!this.regex().test(newValue)) {
          event.preventDefault();
        }
      }
    };

    this.onKeyUp = event => {
      if (_Input.KEYS_PRE.includes(event.key)) {
        this.setState({
          isPreKeyDown: false
        });
      }
    };

    this.onPaste = event => {
      const {
        value: newValue
      } = event.target;

      if (!this.regex().test(newValue)) {
        event.preventDefault();
        return;
      }
    };

    this.selectSiUnit = siUnit => {
      this.setState(prevState => {
        const {
          bitLength,
          onChange
        } = this.props;
        const isValid = this.isValidNumber(prevState.valueBN, bitLength);
        const value = this.bnToInputValue(prevState.valueBN, siUnit);
        onChange && onChange(isValid ? prevState.valueBN : undefined);
        return {
          isValid,
          siUnit,
          value
        };
      });
    };

    this.inputValueToBn = (value, siUnit) => {
      const {
        isSi
      } = this.props;
      const basePower = isSi ? _util.formatBalance.getDefaults().decimals : 0;
      const siPower = isSi ? _util.formatBalance.findSi(siUnit).power : 0;
      const isDecimalValue = value.match(/^(\d+)\.(\d+)$/);

      if (isDecimalValue) {
        if (siPower - isDecimalValue[2].length < -basePower) {
          return new _bn.default(-1);
        }

        const div = new _bn.default(value.replace(/\.\d*$/, ''));
        const mod = new _bn.default(value.replace(/^\d+\./, ''));
        return div.mul(new _bn.default(10).pow(new _bn.default(basePower + siPower))).add(mod.mul(new _bn.default(10).pow(new _bn.default(basePower + siPower - mod.toString().length))));
      } else {
        return new _bn.default(value.replace(/[^\d]/g, '')).mul(new _bn.default(10).pow(new _bn.default(basePower + siPower)));
      }
    };

    this.bnToInputValue = (bn, siUnit) => {
      const {
        isSi
      } = this.props;
      const basePower = isSi ? _util.formatBalance.getDefaults().decimals : 0;
      const siPower = isSi ? _util.formatBalance.findSi(siUnit).power : 0;
      const base = new _bn.default(10).pow(new _bn.default(basePower + siPower));
      const zero = new _bn.default(0);
      const div = bn.div(base);
      const mod = bn.mod(base);
      return "".concat(div.gt(zero) ? div.toString() : '0').concat(mod.gt(zero) ? (() => {
        const padding = Math.max(mod.toString().length, base.toString().length - div.toString().length, bn.toString().length - div.toString().length);
        return ".".concat(mod.toString(10, padding).replace(/0*$/, ''));
      })() : '');
    };

    const {
      defaultValue,
      isSi: _isSi,
      value: _value
    } = this.props;

    let _valueBN = new _bn.default(_value || 0);

    const si = _util.formatBalance.findSi('-');

    this.state = {
      value: _isSi ? new _bn.default(defaultValue || _valueBN).div(new _bn.default(10).pow(new _bn.default(si.power))).toString() : (defaultValue || _valueBN).toString(),
      isPreKeyDown: false,
      isValid: !(0, _util.isUndefined)(_value),
      siOptions: _util.formatBalance.getOptions().map((_ref) => {
        let {
          power,
          text,
          value
        } = _ref;
        return {
          value,
          text: power === 0 ? InputNumber.units : text
        };
      }),
      siUnit: si.value,
      valueBN: _valueBN
    };
  }

  static setUnit() {
    let units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : InputNumber.units;
    InputNumber.units = units;
  }

  static getDerivedStateFromProps(_ref2) {
    let {
      isDisabled,
      isSi,
      defaultValue = '0'
    } = _ref2;

    if (!isDisabled || !isSi) {
      return null;
    }

    return {
      value: (0, _util.formatBalance)(defaultValue, false),
      siUnit: _util.formatBalance.calcSi(defaultValue.toString(), _util.formatBalance.getDefaults().decimals).value
    };
  }

  render() {
    const {
      bitLength = DEFAULT_BITLENGTH,
      className,
      help,
      isSi,
      isDisabled,
      isError = false,
      maxLength,
      style,
      t
    } = this.props;
    const {
      isValid,
      value
    } = this.state;
    const maxValueLength = this.maxValue(bitLength).toString().length - 1;
    return _react.default.createElement(_Input.default, (0, _extends2.default)({}, this.props, {
      className: (0, _util2.classes)('ui--InputNumber', className),
      help: help,
      isAction: isSi,
      isDisabled: isDisabled,
      isError: !isValid || isError,
      maxLength: maxLength || maxValueLength,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      onPaste: this.onPaste,
      placeholder: t('Positive number'),
      style: style,
      value: value,
      type: "text"
    }), isSi && this.renderSiDropdown());
  }

  renderSiDropdown() {
    const {
      siOptions,
      siUnit
    } = this.state;
    return _react.default.createElement(_Dropdown.default, {
      isPrimary: false,
      isButton: true,
      defaultValue: siUnit,
      onChange: this.selectSiUnit,
      options: siOptions
    });
  }

  maxValue(bitLength) {
    return new _bn.default(2).pow(new _bn.default(bitLength || DEFAULT_BITLENGTH)).subn(1);
  }

  isValidBitLength(value, bitLength) {
    return value.bitLength() <= (bitLength || DEFAULT_BITLENGTH);
  }

  isValidNumber(input) {
    let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_BITLENGTH;
    const maxBN = this.maxValue(bitLength);

    if (input.lt(new _bn.default(0)) || !input.lt(maxBN) || !this.isValidBitLength(input, bitLength)) {
      return false;
    }

    return true;
  }

}

exports.InputNumber = InputNumber;
InputNumber.units = 'Unit';

var _default = (0, _translate.default)(InputNumber);

exports.default = _default;