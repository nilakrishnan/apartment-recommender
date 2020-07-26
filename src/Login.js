import React from 'react';
import { withRouter } from 'react-router'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/account',
      search: `?userId=${this.state.email}`
    })
  }

  render() {
    return (
      <form className="Login" onSubmit={this.handleSubmit}>
          <p>Email
            <input type="text" name="Email" value={this.state.email} onChange={this.handleChange}/>
          </p>
          <p>First Name
            <input type="text" name="FirstName" />
          </p>
          <p>Last Name
            <input type="text" name="LastName" />
          </p>
          <button type="submit" value="Submit"/>
      </form>
    );
  }
}

export default withRouter(Login);
