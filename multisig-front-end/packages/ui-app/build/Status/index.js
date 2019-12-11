"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _AddressMini = _interopRequireDefault(require("../AddressMini"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _util = require("../util");

var _translate = _interopRequireDefault(require("../translate"));

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class Status extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderStatus = (_ref) => {
      let {
        account,
        action,
        id,
        message,
        removeItem,
        status
      } = _ref;
      const addressRendered = account ? _react.default.createElement(_AddressMini.default, {
        value: account
      }) : undefined;
      return _react.default.createElement("div", {
        className: (0, _util.classes)('item', status),
        onClick: removeItem,
        key: id
      }, _react.default.createElement("div", {
        className: "wrapper"
      }, _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "desc"
      }, _react.default.createElement("div", {
        className: "header"
      }, action), addressRendered, _react.default.createElement("div", {
        className: "status"
      }, message)), _react.default.createElement("div", {
        className: "short"
      }, _react.default.createElement(_Icon.default, {
        name: this.iconName(status)
      })))));
    };

    this.renderItem = (_ref2) => {
      let {
        id,
        extrinsic,
        error,
        removeItem,
        rpc,
        status,
        result
      } = _ref2;
      let {
        method,
        section
      } = rpc;

      if (extrinsic) {
        const found = _types.Method.findFunction(extrinsic.callIndex);

        if (found.section !== 'unknown') {
          method = found.method;
          section = found.section;
        }
      }

      const isExtrinsicFailed = status === 'finalized' && result !== undefined && undefined !== result.events.find((_ref3) => {
        let {
          event
        } = _ref3;
        const {
          section,
          method
        } = event;
        return section === 'system' && method === 'ExtrinsicFailed';
      });
      const icon = isExtrinsicFailed ? 'times' : this.signerIconName(status);
      return _react.default.createElement("div", {
        className: (0, _util.classes)('item', status, isExtrinsicFailed ? 'failed' : ''),
        onClick: removeItem,
        key: id
      }, _react.default.createElement("div", {
        className: "wrapper"
      }, _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "desc"
      }, _react.default.createElement("div", {
        className: "header"
      }, section, ".", method), _react.default.createElement("div", {
        className: "status"
      }, isExtrinsicFailed ? 'failed' : error ? error.message : status)), _react.default.createElement("div", {
        className: "short"
      }, _react.default.createElement(_Icon.default, {
        loading: icon === 'spinner',
        name: icon
      })))));
    };

    this.iconName = status => {
      switch (status) {
        case 'error':
          return 'ban';

        case 'event':
          return 'assistive listening devices';

        case 'received':
          return 'telegram plane';

        default:
          return 'check';
      }
    };

    this.signerIconName = status => {
      switch (status) {
        case 'cancelled':
          return 'ban';

        case 'completed':
        case 'finalized':
        case 'sent':
          return 'check';

        case 'dropped':
        case 'invalid':
        case 'usurped':
          return 'arrow down';

        case 'error':
          return 'warning sign';

        case 'queued':
          return 'random';

        default:
          return 'spinner';
      }
    };
  }

  render() {
    const {
      stqueue = [],
      txqueue = []
    } = this.props;
    const allst = stqueue.filter((_ref4) => {
      let {
        isCompleted
      } = _ref4;
      return !isCompleted;
    });
    const alltx = txqueue.filter((_ref5) => {
      let {
        status
      } = _ref5;
      return !['completed', 'incomplete'].includes(status);
    });

    if (!allst.length && !alltx.length) {
      return null;
    }

    return _react.default.createElement("div", {
      className: "ui--Status"
    }, alltx.map(this.renderItem), allst.map(this.renderStatus));
  }

}

var _default = (0, _translate.default)(Status);

exports.default = _default;