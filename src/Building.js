import React from 'react';

class Building extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      here: ''
    }
  }

  render() {
    return (
      <div className='Building'>
        <p>{this.props.address}, {this.props.company}, {this.props.price}</p>
        <hr class="solid"></hr>
      </div>
    );
  }
}

export default Building;
