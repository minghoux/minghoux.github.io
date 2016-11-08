import React, { Component } from 'react';
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
  // map json to this.state
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
        <div className="section-header">Jobs in Marketing 123</div>

        {this.state.data.map(function(jobad){
          return (
            <div className="jobad padding">
              <div className="jobad-title">{jobad.jobTitle}</div>
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
              </ul>
            </div>
          )
        })}

      </div>
    );
  }
}

// class Searchbar extends Component {
//   render() {
//     return (
//       <div>Content</div>
//     );
//   }
// }


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
      <div>
          <Searchbar />
          <JobAd />
      </div>
    );
  }
}

export default Feed;
