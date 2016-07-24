import React from 'react';
import Moment from 'moment';
var moment = require('moment');

const TimeItem = ({schedule}) => {
  //const schedule = props.schedule;
  const duration = parsingDuration(schedule.getAttribute("origTimeMin"), schedule.getAttribute("destTimeMin"));
  const usedLines = extractLines(schedule);

  return (
    <tr>
      <td className="col-md-3">
        {schedule.getAttribute("origTimeMin")}
      </td>
      <td className="col-md-3">
        {schedule.getAttribute("destTimeMin")}
      </td>
      <td className="col-md-3">
        {duration} mins
      </td>
      <td className="col-md-3">
        {usedLines}
      </td>
    </tr>
  ); 
}

const parsingDuration = (depTime, arrTime) => {
  const formattedDepTime = moment(depTime, "hh:mm a");
  const formattedArrTime = moment(arrTime, "hh:mm a");
  return moment(formattedArrTime - formattedDepTime).format("mm");
}

const extractLines = (schedule) => {
  const legs = schedule.getElementsByTagName("leg");
  const legArray =[];
  let i = 0;
  for (i in legs) {
    if (legs[i].outerHTML) {
      legArray.push(legs[i].getAttribute("line"));
    } 
  };
  return legArray.join(", ");
}

export default TimeItem;