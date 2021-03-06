import React, { Component } from 'react';
import msToTime from '../helpers/msToTime';
import pickupIcon from '../../assets/car.svg';
import arrivalIcon from '../../assets/clock.svg';

class Route extends Component {
  constructor(props) {
    super(props);
    this.setActiveRoute = this.setActiveRoute.bind(this);
  }
  setActiveRoute() {
    return this.props.selectRoute({
      route: this.props.route,
      style: this.props.classStyle
    });
  }

  render() {
    let eta = Math.round(this.props.route.eta/60),
        etaMessage = `${eta} min`,
        totalTime = Math.round((this.props.route.duration + this.props.route.eta))*1000,
        arrivalTime = (msToTime(Date.now()+totalTime)),
        cost = this.props.route.avg_estimate ? '$' + (Math.round(this.props.route.avg_estimate/100)) : 'Metered',
        disclaimer = this.props.carpool ? '\nMay make additional stops' : '',
        image = this.props.marker ? <img src={this.props.marker} className="marker-tag"/> : null;
    return (
      <li className={`list-item ${this.props.classStyle}`}
        onClick={this.setActiveRoute}>
        <div className="ride-info">
          <div className="route-cost" style={this.props.priceStyle}>{cost} {this.props.surgeNotice}</div>
          <div className="route-name">{this.props.route.display_name}</div>
          {image}
        </div>
        <div className="travel-info">
          <div className="driver-eta"><img src={pickupIcon}/> {etaMessage}</div>
          <div className="route-duration"><img src={arrivalIcon}/> {arrivalTime}</div>
        </div>
        <span className="disclaimer">{disclaimer}</span>
      </li>
    );
  }
}

export default Route;
