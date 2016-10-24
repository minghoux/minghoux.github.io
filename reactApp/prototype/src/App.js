import React, { Component } from 'react';
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
          <b>Hello {this.state.name}</b> <br />
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
  constructor() {
    super();
    this.state = {
      data: [],
    }
    this.getJSON();
  }

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

  render() {
    return(
      <div>
        <hr />
        <strong>Jobs for you</strong>
        <ul className="text-left">
          {this.state.data.map(function(obj){
            return <li>{obj.jobTitle}, {obj.company} <br /> 
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
          <Greeting />
          <Jobs />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
