"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _jsonrpc = _interopRequireDefault(require("@polkadot/jsonrpc"));

var _Context = require("./Context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const defaultState = {
  stqueue: [],
  txqueue: []
};
let nextId = 0;
const REMOVE_TIMEOUT = 7500;
const SUBMIT_RPC = _jsonrpc.default.author.methods.submitAndWatchExtrinsic;
const STATUS_COMPLETE = [// status from subscription
'finalized', 'usurped', 'dropped', 'invalid', // normal completion
'cancelled', 'error', 'sent'];

class Queue extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.queueAction = status => {
      const id = ++nextId;
      const removeItem = this.clearAction(id);
      this.setState(prevState => ({
        stqueue: prevState.stqueue.concat(_objectSpread({}, status, {
          id,
          isCompleted: false,
          removeItem
        }))
      }));
      setTimeout(removeItem, REMOVE_TIMEOUT);
      return id;
    };

    this.queueSetTxStatus = (id, status, result, error) => {
      this.setState(prevState => ({
        txqueue: prevState.txqueue.map(item => item.id === id ? _objectSpread({}, item, {
          error: error === undefined ? item.error : error,
          result: result === undefined ? item.result : result,
          status: item.status === 'completed' ? item.status : status
        }) : item)
      }));
      this.addResultEvents(result);

      if (STATUS_COMPLETE.includes(status)) {
        setTimeout(this.clearStatus(id), REMOVE_TIMEOUT);
      }
    };

    this.queueAdd = value => {
      const id = ++nextId;
      const rpc = value.rpc || SUBMIT_RPC;
      const removeItem = this.clearStatus(id);
      this.setState(prevState => ({
        txqueue: prevState.txqueue.concat([_objectSpread({}, value, {
          id,
          removeItem,
          rpc,
          status: 'queued'
        })])
      }));
      return id;
    };

    this.queueExtrinsic = (_ref) => {
      let {
        accountId,
        extrinsic,
        signerCb,
        signerOptions,
        txFailedCb,
        txSuccessCb,
        txUpdateCb,
        txSentCb,
        txCancelledCb,
        isUnsigned
      } = _ref;
      return this.queueAdd({
        accountId,
        extrinsic,
        isUnsigned,
        signerCb,
        signerOptions,
        txFailedCb,
        txSuccessCb,
        txUpdateCb,
        txSentCb,
        txCancelledCb
      });
    };

    this.queueRpc = (_ref2) => {
      let {
        accountId,
        rpc,
        values
      } = _ref2;
      return this.queueAdd({
        accountId,
        rpc,
        values
      });
    };

    this.state = {
      stqueue: [],
      txqueue: [],
      queueAction: this.queueAction,
      queueRpc: this.queueRpc,
      queueExtrinsic: this.queueExtrinsic,
      queueSetTxStatus: this.queueSetTxStatus
    };
  }

  render() {
    return _react.default.createElement(_Context.QueueProvider, {
      value: this.state
    }, this.props.children);
  }

  clearAction(id) {
    return () => {
      this.setState(prevState => ({
        stqueue: prevState.stqueue.filter(item => item.id !== id)
      }));
    };
  }

  clearStatus(id) {
    return () => {
      this.setState(prevState => ({
        txqueue: prevState.txqueue.map(item => item.id === id ? _objectSpread({}, item, {
          status: 'completed'
        }) : item)
      }));
    };
  }

  addResultEvents() {
    let {
      events = []
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    events.filter(record => record.event).forEach((_ref3) => {
      let {
        event: {
          method,
          section
        }
      } = _ref3;

      // filter events handled globally, or those we are not interested in, these are
      // handled by the global overview, so don't add them here
      if (section === 'democracy') {
        return;
      }

      this.queueAction({
        action: "".concat(section, ".").concat(method),
        status: 'event',
        message: 'extrinsic event'
      });
    });
  }

}

exports.default = Queue;