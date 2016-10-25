import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './App';
// import Greeting from './App';
import './index.css';

let destination = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>,
 	// <App />,
	destination
);
