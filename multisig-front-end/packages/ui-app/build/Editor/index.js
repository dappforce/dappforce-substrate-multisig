"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@polkadot/ui-app/util");

var _codeflask = _interopRequireDefault(require("codeflask"));

require("./style.css");

// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name Editor
 * @summary A code editor based on the codeflask npm module
 * @description It allows to live-edit code examples and JSON files.
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import {Editor} from '@polkadot/ui-app';
 *
 * <Editor
 *    className={string} // optional
 *    code={string}
 *    isValid={boolean}, // optional
 *    onEdit={() => callbackFunction}
 *  />
 * ```
 */
class Editor extends _react.default.Component {
  constructor() {
    super(...arguments);
    this.id = "flask-".concat(Date.now());
    this.editor = void 0;
  }

  componentDidMount() {
    const {
      onEdit
    } = this.props;
    this.editor = new _codeflask.default("#".concat(this.id), {
      language: 'js',
      lineNumbers: true
    });
    this.editor.updateCode(this.props.code);
    this.editor.editorRoot.addEventListener('keydown', () => {
      this.editor.onUpdate(onEdit);
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.code !== this.props.code;
  }

  componentDidUpdate() {
    this.editor.updateCode(this.props.code);
  }

  render() {
    const {
      className,
      isValid
    } = this.props;
    return _react.default.createElement("div", {
      id: this.id,
      className: (0, _util.classes)('ui-app-editor', className, isValid === false ? 'invalid' : '')
    });
  }

}

exports.default = Editor;