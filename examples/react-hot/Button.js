/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ButtonStyles = {

  normalStyle: ReactStyle({
    backgroundColor: '#E6E6E6',
    border: 'none rgba(0, 0, 0, 0)',
    borderRadius: 3,
    color: 'rgba(0, 0, 0, 0.70)',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 'normal',
    padding: '0.5em 1em',
    userSelect: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'baseline',
    whiteSpace: 'nowrap',
    zoom: 1
  }),

  activeStyle: ReactStyle({
    boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
  }),

  hoverStyle: ReactStyle({
    color: '#000',
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))'
  }),

  focusStyle: ReactStyle({
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))',
    outline: 'none'
  })

};

class Button extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      hover: false
    };
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
      <button {...props} className="custom" styles={styles}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        onFocus={() => this.setState({focus:true})}
        onBlur={() => this.setState({focus: false})}>
      {props.children}
      </button>
    );
  }
}

module.exports = Button;
