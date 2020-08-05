import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.preventDefault();

    fetch('/deleteReview', {
      method: 'POST',
      body: JSON.stringify({
        "ReviewId": this.props.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.text()).then(text => alert(text))
  }

  render() {
    return (
      <div className='Review'>
        <p>Address: {this.props.address}</p>
        <p>Number of Bedrooms: {this.props.beds}</p>
        <p>Number of Bathrooms: {this.props.baths}</p>
        <p>Responsiveness: {this.props.response}</p>
        <p>Security: {this.props.security}</p>
        <p>Weekday Volume: {this.props.weekday}</p>
        <p>Weekend Volume: {this.props.weekend}</p>
        <p>Proximity to Green Street: {this.props.green}</p>
        <p>Proximity to Public Transportation: {this.props.transport}</p>
        <p>Overall Rating: {this.props.overall}</p>
        <p>Description: {this.props.description}</p>
        <button type="button" value="Delete" onClick={this.handleDelete}>Delete This Review</button>
        <hr class="solid"></hr>
      </div>
    );
  }
}

export default Review;
