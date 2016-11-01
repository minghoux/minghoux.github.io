import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import './App.css';


class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link> / <Link to="/profile">Profile</Link>
      </div>
    )
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        This is my profile!
      </div>
    )
  }
}


// Putting everything together
class Profile extends Component {
  render() {
    return (
      <div className="App">
          <Nav />
          <Content />
      </div>
    );
  }
}

export default Profile;
