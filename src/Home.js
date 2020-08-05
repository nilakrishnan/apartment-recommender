import React from 'react';
import { withRouter } from 'react-router'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickLogin(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/login',
    })
  }

  handleClickSearch(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/search',
    })
  }

  render() {
    return (
      <div className='Home'>
        <div className='login-link'>
          <button type="button" value="Signup / Login" onClick={this.handleClickLogin}>Signup or Login</button>
        </div>
        <h1>Champaign Apartment Recommender!</h1>
        <div className='search-link'>
          <button type="button" name="Search for Apartments" value="Search for Apartments" onClick={this.handleClickSearch}>Search for Apartments</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
