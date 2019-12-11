"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _uiApi = require("@polkadot/ui-api");

var _util = require("@polkadot/util");

var _Context = require("./Status/Context");

var _Button = _interopRequireDefault(require("./Button"));

// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class TxButtonInner extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.send = () => {
      const {
        accountId,
        api,
        onClick,
        onFailed,
        onSuccess,
        onUpdate,
        params = [],
        queueExtrinsic,
        tx
      } = this.props;
      (0, _util.assert)(tx, 'Expected tx param passed to TxButton');
      const [section, method] = tx.split('.');
      (0, _util.assert)(api.tx[section] && api.tx[section][method], "Unable to find api.tx.".concat(section, ".").concat(method));
      const extrinsic = api.tx[section][method](...((0, _util.isFunction)(params) ? params() : params));
      queueExtrinsic({
        accountId,
        extrinsic,
        txFailedCb: onFailed,
        txSuccessCb: onSuccess,
        txUpdateCb: onUpdate
      });
      onClick && onClick();
    };
  }

  render() {
    const {
      accountId,
      isDisabled,
      isNegative,
      isPrimary,
      label
    } = this.props;
    return _react.default.createElement(_Button.default, {
      isDisabled: isDisabled || !accountId,
      isNegative: isNegative,
      isPrimary: (0, _util.isUndefined)(isPrimary) ? !isNegative : isPrimary,
      label: label,
      onClick: this.send
    });
  }

}

class TxButton extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_Context.QueueConsumer, null, (_ref) => {
      let {
        queueExtrinsic
      } = _ref;
      return _react.default.createElement(TxButtonInner, (0, _extends2.default)({}, this.props, {
        queueExtrinsic: queueExtrinsic
      }));
    });
  }

}

var _default = (0, _uiApi.withApi)(TxButton);

exports.default = _default;