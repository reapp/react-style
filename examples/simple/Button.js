/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ButtonStyles = {

  normalStyle: ReactStyle({
    display: 'inline-block',
    zoom: 1,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    fontSize: '100%',
    padding: '0.5em 1em',
    color: 'rgba(0, 0, 0, 0.70)',
    border: 'none rgba(0, 0, 0, 0)',
    backgroundColor: '#E6E6E6',
    textDecoration: 'none',
    borderRadius: '3px'
  }, 'Button_baseStyle'),

  activeStyle: ReactStyle({
    boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
  }, 'Button_activeStyle'),

  hoverStyle: ReactStyle({
    color: '#000',
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))'
  }, 'Button_hoverStyle'),

  focusStyle: ReactStyle({
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))',
    outline: 'none'
  }, 'Button_focusStyle')
};

class Button {

  getInitialState() {
    return {
      focus: false,
      hover: false
    }
  }

  render() {
    var props = this.props;
    var state = this.state;
    var styles = [
        ButtonStyles.normalStyle,
        props.active ? ButtonStyles.activeStyle : null,
        state.hover ? ButtonStyles.hoverStyle : null,
        state.focus ? ButtonStyles.focusStyle : null
    ].concat(props.styles);

    return (
      <button {...props} styles={styles}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}>
        {props.children}
      </button>
    );
  }

  onMouseEnter() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  onFocus() {
    this.setState({focus: true});
  }

  onBlur() {
    this.setState({focus: false})
  }
}

module.exports = React.createClass(Button.prototype);
