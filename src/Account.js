import React from 'react';
import Apartment from './Apartment.js'
import Review from './Review.js'
import ReviewForm from './ReviewForm.js'
import User from './User.js'

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      reviews: [],
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

    fetch(`/getReviews?UserId=${data.email}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(list => {
      this.setState({
        reviews: list
      })
    })

    fetch(`/getRecommendations?UserId=${data.email}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(list => {
      this.setState({
        recommendations: list
      })
    })
  }

  render() {
    return (
      <div className="Account">
        <div className= "Profile">
          <p>{this.state.firstName}</p>
          <p>{this.state.lastName}</p>
        </div>
        <User first={this.state.firstName} last={this.state.lastName} email={this.state.email}/>
        <hr class="solid"></hr>
        <ReviewForm email={this.state.email} onReviewAdded={this.reloadReviews}/>
        <div className="Reviews">
        <p><b>Reviews you've left... </b></p>
          {this.state.reviews.map(r => <Review email={this.state.email} id={r.ReviewId} address={r.Address} date={r.Date} response={r.ResponsivenessRating}
            security={r.SecurityDepositReturnedRating} beds={r.NumBeds} baths={r.NumBeds} weekday={r.WeekdayVolumeRating} weekend={r.WeekendVolumeRating} green={r.GreenStProximityRating}
            transport={r.TransportationProximity} overall={r.OverallRating} description={r.Description}/>)}
        </div>
        <div className="Recommendations">
          <hr class="solid"></hr>
          <p><b>Our recommendations based on those reviews...</b></p>
          {this.state.recommendations.map(r => <Apartment company={r.Company} address={r.Address} rent={r.Price} beds={r.NumBeds} baths={r.NumBaths}/>)}
        </div>
      </div>
    );
  }
}

export default Account;
