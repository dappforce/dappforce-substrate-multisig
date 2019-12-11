"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _uiApp = require("@polkadot/ui-app");

var _translate = _interopRequireDefault(require("./translate"));

// Copyright 2017-2019 @polkadot/app-js authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ActionButtons extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
      shareText: this.props.t('Generate link to share code example'),
      snippetName: ''
    };

    this.generateLink = () => {
      const {
        generateLink,
        t
      } = this.props;
      this.setState({
        shareText: t('Copied to clipboard')
      });
      generateLink();
    };

    this.onShareClose = () => {
      this.setState({
        shareText: this.props.t('Generate link to share code example')
      });
    };

    this.onChangeName = snippetName => {
      this.setState({
        snippetName
      });
    };

    this.saveSnippet = () => {
      const {
        state: {
          snippetName
        },
        props: {
          saveSnippet
        }
      } = this;
      saveSnippet(snippetName);
      this.setState({
        snippetName: '',
        isOpen: false
      });
    };

    this.onPopupOpen = () => {
      this.setState({
        isOpen: true,
        snippetName: this.props.snippetName || ''
      });
    };

    this.onPopupClose = () => {
      this.setState({
        snippetName: '',
        isOpen: false
      });
    };
  }

  render() {
    const {
      props: {
        isCustomExample,
        isRunning,
        removeSnippet,
        runJs,
        stopJs,
        t
      },
      state: {
        isOpen,
        snippetName
      }
    } = this;
    return _react.default.createElement("div", {
      className: "action-button"
    }, _react.default.createElement(_semanticUiReact.Popup, {
      content: this.state.shareText,
      on: "hover",
      onClose: this.onShareClose,
      trigger: _react.default.createElement(_semanticUiReact.Button, {
        circular: true,
        icon: "share alternate",
        onClick: this.generateLink
      }),
      wide: 'very'
    }), isCustomExample && _react.default.createElement(_semanticUiReact.Popup, {
      content: t('Delete this custom example'),
      on: "hover",
      trigger: _react.default.createElement(_semanticUiReact.Button, {
        circular: true,
        negative: true,
        icon: "trash alternate outline",
        onClick: removeSnippet
      })
    }), !isCustomExample && _react.default.createElement(_semanticUiReact.Popup, {
      className: "popup-local",
      open: isOpen,
      onClose: this.onPopupClose,
      trigger: _react.default.createElement(_semanticUiReact.Button, {
        circular: true,
        onClick: this.onPopupOpen,
        icon: "save"
      }),
      on: "click"
    }, _react.default.createElement(_uiApp.Input, {
      autoFocus: true,
      onChange: this.onChangeName,
      onBlur: this.onPopupClose,
      withLabel: false,
      maxLength: 50,
      min: 1,
      placeholder: t('Name your example'),
      value: snippetName
    }), _react.default.createElement(_uiApp.Button, {
      onClick: this.saveSnippet,
      label: t('Save snippet to local storage'),
      isDisabled: !snippetName.length,
      isPositive: true
    })), _react.default.createElement(_uiApp.Button, {
      isCircular: true,
      isPositive: true,
      icon: "play",
      onClick: runJs
    }), _react.default.createElement(_uiApp.Button, {
      isCircular: true,
      isDisabled: !isRunning,
      isNegative: true,
      icon: "close",
      onClick: stopJs
    }));
  }

}

var _default = (0, _translate.default)(ActionButtons);

exports.default = _default;