"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

require("./index.css");

var _Extrinsics = _interopRequireDefault(require("../BlockQuery/Extrinsics"));

var _Peers = _interopRequireDefault(require("./Peers"));

var _Summary = _interopRequireDefault(require("./Summary"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-nodeinfo authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const POLL_TIMEOUT = 9900;

class App extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.isActive = true;
    this.state = {
      nextRefresh: Date.now()
    };

    this.getStatus = async () => {
      const {
        api
      } = this.props;

      try {
        const [health, peers, extrinsics] = await Promise.all([api.rpc.system.health(), api.rpc.system.peers(), api.rpc.author.pendingExtrinsics()]);
        this.setInfo({
          extrinsics,
          health,
          peers
        });
      } catch (error) {
        this.setInfo();
      }
    };
  }

  componentDidMount() {
    this.getStatus().catch(() => {// ignore
    });
  }

  componentWillUnmount() {
    const {
      timerId
    } = this.state;
    this.isActive = false;

    if (timerId) {
      window.clearTimeout(timerId);
    }
  }

  render() {
    const {
      t
    } = this.props;
    const {
      info = {},
      nextRefresh
    } = this.state;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Summary.default, {
      info: info,
      nextRefresh: nextRefresh
    }), _react.default.createElement(_Peers.default, {
      peers: info.peers
    }), _react.default.createElement(_Extrinsics.default, {
      label: t('pending extrinsics'),
      value: info.extrinsics
    }));
  }

  setInfo(info) {
    if (!this.isActive) {
      return;
    }

    this.setState({
      info,
      nextRefresh: Date.now() + POLL_TIMEOUT,
      timerId: window.setTimeout(this.getStatus, POLL_TIMEOUT)
    });
  }

}

var _default = (0, _uiApi.withMulti)(App, _translate.default, _uiApi.withApi);

exports.default = _default;