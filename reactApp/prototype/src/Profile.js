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
        <Buttonify behavior="submit" bgcolor="#333">Edit Profile</Buttonify>
        <Buttonify behavior="submit" bgcolor="#999">Magic!</Buttonify>
        <hr />
        <ProfileDetail name="John Smith" email="johnsmith@randomcorp.com"/>
        <hr />
        <ApplyHistory />
        <hr />
        <SavedJobs>
          <p>This is defined as child content!</p>
        </SavedJobs>
      </div>
    )
  }
}

// showing property from parent call
class Buttonify extends Component {
  render() {
    var btn = {
      backgroundColor: this.props.bgcolor,
      color: "#fff",
      fontSize: "16",
      padding: ".5em 1em",
      border: "0",
      borderRadius: "5px",
      margin: ".3em"
    };
    return (
      <div>
        <button style={btn} type={this.props.behavior}>{this.props.children}</button>
      </div>
    )
  }
}

// define a function and reuse in component
function getDistance(speed, time) {
    var result = speed * time;
    return result;
}    

class ProfileDetail extends Component {
  render() {
    return (
      <div>
        <h4>Profile Detail</h4>
        <p>{this.props.name}</p>
        <p>Marketing Manager at Random Company</p>
        <p>{this.props.email}</p>
        <p>{getDistance(5,10)}</p>
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
        <p>{this.props.children}</p>
        <p>
          <h5>Cities:</h5>
        {cities.map(function(city){
          return <span>{city} </span>
        })}
        </p>
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

let cities = ['Johor', 'Kedah','Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'];

export default Profile;
