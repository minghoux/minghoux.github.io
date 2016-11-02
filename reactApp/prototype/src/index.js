import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './App';
import Profile from './Profile';
import './index.css';

let destination = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Route path="/profile" component={Profile}>
    </Route>
    <Route path="/" component={App}>
    </Route>
  </Router>,
 	// <App />,
	destination
);
