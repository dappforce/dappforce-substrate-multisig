"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("@polkadot/types");

var _uiApi = require("@polkadot/ui-api");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic"));

// Copyright 2017-2019 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
class ProposalDisplay extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onChange = (_ref) => {
      let {
        isValid,
        value
      } = _ref;
      const {
        onChange
      } = this.props;
      let proposal = null;

      if (isValid && value) {
        proposal = new _types.Proposal(value);
      }

      onChange && onChange({
        isValid,
        value: proposal
      });
    };
  }

  render() {
    const {
      apiDefaultTx,
      api,
      className,
      isDisabled,
      isError,
      label,
      style,
      withLabel
    } = this.props;

    const defaultValue = (() => {
      try {
        return api.tx.consensus.setCode;
      } catch (error) {
        return apiDefaultTx;
      }
    })();

    return _react.default.createElement(_Extrinsic.default, {
      className: className,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: true,
      label: label,
      onChange: this.onChange,
      style: style,
      withLabel: withLabel
    });
  }

}

var _default = (0, _uiApi.withApi)(ProposalDisplay);

exports.default = _default;