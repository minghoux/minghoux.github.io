import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './App';
import Profile from './Profile';
import Playground from './Playground';
import Routeplay from './Routeplay';
import './index.css';

let destination = document.getElementById('root');
ReactDOM.render(
  // <Router>
  //   <Route path="/" component={App}>
  //   </Route>
  //   <Route path="/profile" component={Profile}>
  //   </Route>
  //   <Route path="/routeplay" component={Routeplay}>
  //   </Route>
  // </Router>,
 	// <App />,
 	<Routeplay />,
	destination
);
