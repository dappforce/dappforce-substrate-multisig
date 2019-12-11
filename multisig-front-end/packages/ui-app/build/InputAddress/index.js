"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InputAddress = void 0;

require("./InputAddress.css");

var _react = _interopRequireDefault(require("react"));

var _store = _interopRequireDefault(require("store"));

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _options = _interopRequireDefault(require("@polkadot/ui-keyring/options"));

var _item = _interopRequireDefault(require("@polkadot/ui-keyring/options/item"));

var _uiApi = require("@polkadot/ui-api");

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _util = require("../util");

var _toAddress = _interopRequireDefault(require("../util/toAddress"));

var _MyAccountContext = require("@polkadot/df-utils/MyAccountContext");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const STORAGE_KEY = 'options:InputAddress';
const DEFAULT_TYPE = 'all';

const transformToAccountId = value => {
  if (!value) {
    return null;
  }

  let accountId;

  try {
    accountId = (0, _toAddress.default)(value);
  } catch (error) {
    console.error('Unable to transform address', value);
  }

  return !accountId ? null : accountId;
};

const createOption = address => {
  let name;

  try {
    name = _uiKeyring.default.getAccount(address).getMeta().name;
  } catch (error) {
    try {
      name = _uiKeyring.default.getAddress(address).getMeta().name;
    } catch (error) {// ok, we don't have account or address
    }
  }

  return (0, _item.default)(address, name);
};

class InputAddress extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};

    this.renderLabel = (_ref) => {
      let {
        value
      } = _ref;

      if (!value) {
        return undefined;
      }

      return (0, _util.getAddrName)(value, true);
    };

    this.onChange = address => {
      const {
        onChange,
        type
      } = this.props;
      InputAddress.setLastValue(type, address);

      if (type === 'account') {
        const {
          set
        } = this.context;
        set(address);
      }

      onChange && onChange(transformToAccountId(address));
    };

    this.onChangeMulti = addresses => {
      const {
        onChangeMulti
      } = this.props;

      if (onChangeMulti) {
        onChangeMulti(addresses.map(transformToAccountId).filter(address => address));
      }
    };

    this.onSearch = (filteredOptions, _query) => {
      const {
        isInput = true
      } = this.props;

      const query = _query.trim();

      const queryLower = query.toLowerCase();
      const matches = filteredOptions.filter(item => item.value !== null && (item.name.toLowerCase().indexOf(queryLower) !== -1 || item.value.toLowerCase().indexOf(queryLower) !== -1));
      const valueMatches = matches.filter(item => item.value !== null);

      if (isInput && valueMatches.length === 0) {
        const accountId = transformToAccountId(query);

        if (accountId) {
          matches.push(_uiKeyring.default.saveRecent(accountId).option);
        }
      }

      return matches.filter((item, index) => {
        const isLast = index === matches.length - 1;
        const nextItem = matches[index + 1];
        const hasNext = nextItem && nextItem.value;
        return item.value !== null || !isLast && hasNext;
      });
    };
  }

  static getDerivedStateFromProps(_ref2) {
    let {
      value
    } = _ref2;

    try {
      return {
        value: Array.isArray(value) ? value.map(_toAddress.default) : (0, _toAddress.default)(value) || undefined
      };
    } catch (error) {
      return null;
    }
  }

  static readOptions() {
    return _store.default.get(STORAGE_KEY) || {
      defaults: {}
    };
  }

  static getLastValue() {
    let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TYPE;
    const options = InputAddress.readOptions();
    return options.defaults[type];
  }

  static setLastValue() {
    let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TYPE;
    let value = arguments.length > 1 ? arguments[1] : undefined;
    const options = InputAddress.readOptions();
    options.defaults[type] = value;

    _store.default.set(STORAGE_KEY, options);
  }

  render() {
    const {
      className,
      defaultValue,
      help,
      hideAddress = false,
      isDisabled = false,
      isError,
      isMultiple,
      label,
      options,
      optionsAll,
      placeholder,
      type = DEFAULT_TYPE,
      style,
      withLabel
    } = this.props;
    const {
      value
    } = this.state;
    const hasOptions = options && options.length !== 0 || optionsAll && Object.keys(optionsAll[type]).length !== 0;

    if (!hasOptions && !isDisabled) {
      return null;
    }

    const lastValue = InputAddress.getLastValue(type);
    const lastOption = this.getLastOptionValue();
    const actualValue = isDisabled || defaultValue && this.hasValue(defaultValue) ? defaultValue : this.hasValue(lastValue) ? lastValue : lastOption && lastOption.value;
    return _react.default.createElement(_Dropdown.default, {
      className: (0, _util.classes)('ui--InputAddress', hideAddress ? 'flag--hideAddress' : '', className),
      defaultValue: isMultiple || value !== undefined ? undefined : actualValue,
      help: help,
      isDisabled: isDisabled,
      isError: isError,
      isMultiple: isMultiple,
      label: label,
      onChange: isMultiple ? this.onChangeMulti : this.onChange,
      onSearch: this.onSearch,
      options: options ? options : isDisabled && actualValue ? [createOption(actualValue)] : optionsAll ? optionsAll[type] : [],
      placeholder: placeholder,
      renderLabel: isMultiple ? this.renderLabel : undefined,
      style: style,
      value: isMultiple ? undefined : value,
      withLabel: withLabel
    });
  }

  getLastOptionValue() {
    const {
      optionsAll,
      type = DEFAULT_TYPE
    } = this.props;

    if (!optionsAll) {
      return;
    }

    const available = optionsAll[type].filter((_ref3) => {
      let {
        value
      } = _ref3;
      return !!value;
    });
    return available.length ? available[available.length - 1] : undefined;
  }

  hasValue(test) {
    const {
      optionsAll,
      type = DEFAULT_TYPE
    } = this.props;

    if (!optionsAll) {
      return false;
    }

    return !!optionsAll[type].find((_ref4) => {
      let {
        value
      } = _ref4;
      return test === value;
    });
  }

}

exports.InputAddress = InputAddress;
InputAddress.contextType = _MyAccountContext.MyAccountContext;

var _default = (0, _uiApi.withMulti)(InputAddress, (0, _uiApi.withObservable)(_options.default.optionsSubject, {
  propName: 'optionsAll'
}));

exports.default = _default;