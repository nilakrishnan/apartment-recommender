import React from 'react';
import { withRouter } from 'react-router'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleFirstChange(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleLastChange(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/account',
      data: this.state
    })
  }

  render() {
    return (
      <form className="Login" onSubmit={this.handleSubmit}>
          <p>Email
            <input type="text" name="Email" value={this.state.email} onChange={this.handleEmailChange}/>
          </p>
          <p>First Name
            <input type="text" name="FirstName" value={this.state.firstName} onChange={this.handleFirstChange}/>
          </p>
          <p>Last Name
            <input type="text" name="LastName" value={this.state.lastName} onChange={this.handleLastChange}/>
          </p>
          <button type="submit" name="Signup/Login" value="Submit"/>
      </form>
    );
  }
}

export default withRouter(Login);
