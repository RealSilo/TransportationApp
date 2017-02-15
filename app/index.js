import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SelectStation from './components/select_station';
import TimeTable from './components/time_table';

const DEP_STATION = 'sfia';
const ARR_STATION = 'frmt';
const NUMBER_OF_RETURNED_TRIPS = 4;
const BART_URL = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + DEP_STATION + "&dest=" + ARR_STATION + "&date=now&key=MW9S-E7SL-26DU-VV8V&b=0&a=" + NUMBER_OF_RETURNED_TRIPS + "&l=0";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schedules: [],
      depStation: DEP_STATION,
      arrStation: ARR_STATION
    };

    this.fetchingAPI(this.state.depStation, this.state.arrStation);
  }

  fetchingAPI(departureStation, arrivalStation) {
    fetch("http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + departureStation + "&dest=" + arrivalStation + "&date=now&key=MW9S-E7SL-26DU-VV8V&b=0&a=4&l=0")
      .then(function(response) {
          return response.text();})
      .then((responseXML) => {
        let tripsArray = this.parsingXML(responseXML);
        this.setState({schedules: tripsArray});
      })
      .catch((error) => {
        console.log(error);
      });
  }
   
  render () {
    const sameStation = () => {
      return this.state.depStation === this.state.arrStation
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1 col-xs-6 search-bar">
            <h4>Choose a depart station {this.state.depStation}</h4>
            <SelectStation 
              onSelectedChange={selected => this.reRunFetching(selected, "depart")}
              station={this.state.depStation}
            />
          </div>
          <div className="col-md-5 col-xs-6 search-bar">
            <h4>Choose an arrival station {this.state.arrStation}</h4>
            <SelectStation 
              onSelectedChange={selected => this.reRunFetching(selected, "arrive")}
              station={this.state.arrStation}
            />
          </div>
        </div>
        <div className="row table-row">
          <div className="col-md-10 col-md-offset-1 col-xs-12">
            {sameStation() ? (
              <div className="alert alert-danger" role="alert">
                The depart and arrival stations are the same.
              </div>
            ) : (
              <TimeTable schedules={this.state.schedules} />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-xs-12">
            <div>Note: BART API only allows to fetch 4 trips after the specified time.</div>
          </div>
        </div>
      </div>
    )
  }

  reRunFetching(selected, type) {
    if (type === "depart") {
      this.setState({depStation: selected});
      this.fetchingAPI(selected, this.state.arrStation);
    }
    else if (type === "arrive") {
      this.setState({arrStation: selected});
      this.fetchingAPI(this.state.depStation, selected);
    }
  }

  parsingXML(responseXML) {
    var XML = new DOMParser().parseFromString(responseXML, "text/xml");
    var trips = XML.getElementsByTagName("trip");
    var tripsArray = [];
    var i=0;
    for (i in trips) {
      if (i < NUMBER_OF_RETURNED_TRIPS) {
        tripsArray.push(trips[i]);
      }
    };
    return tripsArray;
  }
}

ReactDOM.render(<App /> , document.querySelector('.container'));
