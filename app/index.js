import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SelectDepart from './components/select_depart';
import SelectArrive from './components/select_arrive';
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

    this.fetchingAPI(this.state.depStation, this.state.arrStation)
  }

  fetchingAPI(departureStation, arrivalStation) {
    fetch("http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + departureStation + "&dest=" + arrivalStation + "&date=now&key=MW9S-E7SL-26DU-VV8V&b=0&a=4&l=0")
      .then(function(response) {
          //console.log(response.headers.get('Content-Type'));
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
    return (
      <div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1 col-xs-6 search-bar">
            <SelectDepart onSelectedChange={selected => this.reRunFetching(selected, "depart")}/>
          </div>
          <div className="col-md-5 col-xs-6 search-bar">
            <SelectArrive onSelectedChange={selected => this.reRunFetching(selected, "arrive")}/>
          </div>
        </div>
        <TimeTable schedules={this.state.schedules} />
      </div>
    )
  }

  reRunFetching(selected, type) {
    if (type === "depart") {
      this.fetchingAPI(selected, this.state.arrStation)
      this.setState({depStation: selected});
      console.log(selected);
      console.log(this.state.depStation);
    }
    else if (type === "arrive") {
      this.fetchingAPI(this.state.depStation, selected)
      this.setState({arrStation: selected});
      console.log(this.state.depStation, selected);
    }
    //this.fetchingAPI(this.state.depStation, this.state.arrStation)
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
