"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _store = _interopRequireDefault(require("store"));

var _types = require("@polkadot/types");

var _uiApi = require("@polkadot/ui-api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const PREFIX = 'contract:';
const KEY_CODE = "".concat(PREFIX, "code:");
const KEY_CONTRACT = "".concat(PREFIX, "addr:");
const codeRegex = new RegExp("^".concat(KEY_CODE), '');
const contractRegex = new RegExp("^".concat(KEY_CONTRACT), '');

class Store extends _eventemitter.default {
  constructor() {
    super(...arguments);
    this.allCode = {};
    this.allContracts = {};
  }

  get hasCode() {
    return Object.keys(this.allCode).length !== 0;
  }

  get hasContracts() {
    return Object.keys(this.allContracts).length !== 0;
  }

  getAllCode() {
    return Object.values(this.allCode);
  }

  getAllContracts() {
    return Object.values(this.allContracts);
  }

  getCode(codeHash) {
    return this.allCode[codeHash];
  }

  getContract(address) {
    return this.allContracts[address];
  }

  async saveCode(codeHash, partial) {
    await _uiApi.api.isReady;

    const json = _objectSpread({}, partial, {
      codeHash: codeHash.toHex(),
      genesisHash: _uiApi.api.genesisHash.toHex()
    });

    _store.default.set("".concat(KEY_CODE).concat(json.codeHash), json);

    this.addCode(json);
  }

  async saveContract(address, partial) {
    await _uiApi.api.isReady;

    const json = _objectSpread({}, partial, {
      address: address.toString(),
      genesisHash: _uiApi.api.genesisHash.toHex()
    });

    _store.default.set("".concat(KEY_CONTRACT).concat(address), json);

    this.addContract(json);
  }

  async loadAll() {
    try {
      await _uiApi.api.isReady;

      const genesisHash = _uiApi.api.genesisHash.toHex();

      _store.default.each((json, key) => {
        if (json && json.genesisHash !== genesisHash) {
          return;
        }

        if (codeRegex.test(key)) {
          this.addCode(json);
        } else if (contractRegex.test(key)) {
          this.addContract(json);
        }
      });
    } catch (error) {
      console.error('Unable to load contracts', error);
    }
  }

  addCode(json) {
    try {
      this.allCode[json.codeHash] = {
        json,
        contractAbi: json.abi ? new _types.ContractAbi(JSON.parse(json.abi)) : undefined
      };
      this.emit('new-code');
    } catch (error) {
      console.error(error);
    }
  }

  addContract(json) {
    try {
      this.allContracts[json.address] = {
        json,
        contractAbi: new _types.ContractAbi(JSON.parse(json.abi))
      };
      this.emit('new-contract');
    } catch (error) {
      console.error(error);
    }
  }

}

var _default = new Store();

exports.default = _default;