"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.api = void 0;

var _react = _interopRequireDefault(require("react"));

var _promise = _interopRequireDefault(require("@polkadot/api/promise"));

var _defaults = _interopRequireDefault(require("@polkadot/rpc-provider/defaults"));

var _rpcProvider = require("@polkadot/rpc-provider");

var _InputNumber = require("@polkadot/ui-app/InputNumber");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _ApiSigner = _interopRequireDefault(require("@polkadot/ui-signer/ApiSigner"));

var _types = require("@polkadot/types");

var _util = require("@polkadot/util");

var _ApiContext = _interopRequireDefault(require("./ApiContext"));

// Copyright 2017-2019 @polkadot/ui-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
let api;
exports.api = api;

class ApiWrapper extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    const {
      queueExtrinsic,
      queueSetTxStatus,
      url
    } = props;
    const provider = new _rpcProvider.WsProvider(url);
    const signer = new _ApiSigner.default(queueExtrinsic, queueSetTxStatus);

    const setApi = provider => {
      exports.api = api = new _promise.default({
        provider,
        signer
      });
      this.setState({
        api
      }, () => {
        this.subscribeEvents();
      });
    };

    const setApiUrl = function setApiUrl() {
      let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.default.WS_URL;
      return setApi(new _rpcProvider.WsProvider(url));
    };

    exports.api = api = new _promise.default({
      provider,
      signer
    });
    this.state = {
      isApiConnected: false,
      isApiReady: false,
      api,
      setApiUrl
    };
  }

  componentDidMount() {
    this.subscribeEvents();
  }

  subscribeEvents() {
    const {
      api
    } = this.state;
    api.on('connected', () => {
      this.setState({
        isApiConnected: true
      });
    });
    api.on('disconnected', () => {
      this.setState({
        isApiConnected: false
      });
    });
    api.on('ready', async () => {
      try {
        await this.loadOnReady(api);
      } catch (error) {
        console.error('Unable to load chain', error);
      }
    });
  }

  async loadOnReady(api) {
    const [properties = new _types.ChainProperties(), value] = await Promise.all([api.rpc.system.properties(), api.rpc.system.chain()]);
    const section = Object.keys(api.tx)[0];
    const method = Object.keys(api.tx[section])[0];
    const chain = value ? value.toString() : null;
    const isDevelopment = (0, _util.isTestChain)(chain);
    console.log('api: found chain', chain, JSON.stringify(properties)); // first setup the UI helpers

    _util.formatBalance.setDefaults({
      decimals: properties.tokenDecimals,
      unit: properties.tokenSymbol
    });

    _InputNumber.InputNumber.setUnit(properties.tokenSymbol); // finally load the keyring


    _uiKeyring.default.loadAll({
      addressPrefix: properties.get('networkId') || 42,
      isDevelopment,
      type: 'ed25519'
    });

    this.setState({
      isApiReady: true,
      apiDefaultTx: api.tx[section][method],
      chain,
      isDevelopment
    });
  }

  render() {
    const {
      api,
      apiDefaultTx,
      chain,
      isApiConnected,
      isApiReady,
      isDevelopment,
      setApiUrl
    } = this.state;
    return _react.default.createElement(_ApiContext.default.Provider, {
      value: {
        api,
        apiDefaultTx,
        isApiConnected,
        isApiReady: isApiReady && !!chain,
        isDevelopment,
        setApiUrl
      }
    }, this.props.children);
  }

}

exports.default = ApiWrapper;