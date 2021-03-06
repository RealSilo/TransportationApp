import React, { Component } from 'react';

class SelectStation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <select className='form-control'
          value={this.props.station}
          onChange={event => this.onInputChange(event.target.value)}>
          <option value="12th">12th St. Oakland City Center</option>
          <option value="16th">16th St. Mission (SF)</option>
          <option value="19th">19th St. Oakland</option>
          <option value="24th">24th St. Mission (SF)</option>
          <option value="ashb">Ashby (Berkeley)</option>
          <option value="balb">Balboa Park (SF)</option>
          <option value="bayf">Bay Fair (San Leandro)</option>
          <option value="cast">Castro Valley</option>
          <option value="civc">Civic Center (SF)</option>
          <option value="cols">Coliseum</option>
          <option value="colm">Colma</option>
          <option value="conc">Concord</option>
          <option value="daly">Daly City</option>
          <option value="dbrk">Downtown Berkeley</option>
          <option value="dubl">Dublin/Pleasanton</option>
          <option value="deln">El Cerrito del Norte</option>
          <option value="plza">El Cerrito Plaza</option>
          <option value="embr">Embarcadero (SF)</option>
          <option value="frmt">Fremont</option>
          <option value="ftvl">Fruitvale (Oakland)</option>
          <option value="glen">Glen Park (SF)</option>
          <option value="hayw">Hayward</option>
          <option value="lafy">Lafayette</option>
          <option value="lake">Lake Merritt (Oakland)</option>
          <option value="mcar">MacArthur (Oakland)</option>
          <option value="mlbr">Millbrae</option>
          <option value="mont">Montgomery St. (SF)</option>
          <option value="nbrk">North Berkeley</option>
          <option value="ncon">North Concord/Martinez</option>
          <option value="oakl">Oakland Internationall Airport</option>
          <option value="orin">Orinda</option>
          <option value="pitt">Pittsburg/Bay Point</option>
          <option value="phil">Pleasant Hill</option>
          <option value="powl">Powell St. (SF)</option>
          <option value="rich">Richmond</option>
          <option value="rock">Rockridge (Oakland)</option>
          <option value="sbrn">San Bruno</option>
          <option value="sfia">San Francisco Internationall Airport</option>
          <option value="sanl">San Leandro</option>
          <option value="shay">South Hayward</option>
          <option value="ssan">South San Francisco</option>
          <option value="ucty">Union City</option>
          <option value="wcrk">Walnut Creek</option>
          <option value="wdub">West Dublin</option>
          <option value="woak">West Oakland</option>
        </select>
      </div>
    );
  }

  onInputChange(selected) {
    this.props.onSelectedChange(selected);
  }
}

export default SelectStation;