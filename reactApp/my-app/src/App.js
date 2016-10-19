import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Define a standalone component
class Footer extends Component {
  render() {
    return (
      <div className="App-footer">
        This is the Footer!
      </div>
    )    
  }
}

class Greeting extends Component {
  constructor() {
    super();
    this.state = {
      name: 'John Smith',
      email: 'john@gmail.com',
      title: 'Web Designer',
      company: 'Awesome Company',
    }
  }
  render() {
    return (
      <div>
        <p>
          <b>Hello {this.state.name}</b> <br />
          {this.state.email} <br />
          {this.state.title} at {this.state.company}
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
