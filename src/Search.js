import React from 'react';
import { withRouter } from 'react-router'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      numBeds: null,
      numBaths: null,
      responsiveness: null,
      security: null,
      weekdayVolume: null,
      weekendVolume: null,
      greenStProximity: null,
      transportationProximity: null,
      overallRating: null
    };
    this.handlePrice = this.handlePrice.bind(this);
    this.handleNumBeds = this.handleNumBeds.bind(this);
    this.handleNumBaths = this.handleNumBaths.bind(this);
    this.handleResponsiveness = this.handleResponsiveness.bind(this);
    this.handleSecurity = this.handleSecurity.bind(this);
    this.handleWeekday = this.handleWeekday.bind(this);
    this.handleWeekend = this.handleWeekend.bind(this);
    this.handleGreenStProx = this.handleGreenStProx.bind(this);
    this.handleTransportationProx = this.handleTransportationProx.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  handleNumBeds(e) {
    this.setState({
      numBeds: e.target.value
    });
  }

  handleNumBaths(e) {
    this.setState({
      numBaths: e.target.value
    });
  }

  handleResponsiveness(e) {
    this.setState({
      responsiveness: e.target.value
    });
  }

  handleSecurity(e) {
    this.setState({
      security: e.target.value
    });
  }

  handleWeekday(e) {
    this.setState({
      weekdayVolume: e.target.value
    });
  }

  handleWeekend(e) {
    this.setState({
      weekendVolume: e.target.value
    });
  }

  handleGreenStProx(e) {
    this.setState({
      greenStProximity: e.target.value
    })
  }

  handleTransportationProx(e) {
    this.setState({
      transportationProximity: e.target.value
    })
  }

  handleRating(e) {
    this.setState({
      overallRating: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // fetch(`/search`, {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    // .then(res => res.json())
    // .then(list => {
    //   buildings = list
    // })
  }

  render() {
    return (
      <div className="Search">
        <form className="filter" onSubmit={this.handleSubmit}>
            <p>Max Price
              <input type="text" name="Max Price" value={this.state.price} onChange={this.handlePrice}/>
            </p>
            <p>Number of Beds
              <input type="text" name="Number of Beds" value={this.state.numBeds} onChange={this.handleNumBeds}/>
            </p>
            <p>Number of Baths
              <input type="text" name="Number of Baths" value={this.state.numBaths} onChange={this.handleNumBaths}/>
            </p>
            <p>Responsiveness Rating
              <input type="text" name="Responsiveness" value={this.state.responsiveness} onChange={this.handleResponsiveness}/>
            </p>
            <p>Security Deposit Returned Rating
              <input type="text" name="Max Price" value={this.state.security} onChange={this.handleSecurity}/>
            </p>
            <p> Rating
              <input type="text" name="Max Price" value={this.state.price} onChange={this.handleRating}/>
            </p>
            <button type="submit" name="Submit" value="Submit"/>
        </form>
        <div className="results">

        </div>
      </div>

    );
  }
}

export default withRouter(Search);
