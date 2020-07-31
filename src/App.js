import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login.js'
import Account from './Account.js'
import Review from './Review.js'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/account" component={Account} />
            <Route path="/account/review" component={Review} />
          </Switch>
        </div>
      </Router>
    );
  }
}
