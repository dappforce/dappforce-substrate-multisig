"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

class Section extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    this.renderTitle = () => {
      const {
        title,
        level = 2
      } = this.props;
      if (!title) return null;
      const className = 'DfSection-title';
      return _react.default.createElement("h".concat(level), {
        className
      }, title);
    };
  }

  render() {
    let {
      id,
      className,
      children
    } = this.props;
    className = (className || '') + ' DfSection';
    return _react.default.createElement("section", {
      id: id,
      className: className
    }, this.renderTitle(), _react.default.createElement("div", null, children));
  }

}

exports.default = Section;