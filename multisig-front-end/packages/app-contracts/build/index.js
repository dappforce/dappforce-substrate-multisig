"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _uiApp = require("@polkadot/ui-app");

var _intro = _interopRequireDefault(require("./md/intro.md"));

var _store = _interopRequireDefault(require("./store"));

var _translate = _interopRequireDefault(require("./translate"));

var _Call = _interopRequireDefault(require("./Call"));

var _Code = _interopRequireDefault(require("./Code"));

var _Instantiate = _interopRequireDefault(require("./Instantiate"));

// Copyright 2017-2019 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class App extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = void 0;

    this.triggerUpdate = () => {
      this.setState({
        updated: Date.now()
      });
    };

    const {
      t
    } = props;

    _store.default.on('new-code', this.triggerUpdate);

    _store.default.on('new-contract', this.triggerUpdate); // since we have a dep on the async API, we load here


    _store.default.loadAll().catch(() => {// noop, handled internally
    });

    this.state = {
      tabs: [{
        name: 'call',
        text: t('Call')
      }, {
        name: 'instantiate',
        text: t('Instance')
      }, {
        name: 'code',
        text: t('Code')
      }],
      updated: 0
    };
  }

  render() {
    const {
      basePath
    } = this.props;
    const {
      tabs
    } = this.state;
    const hidden = _store.default.hasContracts ? [] : ['call'];

    if (!_store.default.hasCode) {
      hidden.push('instantiate');
    }

    return _react.default.createElement("main", {
      className: "contracts--App"
    }, _react.default.createElement(_uiApp.HelpOverlay, {
      md: _intro.default
    }), _react.default.createElement("header", null, _react.default.createElement(_uiApp.Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: tabs
    })), _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/instantiate"),
      render: this.renderComponent(_Instantiate.default)
    }), _react.default.createElement(_reactRouter.Route, {
      path: "".concat(basePath, "/code"),
      render: this.renderComponent(_Code.default)
    }), _react.default.createElement(_reactRouter.Route, {
      render: hidden.includes('call') ? hidden.includes('instantiate') ? this.renderComponent(_Code.default) : this.renderComponent(_Instantiate.default) : this.renderComponent(_Call.default)
    })));
  }

  renderComponent(Component) {
    return (_ref) => {
      let {
        match
      } = _ref;
      const {
        basePath,
        location,
        onStatusChange
      } = this.props;
      return _react.default.createElement(Component, {
        basePath: basePath,
        location: location,
        match: match,
        onStatusChange: onStatusChange
      });
    };
  }

}

var _default = (0, _translate.default)(App);

exports.default = _default;