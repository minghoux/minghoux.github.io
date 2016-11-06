import React, { Component } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import './App.css';

class Display extends Component {
  render() {
    return (
      <div>
        <h5>Info from parent</h5>
        <p>{this.props.children}</p>
        <h5>Info from grand parent</h5>
        <p>{this.props.color}</p>
        <p>{this.props.num}</p>
        <p>{this.props.size}</p>
      </div>
    )
  }
}

class Label extends Component {
  render() {
    return (
      <Display {...this.props}>
        Your shirt info:
      </Display>
    )
  }
}

// Passing all 3 properties to children
// Shirt > Label > Display
class Shirt extends Component {
  render() {
    return (
      <Label {...this.props}/>
    )
  }
}

// Add up number every second
var LightningCounter = React.createClass({
  // set value BEFORE component is rendered
  getInitialState: function() {
    return {
      header: "Lightning Counter",
      strikes: 0
    };
  },
  // function to add up the count
  timerTick: function() {
    this.setState({
      strikes: this.state.strikes + 100
    });
  },
  // perform action AFTER component is rendered
  componentDidMount: function() {
    setInterval(this.timerTick, 1000);
  },
  render: function() {
    return (
      <div>
        <h1>{this.state.header}</h1>
        <h1>{this.state.strikes}</h1>
      </div>
    );
  }
});


// Putting everything together
class Playground extends Component {
  render() {
    // Inline style
    var container = {
      padding: "0 5%",
      margin: "0 auto"
    };
    return (
      <div style={container}>
        <h1>Passing Variables</h1>
        <Shirt color="steelblue" num="3.14" size="medium"/>
        <LightningCounter />
      </div>
    );
  }
}

export default Playground;
