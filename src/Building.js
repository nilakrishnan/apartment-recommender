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
        <p>{this.props.id}</p>
      </div>
    );
  }
}

export default Building;
