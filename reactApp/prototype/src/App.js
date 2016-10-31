import React, { Component } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import logo from './logo.svg';
import './App.css';

// Define a standalone component
let footerMsg = 'This is a footer';
class Footer extends Component {
  render() {
    return (
      <div className="App-footer">
        {footerMsg}
      </div>
    )    
  }
}

// Component taking variables
class Hello extends Component {
  render() {
    return (
      <div>
        Hello, {this.props.greetTarget}! {this.props.children}
      </div>
    )
  }
}

// Loading data into component
class Greeting extends Component {
  constructor() {
    super();
    this.state = {
      name: 'John Smith',
      email: 'john@gmail.com',
      title: 'Web Designer',
      company: 'Awesome Company',
      skills: ['Photoshop', 'HTML', 'ReactJS'],
    }
  }
  render() {
    return (
      <div>
        <p>
          <Hello greetTarget={this.state.name}>How are you?</Hello>
          {this.state.email} <br />
          {this.state.title} at {this.state.company} <br />
          {this.state.skills.map(function(skill){
            return <span>{skill} </span>;
          })}
        </p>
      </div>
    )
  }
}

class Jobs extends Component {
  // setup json fetch
  getJSON() {
  return fetch('http://mrcow138.github.io/json/jobad2.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data: responseJson});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  // map json to this.state
  constructor() {
    super();
    this.state = {
      data: [],
    }
    this.getJSON();
  }
  // displaying data
  render() {
    return(
      <div>
        <hr />
        <strong>Jobs for you</strong>
        <ul className="text-left list">
          {this.state.data.map(function(obj){
            return <li className="list-item">
                    <strong><a href={obj.poslink}>{obj.jobTitle}</a></strong> <br />
                    {obj.company} <br /> 
                    <small>{obj.jobquickinfoblock_value}</small>
                   </li>;
          })}
        </ul>
      </div>
    )
  }
}

// Putting everything together
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="App-intro">
          <div>
            <span>Home / </span>
            <span>Profile</span>
          </div>
          <Greeting />
          <Jobs />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
