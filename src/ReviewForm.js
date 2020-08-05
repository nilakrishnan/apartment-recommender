import React from 'react';
import { withRouter } from 'react-router'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      responsivenessR: '',
      securityR: '',
      weekdayR: '',
      weekendR: '',
      greenStR: '',
      transportR: '',
      overallR: '',
      description: ''
    }
    this.handleAptId = this.handleAptId.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.handleSecurityChange = this.handleSecurityChange.bind(this);
    this.handleWeekdayChange = this.handleWeekdayChange.bind(this);
    this.handleWeekendChange = this.handleWeekendChange.bind(this);
    this.handleGreenChange = this.handleGreenChange.bind(this);
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleOverallChange = this.handleOverallChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAptId(e) {
    this.setState({
      id: e.target.value
    });
  }

  handleResponseChange(e) {
    this.setState({
      responsivenessR: e.target.value
    });
  }

  handleSecurityChange(e) {
    this.setState({
      securityR: e.target.value
    });
  }

  handleWeekdayChange(e) {
    this.setState({
      weekdayR: e.target.value
    });
  }

  handleWeekendChange(e) {
    this.setState({
      weekendR: e.target.value
    });
  }

  handleGreenChange(e) {
    this.setState({
      greenStR: e.target.value
    });
  }

  handleTransportChange(e) {
    this.setState({
      transportR: e.target.value
    });
  }

  handleOverallChange(e) {
    this.setState({
      overallR: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleAdd(e) {
    e.preventDefault()

    fetch('/addReview', {
      method: 'POST',
      body: JSON.stringify({
        "UserId": this.props.email,
        "AptId": this.state.id,
        "ResponsivenessRating": this.state.responsivenessR,
        "SecurityDepositReturnedRating": this.state.securityR,
        "WeekdayVolumeRating": this.state.weekdayR,
        "WeekendVolumeRating": this.state.weekendR,
        "GreenStProximityRating": this.state.greenStR,
        "TransportationProximity": this.state.transportR,
        "OverallRating": this.state.overallR,
        "Description": this.state.description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.text())
  }

  render() {
    return (
      <form className="Review" onSubmit={this.handleAdd}>
          <p>Apartment ID
            <input type="text" value={this.state.id} onChange={this.handleAptId}/>
          </p>
          <p>Responsiveness Rating
            <input type="text"  value={this.state.responsivenessR} onChange={this.handleResponseChange}/>
          </p>
          <p>Security Deposit Returned Rating
            <input type="text"  value={this.state.securityR} onChange={this.handleSecurityChange}/>
          </p>
          <p>Weekday Volume Rating
            <input type="text"  value={this.state.weekdayR} onChange={this.handleWeekdayChange}/>
          </p>
          <p>Weekend Volume Rating
            <input type="text"  value={this.state.weekendR} onChange={this.handleWeekendChange}/>
          </p>
          <p>Green St Proximity Rating
            <input type="text"  value={this.state.greenStR} onChange={this.handleGreenChange}/>
          </p>
          <p>Transportation Proximity Rating
            <input type="text"  value={this.state.transportR} onChange={this.handleTransportChange}/>
          </p>
          <p>Overall Rating
            <input type="text"  value={this.state.overallR} onChange={this.handleOverallChange}/>
          </p>
          <p>Description
            <input type="text"  value={this.state.description} onChange={this.handleDescriptionChange}/>
          </p>
          <button type="submit" value="Add">Add Review</button>
      </form>
    );
  }
}

export default withRouter(ReviewForm);
