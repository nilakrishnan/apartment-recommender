import React from 'react';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { data } = this.props.location
    fetch(`/getUser?userId=${data.email}`, {
      method: 'GET',
    }).then(res => res.json())
    .then(user => {
      if (!user[0]) {
        fetch('/addUser', {
          method: 'POST',
          body: JSON.stringify({
            "UserId": data.email,
            "FirstName": data.firstName,
            "LastName": data.lastName})
        }).then(res => res.json()).then(newUser => this.setState({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
          })
        )
      } else {
        this.setState({
          email: user[0].UserId,
          firstName: user[0].FirstName,
          lastName: user[0].LastName
        })
      }
    })
  }

  render() {
    return (
      <div className="Account">
        <div className="Profile">
          <p>{this.state.firstName}</p>
          <p>{this.state.lastName}</p>
        </div>
      </div>
    );
  }
}

export default Account;
