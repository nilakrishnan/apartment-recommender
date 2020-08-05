import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);
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
      </div>
    );
  }
}

export default Review;
