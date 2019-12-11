"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _semanticUiReact = require("semantic-ui-react");

var _snappyjs = _interopRequireDefault(require("snappyjs"));

var _uiApi = require("@polkadot/ui-api");

var _uiApp = require("@polkadot/ui-app");

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var types = _interopRequireWildcard(require("@polkadot/types"));

var util = _interopRequireWildcard(require("@polkadot/util"));

var hashing = _interopRequireWildcard(require("@polkadot/util-crypto"));

require("./index.css");

var _wrapping = _interopRequireDefault(require("./snippets/wrapping"));

var _snippets = _interopRequireDefault(require("./snippets"));

var _translate = _interopRequireDefault(require("./translate"));

var _constants = require("./constants");

var _Output = _interopRequireDefault(require("./Output"));

var _ActionButtons = _interopRequireDefault(require("./ActionButtons"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class Playground extends _react.default.PureComponent {
  constructor(props) {
    var _this;

    super(props);
    _this = this;
    this.injected = null;
    this.snippets = JSON.parse(JSON.stringify(_snippets.default));

    this.runJs = async () => {
      const {
        api,
        isDevelopment
      } = this.props;
      const {
        code
      } = this.state.selected;
      this.stopJs();
      this.clearConsole();
      this.injected = {
        api: api.clone(),
        console: {
          error: this.hookConsole('error'),
          log: this.hookConsole('log')
        },
        global: null,
        hashing,
        keyring: isDevelopment ? _uiKeyring.default.keyring : null,
        types,
        util,
        window: null
      };
      await this.injected.api.isReady; // squash into a single line so exceptions (with linenumbers) maps to the same line/origin
      // as we have in the editor view (TODO: Make the console.error here actually return the full stack)

      const exec = "(async ({".concat(Object.keys(this.injected).join(','), "}) => { try { ").concat(code, " \n } catch (error) { console.error(error); } })(injected);");
      new Function('injected', exec)(this.injected);
      this.setState({
        isRunning: true
      });
    };

    this.stopJs = () => {
      if (!this.injected) {
        return;
      }

      this.injected.api.disconnect();
      this.injected = null;
      this.setState({
        isRunning: false
      });
    };

    this.selectExample = value => {
      if (value.length) {
        const {
          options
        } = this.state;
        const option = options.find(option => option.value === value);

        if (option) {
          localStorage.setItem(_constants.STORE_SELECTED, value);
          this.setState({
            logs: [],
            isCustomExample: option.type === 'custom',
            selected: option
          });
        }
      }
    };

    this.saveSnippet = snippetName => {
      const {
        customExamples,
        sharedExample,
        selected: {
          code,
          type
        }
      } = this.state; // The <Dropdown> component doesn't take boolean custom props and no
      // camelCase keys, that's why 'custom' is passed as a string here

      const snapshot = {
        code,
        type: 'custom',
        label: _constants.CUSTOM_LABEL,
        text: snippetName,
        value: "custom-".concat(Date.now())
      };
      const nextOptions = [snapshot, ...customExamples, ...this.snippets];
      const options = type === 'shared' ? nextOptions : sharedExample ? [sharedExample, ...nextOptions] : nextOptions;
      localStorage.setItem(_constants.STORE_EXAMPLES, JSON.stringify([snapshot, ...customExamples]));
      this.setState(prevState => _objectSpread({}, prevState, {
        customExamples: [snapshot, ...prevState.customExamples],
        isCustomExample: true,
        options,
        sharedExample: type === 'shared' ? undefined : prevState.sharedExample,
        selected: snapshot
      }));
    };

    this.removeSnippet = () => {
      const {
        customExamples,
        selected
      } = this.state;
      const filtered = customExamples.filter(value => value.value !== selected.value);
      const nextOptions = [...filtered, ...this.snippets];
      this.setState(prevState => _objectSpread({}, prevState, {
        customExamples: filtered,
        isCustomExample: nextOptions[0].type === 'custom' || false,
        options: prevState.sharedExample ? [prevState.sharedExample, ...nextOptions] : nextOptions
      }));
      this.selectExample(nextOptions[0].value);
      localStorage.setItem(_constants.STORE_EXAMPLES, JSON.stringify(filtered));
    };

    this.onEdit = code => {
      if (code !== this.state.selected.code) {
        this.setState(prevState => ({
          selected: _objectSpread({}, prevState.selected, {
            code
          }),
          isCustomExample: false
        }));
      }
    };

    this.clearConsole = () => {
      this.setState({
        logs: []
      });
    };

    this.hookConsole = type => {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.setState((_ref) => {
          let {
            logs
          } = _ref;
          logs.push({
            args,
            type
          });
          return {
            logs: logs.slice(0)
          };
        });
      };
    };

    this.decodeBase64 = base64 => {
      const sharedExample = {
        code: '',
        label: {
          basic: true,
          children: 'URL',
          size: 'tiny'
        },
        text: 'Shared code example (unsaved)',
        type: 'shared',
        value: "custom-".concat(Date.now())
      };

      try {
        const compStr = atob(base64);
        const compU8a = new Uint8Array(compStr.length);
        compU8a.forEach((_, i) => {
          compU8a[i] = compStr.charCodeAt(i);
        });

        const u8a = _snappyjs.default.uncompress(compU8a);

        const code = util.u8aToString(u8a);
        sharedExample.code = code;
      } catch (error) {
        const errorMessage = this.props.t('ERROR: Unable to decode code example from URL');
        console.error("".concat(errorMessage, ": \n").concat(error));
        sharedExample.code = "// ".concat(errorMessage);
      }

      return sharedExample;
    };

    this.generateLink = () => {
      const {
        props: {
          history,
          match: {
            params: {
              base64
            }
          }
        },
        state: {
          selected: {
            code
          }
        }
      } = this;
      const u8a = util.stringToU8a(code);

      const compU8a = _snappyjs.default.compress(u8a);

      const compStr = compU8a.reduce((str, ch) => {
        return str + String.fromCharCode(ch);
      }, '');
      const base64code = btoa(compStr);
      const path = "/js/share/".concat(base64code);

      if (base64code !== base64) {
        history.push(path);
      }

      const basePath = window.location.pathname.replace('/', '').length > 0 ? "".concat(window.location.origin, "/").concat(window.location.pathname.replace('/', '')) : "".concat(window.location.origin);
      this.copyToClipboard("".concat(basePath, "/#").concat(path));
    };

    this.copyToClipboard = link => {
      // See https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
      const el = document.createElement('textarea');
      el.value = link;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const existingSelection = document.getSelection();
      const selected = existingSelection && existingSelection.rangeCount > 0 ? existingSelection.getRangeAt(0) : undefined;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      if (selected) {
        existingSelection.removeAllRanges();
        existingSelection.addRange(selected);
      }

      this.setState({
        animated: !this.state.animated
      });
    };

    this.snippets.forEach(snippet => snippet.code = "".concat((0, _wrapping.default)(this.props.isDevelopment)).concat(snippet.code));
    this.state = {
      animated: true,
      customExamples: [],
      isCustomExample: false,
      isRunning: false,
      logs: [],
      options: [],
      selected: this.snippets[0],
      sharedExample: undefined
    };
  } // FIXME: Semantic UI is still using Reacts old lifecycle methods that are considered as unsafe (eg. componentWillMount).
  // There's a ticket and an ongoing process of updating SUI to the new lifecycle methods (here: componentDidMount).
  // Please check https://github.com/Semantic-Org/Semantic-UI-React/issues/2732 for details
  // This needs to change to componentDidMount() as soon as the original MUI component got updated


  componentWillMount() {
    const {
      match: {
        params: {
          base64
        }
      }
    } = this.props;
    const sharedExample = base64 ? this.decodeBase64(base64) : undefined;
    const localData = {
      examples: localStorage.getItem(_constants.STORE_EXAMPLES),
      selectedValue: localStorage.getItem(_constants.STORE_SELECTED)
    };
    const customExamples = localData.examples ? JSON.parse(localData.examples) : [];
    const options = sharedExample ? [sharedExample, ...customExamples, ...this.snippets] : [...customExamples, ...this.snippets];
    const selected = options.find(option => option.value === localData.selectedValue);
    this.setState(prevState => ({
      customExamples,
      isCustomExample: selected && selected.type === 'custom' || false,
      options,
      selected: sharedExample || selected || this.snippets[0],
      sharedExample
    }));
  }

  render() {
    const {
      t
    } = this.props;
    const {
      animated,
      isCustomExample,
      isRunning,
      logs,
      options,
      selected
    } = this.state;
    const snippetName = selected.type === 'custom' ? selected.text : undefined;
    return _react.default.createElement("main", {
      className: "js--App"
    }, _react.default.createElement("header", {
      className: "container"
    }, _react.default.createElement(_uiApp.Dropdown, {
      className: "js--Dropdown",
      onChange: this.selectExample,
      options: options,
      label: t('Select example'),
      defaultValue: selected.value
    })), _react.default.createElement("section", {
      className: "js--Content"
    }, _react.default.createElement(_semanticUiReact.Transition, {
      animation: "glow",
      duration: 700,
      visible: animated
    }, _react.default.createElement("article", {
      className: "container js--Editor"
    }, _react.default.createElement(_uiApp.Editor, {
      code: selected.code,
      onEdit: this.onEdit
    }), _react.default.createElement(_ActionButtons.default, {
      isCustomExample: isCustomExample,
      isRunning: isRunning,
      generateLink: this.generateLink,
      removeSnippet: this.removeSnippet,
      runJs: this.runJs,
      saveSnippet: this.saveSnippet,
      snippetName: snippetName,
      stopJs: this.stopJs
    }))), _react.default.createElement(_Output.default, {
      logs: logs
    }, _react.default.createElement(_uiApp.Button, {
      className: "action-button",
      isCircular: true,
      isNegative: true,
      icon: "erase",
      onClick: this.clearConsole
    }))));
  }

}

var _default = (0, _uiApi.withMulti)(Playground, _translate.default, _uiApi.withApi, _reactRouter.withRouter);

exports.default = _default;