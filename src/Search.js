import React from 'react';
import Building from './Building.js'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      numBeds: '',
      numBaths: '',
      responsiveness: '',
      security: '',
      weekdayVolume: '',
      weekendVolume: '',
      greenStProximity: '',
      transportationProximity: '',
      overallRating: '',
      isUpdated: true,
      results: []
    };

    this.handleUpdate = this.handleUpdate.bind(this);
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

  handleUpdate() {
    this.setState({
      isUpdated: false
    })
  }

  handlePrice(e) {
    this.setState({
      price: e.target.value
    })
    this.handleUpdate()
  }

  handleNumBeds(e) {
    this.setState({
      numBeds: e.target.value
    })
    this.handleUpdate()
  }

  handleNumBaths(e) {
    this.setState({
      numBaths: e.target.value
    })
    this.handleUpdate()
  }

  handleResponsiveness(e) {
    this.setState({
      responsiveness: e.target.value
    })
    this.handleUpdate()
  }

  handleSecurity(e) {
    this.setState({
      security: e.target.value
    })
    this.handleUpdate()
  }

  handleWeekday(e) {
    this.setState({
      weekdayVolume: e.target.value
    })
    this.handleUpdate()
  }

  handleWeekend(e) {
    this.setState({
      weekendVolume: e.target.value
    })
    this.handleUpdate()
  }

  handleGreenStProx(e) {
    this.setState({
      greenStProximity: e.target.value
    })
    this.handleUpdate()
  }

  handleTransportationProx(e) {
    this.setState({
      transportationProximity: e.target.value
    })
    this.handleUpdate()
  }

  handleRating(e) {
    this.setState({
      overallRating: e.target.value
    })
    this.handleUpdate()
  }

  handleSubmit(e) {
    e.preventDefault();

    let requestBody = {}
    Object.entries(this.state).forEach(([key,value]) => {
      if (value !== '' && key !== 'isUpdated' && key !== 'results') {
        let bodyKey = key.charAt(0).toUpperCase() + key.slice(1)
        requestBody[`${bodyKey}`] = value
      }
    })

    fetch(`/search`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(list => {
      this.setState({
        isUpdated: true,
        results: list
      })
    })
  }

  render() {
    return (
      <div className="Search">
        <form className="filter" onSubmit={this.handleSubmit}>
            <p>Max Price
              <input type="text" value={this.state.price} onChange={this.handlePrice}/>
            </p>
            <p>Number of Beds
              <input type="text" value={this.state.numBeds} onChange={this.handleNumBeds}/>
            </p>
            <p>Number of Baths
              <input type="text" value={this.state.numBaths} onChange={this.handleNumBaths}/>
            </p>
            <p>Responsiveness Rating
              <input type="text" value={this.state.responsiveness} onChange={this.handleResponsiveness}/>
            </p>
            <p>Security Deposit Returned Rating
              <input type="text" value={this.state.security} onChange={this.handleSecurity}/>
            </p>
            <p>Weekday Volume Rating
              <input type="text" value={this.state.weekdayVolume} onChange={this.handleWeekday}/>
            </p>
            <p>Weekend Volume Rating
              <input type="text" value={this.state.weekendVolume} onChange={this.handleWeekend}/>
            </p>
            <p>Green St Proximity
              <input type="text" value={this.state.greenStProximity} onChange={this.handleGreenStProx}/>
            </p>
            <p>Transportation Proximity
              <input type="text" value={this.state.transportationProximity} onChange={this.handleTransportationProx}/>
            </p>
            <p>Overall Rating
              <input type="text" value={this.state.overallRating} onChange={this.handleRating}/>
            </p>
            <button type="submit" value="Submit"/>
        </form>
        <div className="Results">
          {this.state.isUpdated && this.state.results.map(b => <Building id={b.BuildingId}/>)}
        </div>
      </div>

    );
  }
}

export default Search;
