import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
// import { App, Jobs } from './App';
import App from './App';
import Jobs from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>,
 	// <App />,
	document.getElementById('root')
);
