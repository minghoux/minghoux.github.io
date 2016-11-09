import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';
import './App.css';


class Searchbar extends Component {
  render() {
    return (
      <div className="searchbar-wrap">
        <input className="searchbar-input" type="text" placeholder="Search" />
      </div>
    );
  }
}

class Navigation extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav-item">
          <IndexLink to="/">Feed</IndexLink>
        </div>
        <div className="nav-item">
          <Link to="/Me">Me</Link>
        </div>
      </div>
    );
  }
}

class JobAd extends Component {
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
  constructor() {
    super();
    this.state = {
      data: [],
    }
    this.getJSON();
  }
  render() {
    return (
      <div className="padding">
        <div className="section-header">Jobs in Marketing</div>

        {this.state.data.map(function(jobad){
          return (
            <div className="jobad padding">
              <a className="jobad-title" href={jobad.poslink}>{jobad.jobTitle}</a>
              <div className="company-display">
                <div className="company-name">
                  {jobad.company}
                </div>
                <div className="company-logo">
                  <img src={jobad.logo} />
                </div>
              </div>

              <ul className="jobad-desc">
                <li>{jobad.location}</li>
                <li>
                  {jobad.jobquickinfotext_value}
                  <ul className="jobad-desc-sub">
                    <li>{jobad.jobsummary_value_1}</li>
                    <li>{jobad.jobsummary_value_2}</li>
                    <li>{jobad.jobsummary_value_3}</li>
                  </ul>
                </li>
                <li>{jobad.jobquickinfoblock_value}</li>
                <li className="jobad-action"><span className="btn-action">Bookmark</span></li>
              </ul>
            </div>
          )
        })}

      </div>
    );
  }
}

class Me extends Component {
  render() {
    let list = ["Application History", "Bookmarks", "Job invitations", "Job alert", "Settings"];
    let profile = {
      name: "John Chan",
      title: "Marketing Manager",
      company: "Heng Sang Bank"
    };
    return (
      <div>
        <div className="card padding">
          <div><strong>{profile.name}</strong></div>
          <div>{profile.title}</div>
          <div>{profile.company}</div>
        </div>

        <ul className="card">
          {list.map(function(link){
            return <li className="padding">{link} </li>;
          })}
        </ul>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <Searchbar />
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}


// Putting everything together
class Feed extends Component {
  render() {
    // Inline style
    var container = {
      padding: "0 5%",
      margin: "0 auto"
    };
    // setup routing
    return (
      <div className="container-wrap">
        <Router>
          <Route path="/" component={Content}>
            <IndexRoute component={JobAd} />
            <Route path="me" component={Me} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default Feed;
