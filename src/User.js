import React from 'react';
import { withRouter } from 'react-router'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      firstName: '',
      lastName: ''
    }
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleUpdate(e) {
    e.preventDefault();

    let requestBody = {}
    Object.entries(this.state).forEach(([key,value]) => {
      if (value !== '') {
        let bodyKey = key.charAt(0).toUpperCase() + key.slice(1)
        requestBody[`${bodyKey}`] = value
      }
    })

    requestBody.UserId = this.props.email
    fetch('/updateUser', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.text())
  }

  handleDelete() {
    fetch('/deleteUser', {
      method: 'POST',
      body: JSON.stringify({
        "UserId": this.props.email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.text())

    this.props.history.push({
      pathname: '/',
    })
  }

  render() {
    return (
      <form className="User" onSubmit={this.handleUpdate}>
          <p>First Name
            <input type="text" name="FirstName" defaultValue={this.state.firstName} value={this.state.firstName} onChange={this.handleFirstChange}/>
          </p>
          <p>Last Name
            <input type="text" name="LastName" value={this.state.lastName} onChange={this.handleLastChange}/>
          </p>
          <button type="submit" value="Update">Update Update</button>
          <button type="button" value="Delete" onClick={this.handleDelete}>Delete User</button>
      </form>
    );
  }
}

export default withRouter(User);
