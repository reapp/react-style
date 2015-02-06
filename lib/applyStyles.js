'use strict';

var CSSProperty = require('react/lib/CSSProperty');
var isArray     = Array.isArray;
var keys        = Object.keys;

var COMPLEX_OVERRIDES = CSSProperty.shorthandPropertyExpansions;

function applyClassName(props, className, order) {
  if (!props.className) {
    props.className = '';
  }
  for (var j = 0; j < order + 1; j++) {
    props.className += ' ' + className + (j === 0 ? '' : j);
  }

  return order + 1;
}

function applyInlineStyle(props, style, order) {
  if (!props.style) {
    props.style = {};
  }
  var styleKeys = keys(style);
  for (var i = 0, l = styleKeys.length; i < l; i++) {
    var key = styleKeys[i];
    props.style[key] = style[key];
    applyOverrides(props, key);
  }

  return order;
}

function applyOverrides(props, key) {
  var overrides = COMPLEX_OVERRIDES[key];
  if (overrides) {
    var overridesKeys = keys(overrides);
    for (var i = 0, l = overridesKeys.length; i < l; i++) {
      var overrideKey = overridesKeys[i];
      props.style[overrideKey] = '';
    }
  }
}

function applyStyle(props, style, order) {
  if (style === null || style === undefined || style === false) {
    return order;
  }
  else if (typeof style === 'string' && order < 10) {
    return applyClassName(props, style, order);
  }
  else {
    return applyInlineStyle(props, style, order);
  }
}

function applyStyles(props, styles, order, inline) {
  if (order === undefined) {
    order = 0;
    inline = false;
  }

  if (isArray(styles)) {

    for (var i = 0, len = styles.length; i < len; i++) {
      var style = styles[i];
      if ("production" !== process.env.NODE_ENV && style) {
        if (typeof style === 'object' && !Array.isArray(style)) {
          inline = true;
        }
        else if (inline && typeof style === 'string') {
          console.warn('You are trying to override inline styles with a ' +
                       'class, which might cause issues due to classes ' +
                       'having lower CSS specificity then inline styles.');
        }
      }
      order = applyStyles(props, style, order, inline);
    }
    return order;
  }
  else {
    return applyStyle(props, styles, order);
  }
}

module.exports = applyStyles;
