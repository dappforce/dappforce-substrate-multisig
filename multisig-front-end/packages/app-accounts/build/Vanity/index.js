"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _uiApp = require("@polkadot/ui-app");

var _vanitygen = _interopRequireDefault(require("../vanitygen"));

var _regex = _interopRequireDefault(require("../vanitygen/regex"));

var _sort = _interopRequireDefault(require("../vanitygen/sort"));

var _Match = _interopRequireDefault(require("./Match"));

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const DEFAULT_MATCH = 'Some';
const BOOL_OPTIONS = [{
  text: 'No',
  value: false
}, {
  text: 'Yes',
  value: true
}];

class VanityApp extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.results = [];
    this.state = {
      elapsed: 0,
      isMatchValid: true,
      isRunning: false,
      keyCount: 0,
      keyTime: 0,
      match: DEFAULT_MATCH,
      matches: [],
      startAt: 0,
      withCase: true
    };
    this._isActive = false;

    this.executeGeneration = () => {
      if (!this.state.isRunning) {
        this.checkMatches();
        return;
      }

      setTimeout(() => {
        if (this._isActive) {
          if (this.results.length === 25) {
            this.checkMatches();
          }

          this.results.push((0, _vanitygen.default)({
            match: this.state.match,
            runs: 10,
            withCase: this.state.withCase
          }));
          this.executeGeneration();
        }
      }, 0);
    };

    this.onCreateToggle = seed => {
      const {
        basePath
      } = this.props;
      window.location.hash = "".concat(basePath, "/create/").concat(seed);
    };

    this.onChangeCase = withCase => {
      this.setState({
        withCase
      });
    };

    this.onChangeMatch = match => {
      this.setState({
        isMatchValid: _regex.default.test(match) && match.length !== 0 && match.length < 31,
        match
      });
    };

    this.onRemove = address => {
      this.setState(prevState => ({
        matches: prevState.matches.filter(item => item.address !== address)
      }));
    };

    this.toggleStart = () => {
      this.setState(prevState => {
        const {
          isRunning,
          keyCount,
          keyTime,
          startAt
        } = prevState;
        this._isActive = !isRunning;
        return {
          isRunning: this._isActive,
          keyCount: this._isActive ? 0 : keyCount,
          keyTime: this._isActive ? 0 : keyTime,
          startAt: this._isActive ? Date.now() : startAt
        };
      }, this.executeGeneration);
    };
  }

  componentWillUnmount() {
    this._isActive = false;
  }

  render() {
    return _react.default.createElement("div", {
      className: "accounts--Vanity"
    }, this.renderOptions(), this.renderButtons(), this.renderStats(), this.renderMatches());
  }

  renderButtons() {
    const {
      t
    } = this.props;
    const {
      isMatchValid,
      isRunning
    } = this.state;
    return _react.default.createElement(_uiApp.Button.Group, null, _react.default.createElement(_uiApp.Button, {
      isDisabled: !isMatchValid,
      isPrimary: !isRunning,
      onClick: this.toggleStart,
      label: isRunning ? t('Stop generation') : t('Start generation')
    }));
  }

  renderMatches() {
    const {
      matches
    } = this.state;
    return _react.default.createElement("div", {
      className: "vanity--App-matches"
    }, matches.map(match => _react.default.createElement(_Match.default, (0, _extends2.default)({}, match, {
      key: match.address,
      onCreateToggle: this.onCreateToggle,
      onRemove: this.onRemove
    }))));
  }

  renderOptions() {
    const {
      t
    } = this.props;
    const {
      isMatchValid,
      isRunning,
      match,
      withCase
    } = this.state;
    return _react.default.createElement("div", {
      className: "ui--row"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      className: "medium",
      isDisabled: isRunning,
      isError: !isMatchValid,
      label: t('generate address with ? as a wildcard'),
      onChange: this.onChangeMatch,
      value: match
    }), _react.default.createElement(_uiApp.Dropdown, {
      className: "medium",
      isDisabled: isRunning,
      label: t('perform a case sensitive search/match'),
      options: BOOL_OPTIONS,
      onChange: this.onChangeCase,
      value: withCase
    }));
  }

  renderStats() {
    const {
      t
    } = this.props;
    const {
      elapsed,
      keyCount
    } = this.state;

    if (!keyCount) {
      return null;
    }

    const secs = elapsed / 1000;
    return _react.default.createElement("div", {
      className: "vanity--App-stats"
    }, t('Evaluated {{count}} keys in {{elapsed}}s ({{avg}} keys/s)', {
      replace: {
        avg: (keyCount / secs).toFixed(3),
        count: keyCount,
        elapsed: secs.toFixed(2)
      }
    }));
  }

  checkMatches() {
    const results = this.results;
    this.results = [];

    if (results.length === 0 || !this._isActive) {
      return;
    }

    this.setState(prevState => {
      let newKeyCount = prevState.keyCount;
      let newKeyTime = prevState.keyTime;
      const matches = results.reduce((result, _ref) => {
        let {
          elapsed,
          found
        } = _ref;
        newKeyCount += found.length;
        newKeyTime += elapsed;
        return result.concat(found);
      }, prevState.matches).sort(_sort.default).slice(0, 25);
      const elapsed = Date.now() - prevState.startAt;
      return {
        elapsed,
        matches,
        keyCount: newKeyCount,
        keyTime: newKeyTime
      };
    });
  }

}

var _default = (0, _translate.default)(VanityApp);

exports.default = _default;