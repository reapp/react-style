/**
 * @jsx React.DOM
 */
'use strict';

require('normalize.css/normalize.css');

var ReactStyle   = require('react-style');
var React        = require('react');
var Icon         = require('react-fa');
var Button       = require('./Button');
var ButtonStyles = require('./ButtonStyles');
var ButtonGroup  = require('./ButtonGroup');

var TextAlignSwitcherStyles = {

  childStyle: ReactStyle({
    borderRadius: 0,
    margin: 0
  }),

  firstChildStyle: ReactStyle({
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  }),

  lastChildStyle: ReactStyle({
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  })

};

class TextAlignSwitcher extends React.Component {

  render() {
    var props = this.props;

    return (
      <ButtonGroup styles={props.styles}>
        <Button
          active={props.textAlign === 'left'}
          onClick={() => {props.onTextAlign('left')}}
          styles={[TextAlignSwitcherStyles.childStyle, TextAlignSwitcherStyles.firstChildStyle]}>
          <Icon name="align-left" /> Left
        </Button>
        <Button
          active={props.textAlign === 'center'}
          onClick={() => {props.onTextAlign('center')}}
          styles={[TextAlignSwitcherStyles.childStyle]}>
          <Icon name="align-center" /> Center
        </Button>
        <Button
          active={props.textAlign === 'right'}
          onClick={() => {props.onTextAlign('right')}}
          styles={[TextAlignSwitcherStyles.childStyle, TextAlignSwitcherStyles.lastChildStyle]}>
          <Icon name="align-right" /> Right
        </Button>
      </ButtonGroup>
    );
  }
}

var ApplicationStyles = {

  normalStyle: ReactStyle({
    backgroundColor: 'white',
    fontSize: '10pt',
    padding: '1em',
    margin: 10
  }),

  childStyle: ReactStyle({
    marginRight: '0.5em'
  }),

  lastChildStyle: ReactStyle({
    marginRight: 0
  })

};

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textAlign: 'left'
    };
  }

  render() {
    return (
      <div styles={ApplicationStyles.normalStyle}>
        <h1 styles={ReactStyle({textAlign: this.state.textAlign})}>Application</h1>
        <Button styles={[ButtonStyles.success]}>
          <Icon name="cog" /> OK
        </Button>
        <Button styles={[ButtonStyles.error, ApplicationStyles.childStyle]}>
          <Icon name="remove" /> Cancel
        </Button>
        <TextAlignSwitcher
          styles={ApplicationStyles.lastChild}
          onTextAlign={(textAlign) => this.setState({textAlign: textAlign})}
          />
      </div>
    );
  }

}

if (typeof window !== 'undefined') {
  React.render(<Application />, document.getElementById('app'));
}
