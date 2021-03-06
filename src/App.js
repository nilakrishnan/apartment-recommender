import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from './Account.js'
import Home from './Home.js'
import Login from './Login.js'
import Search from './Search.js'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/account" component={Account} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}
