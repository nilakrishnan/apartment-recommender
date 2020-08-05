import React from 'react';

class Apartment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Apartment'>
        <p>Leasing Company: {this.props.company}</p>
        <p>Address: {this.props.address}</p>
        <p>Rent: {this.props.rent}</p>
        <p>Number of Bedrooms: {this.props.beds}</p>
        <p>Number of Bathrooms: {this.props.baths}</p>
        <hr class="solid"></hr>
      </div>
    );
  }
}

export default Apartment;
