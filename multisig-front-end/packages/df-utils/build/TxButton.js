"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _index = require("@polkadot/ui-app/index");

var _Context = require("@polkadot/ui-app/Status/Context");

var _index2 = require("@polkadot/ui-api/index");

var _util = require("@polkadot/util");

var _MyAccount = require("@polkadot/df-utils/MyAccount");

class TxButtonInner extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.send = () => {
      const {
        myAddress,
        accountId,
        api,
        params,
        queueExtrinsic,
        tx,
        txFailedCb,
        txSuccessCb,
        txSentCb,
        txCancelledCb
      } = this.props;
      const origin = accountId || myAddress;
      const [section, method] = tx.split('.');
      (0, _util.assert)(api.tx[section] && api.tx[section][method], "Unable to find api.tx.".concat(section, ".").concat(method));
      queueExtrinsic({
        accountId: origin,
        extrinsic: api.tx[section][method](...params),
        // ???
        txFailedCb,
        txSuccessCb,
        txSentCb,
        txCancelledCb
      });
    };
  }

  render() {
    const {
      myAddress,
      accountId,
      isPrimary = true,
      isBasic,
      isDisabled,
      label,
      onClick: _onClick
    } = this.props;
    const origin = accountId || myAddress;
    return _react.default.createElement(_index.Button, (0, _extends2.default)({}, this.props, {
      isDisabled: isDisabled || !origin,
      isBasic: isBasic,
      isPrimary: isPrimary,
      label: label,
      onClick: () => {
        if (_onClick) _onClick(this.send);else this.send();
      }
    }));
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

var _default = (0, _index2.withApi)((0, _MyAccount.withMyAccount)(TxButton));

exports.default = _default;