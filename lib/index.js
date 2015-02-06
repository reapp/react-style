'use strict';

require('./ReactElementExtended');

var ExecutionEnvironment   = require('react/lib/ExecutionEnvironment');
var stylesToCSS            = require('./stylesToCSS');
var styleComponent         = require('./styleComponent');

var assign                 = require("react/lib/Object.assign");

var isArray = Array.isArray;


var styles = [];
var counter = 0;

function genClassName() {
  counter += 1;
  return 'c' + counter + '_';
}

function createStyle(props, className, useClassName) {
  className = className || genClassName();

  var style = null;
  if (props) {
    style = {};
    for (var key in props) {
      if (!props.hasOwnProperty(key)) {
        continue;
      }
      style[key] = props[key];
    }
  }

  styles.push({
    style: style,
    className: className
  });

  // making the style object immutable during development
  if ("production" !== process.env.NODE_ENV && style) {
    Object.freeze(style);
  }

  return !useClassName ||
         (typeof window !== 'undefined' && window.__ReactStyle__ && !__ReactStyle__[className]) ?
         style : className;
}


var ReactStyle = {
  create: createStyle,
  style: styleComponent,
  compile: function(maxLength) {
    return stylesToCSS(styles, maxLength || 10);
  }
};

assign(createStyle, ReactStyle);

module.exports = createStyle;
