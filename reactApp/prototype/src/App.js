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
    this.json = null;
    this.getJSON();
    
  }

  getJSON() {
    return fetch('http://mrcow138.github.io/json/jobad2.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log(this.json);
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
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
