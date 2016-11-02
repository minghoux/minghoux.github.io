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
        <h3>Sub-Navigation</h3>
        <hr />
        <ul className="text-left">
          <li><Link to="/profiledetail">Update Profile</Link></li>
          <li><Link to="/appliedjob">Application History</Link></li>
          <li><Link to="/savedjob">Saved Jobs</Link></li>
        </ul>

        <h3>Dynamic content</h3>
        <hr />
        <ProfileDetail />
        <ApplyHistory />
        <SavedJobs />
      </div>
    )
  }
}

class ProfileDetail extends Component {
  render() {
    return (
      <div>
        <h4>Profile Detail</h4>
        <p>John Smith</p>
        <p>Marketing Manager at Random Company</p>
        <p>johnsmith@randomcorp.com</p>
      </div>
    )
  }
}

class ApplyHistory extends Component {
  constructor() {
    super();
    this.state = {
      header: 'Application History',
      jobs: [
        {title: 'Marketing Analyst', company: 'Creative One'},
        {title: 'Analysis Manager', company: 'Big Corporate'},
        {title: 'Social Media Marketer', company: 'Social Guru'},
      ],
    };
  }
  render() {
    return (
      <div>
        <h4>{this.state.header}</h4>
        {this.state.jobs.map(function(job){
          return <div>{job.title} at {job.company}</div>;
        })}
      </div>
    )
  }
}

class SavedJobs extends Component {
  render() {
    return (
      <div>
        <h4>Saved Jobs</h4>
        <p>No saved job yet.</p>
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
