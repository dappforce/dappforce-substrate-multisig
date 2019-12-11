"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS_PRE = exports.KEYS = exports.isSelectAll = exports.isPaste = exports.isCut = exports.isCopy = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("semantic-ui-react/dist/commonjs/elements/Input/Input"));

var _util = require("@polkadot/util");

var _Labelled = _interopRequireDefault(require("./Labelled"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// Find decimal separator used in current locale
const getDecimalSeparator = () => 1.1.toLocaleString().replace(/\d/g, ''); // note: KeyboardEvent.keyCode and KeyboardEvent.which are deprecated


const KEYS = {
  A: 'a',
  ALT: 'Alt',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  C: 'c',
  CMD: 'Meta',
  CTRL: 'Control',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  V: 'v',
  X: 'x',
  ZERO: '0',
  DECIMAL: getDecimalSeparator()
};
exports.KEYS = KEYS;
const KEYS_PRE = [KEYS.ALT, KEYS.CMD, KEYS.CTRL]; // reference: degrade key to keyCode for cross-browser compatibility https://www.w3schools.com/jsref/event_key_keycode.asp

exports.KEYS_PRE = KEYS_PRE;

const isCopy = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.C;

exports.isCopy = isCopy;

const isCut = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.X;

exports.isCut = isCut;

const isPaste = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.V;

exports.isPaste = isPaste;

const isSelectAll = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.A;

exports.isSelectAll = isSelectAll;
let counter = 0;

class Input extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      name: "in_".concat(counter++, "_at_").concat(Date.now())
    };

    this.onChange = event => {
      const {
        onChange
      } = this.props;
      const {
        value
      } = event.target;
      onChange && onChange(value);
    };

    this.onKeyDown = event => {
      const {
        onKeyDown
      } = this.props;

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    this.onKeyUp = event => {
      const {
        onKeyUp
      } = this.props;

      if (onKeyUp) {
        onKeyUp(event);
      }
    };

    this.onPaste = event => {
      const {
        onPaste
      } = this.props;

      if (onPaste) {
        onPaste(event);
      }
    };
  }

  render() {
    const {
      autoFocus = false,
      children,
      className,
      defaultValue,
      help,
      icon,
      isEditable = false,
      isAction = false,
      isDisabled = false,
      isError = false,
      isHidden = false,
      label,
      max,
      maxLength,
      min,
      name,
      placeholder,
      style,
      tabIndex,
      type = 'text',
      value,
      withLabel
    } = this.props;
    return _react.default.createElement(_Labelled.default, {
      className: className,
      help: help,
      label: label,
      style: style,
      withLabel: withLabel
    }, _react.default.createElement(_Input.default, {
      action: isAction,
      autoFocus: autoFocus,
      className: isEditable ? 'ui--Input edit icon' : 'ui--Input',
      defaultValue: (0, _util.isUndefined)(value) ? defaultValue || '' : undefined,
      disabled: isDisabled,
      error: isError,
      hidden: isHidden,
      id: name,
      iconPosition: (0, _util.isUndefined)(icon) ? undefined : 'left',
      max: max,
      maxLength: maxLength,
      min: min,
      name: name || this.state.name,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      placeholder: placeholder,
      tabIndex: tabIndex,
      type: type,
      value: value
    }, _react.default.createElement("input", {
      autoComplete: type === 'password' ? 'new-password' : 'off',
      onPaste: this.onPaste
    }), isEditable ? _react.default.createElement("i", {
      className: "edit icon"
    }) : undefined, icon, children));
  }

}

exports.default = Input;