import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    fetch('/deleteReview', {
      method: 'POST',
      body: JSON.stringify({
        "ReviewId": this.props.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.text())
  }

  render() {
    return (
      <div className='Review'>
        <p>{this.props.id}</p>
        <p>{this.props.user}</p>
        <p>{this.props.apt}</p>
        <p>{this.props.date}</p>
        <p>{this.props.baths}</p>
        <p>{this.props.response}</p>
        <p>{this.props.security}</p>
        <p>{this.props.weekday}</p>
        <p>{this.props.weekend}</p>
        <p>{this.props.green}</p>
        <p>{this.props.transport}</p>
        <p>{this.props.overall}</p>
        <p>{this.props.description}</p>
        <button type="button" value="Delete" onClick={this.handleDelete}/>
      </div>
    );
  }
}

export default Review;
