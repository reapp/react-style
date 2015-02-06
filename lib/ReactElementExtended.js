'use strict';

var ReactElement  = require('react/lib/ReactElement');
var assign        = require("react/lib/Object.assign");

var applyStyles   = require('./applyStyles');

function buildProps(props) {
  var builtProps = {
    className: props.className || null,
    style: props.style ? assign({}, props.style) : null,
    styles: undefined
  };
  applyStyles(builtProps, props.styles);
  return builtProps;
}

var originalCreateElement = ReactElement.createElement;
ReactElement.createElement = function(type, props, ...children) {
  if (props && typeof type === 'string') {
    props = assign(props, buildProps(props));
  }
  return originalCreateElement.apply(this, [type, props].concat(children));
};
