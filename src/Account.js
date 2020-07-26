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
            "userId": data.email,
            "firstName": data.firstName,
            "lastName": data.lastName
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        // }).then(res => res.json()).then(json => console.log(json));
      }).then(res => res.text())
        this.setState({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName
        })
      } else {
        this.setState({
          // this is for if there is already an account created
          // we are saving that information
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
          <p>{this.state.email}</p>
          <p>{this.state.firstName}</p>
          <p>{this.state.lastName}</p>
        </div>
      </div>
    );
  }
}

export default Account;
