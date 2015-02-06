'use strict';

var ReactStyle = require('react-style');

var ButtonStyles = {

  primary: ReactStyle({
    backgroundColor: 'rgb(0, 120, 231)',
    color: '#fff'
  }),

  success: ReactStyle({
    color: 'white',
    background: 'rgb(28, 184, 65)'
  }),

  error: ReactStyle({
    color: 'white',
    background: 'rgb(202, 60, 60)'
  })

};

module.exports = ButtonStyles;
