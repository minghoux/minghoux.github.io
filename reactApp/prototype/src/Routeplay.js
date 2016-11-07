import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home!</h2>
        <p>Some random content</p>
      </div>
    )
  }
}

class Stuff extends Component {
  render() {
    return (
      <div>
        <h2>Finding some stuff?</h2>
        <p>You are looking at stuff</p>
      </div>
    )
  }
}

class Contact extends Component {
  render() {
    return (
      <div>
        <h2>Email me now</h2>
        <p>random@email.com</p>
      </div>
    )
  }
}

// main content with 3 nav
class Content extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stuff">Stuff</Link></li>
          <li><Link to="/contact">Contact</Link></li>            
        </ul>
        {this.props.children}
      </div>
    )
  }
}


// Putting everything together
class Routeplay extends Component {
  render() {
    // Inline style
    var container = {
      padding: "0 5%",
      margin: "0 auto"
    };
    return (
      <div style={container}>
          <h1>Routing Playground</h1>
          <Router>
            <Route path="/" component={Content}>
              <IndexRoute component={Home} />
              <Route path="/stuff" component={Stuff} />
              <Route path="/contact" component={Contact} />
            </Route>
          </Router>
      </div>
    );
  }
}

export default Routeplay;
