/**
 * @jsx React.DOM
 */
'use strict';

var ReactStyle = require('react-style');
var React = require('react');

var ButtonGroupStyles = {

  normalStyle: ReactStyle({
    display: 'inline'
  })

};

class ButtonGroup extends React.Component {

  render() {
    return (
      <div styles={ButtonGroupStyles.normalStyle}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = ButtonGroup;
