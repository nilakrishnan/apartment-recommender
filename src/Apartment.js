import React from 'react';

class Apartment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Apartment'>
        <p>{this.props.id}</p>
        <p>{this.props.company}</p>
        <p>{this.props.rent}</p>
        <p>{this.props.beds}</p>
        <p>{this.props.baths}</p>
      </div>
    );
  }
}

export default Apartment;
