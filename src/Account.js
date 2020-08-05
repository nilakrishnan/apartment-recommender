import React from 'react';
import Building from './Building.js'

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      recommendations: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { data } = this.props.location

    fetch(`/getUser?UserId=${data.email}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(user => {

      if (user.length === 0) {
        fetch('/addUser', {
          method: 'POST',
          body: JSON.stringify({
            "UserId": data.email,
            "FirstName": data.firstName,
            "LastName": data.lastName
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(res => res.text())
          this.setState({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName
        })

      } else {
        this.setState({
          email: user[0].UserId,
          firstName: user[0].FirstName,
          lastName: user[0].LastName
        })
      }
    })

    alert('here')
    fetch(`/getRecommendations?UserId=${data.email}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(list => {
      alert(list.length)
      this.setState({
        recommendations: list
      })
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
        <div className="Review">
        </div>
        <div className="Recommendations">
          {this.state.recommendations.map(r => <Building id={r.AptId}/>)}
        </div>
      </div>
    );
  }
}

export default Account;
