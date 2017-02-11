import React from 'react';
import TimeList from './time_list.js';

const TimeTable = ({schedules}) => {
  if (!schedules) {
    return <div>Loading...</div>;
  }

  return (
    <div className="panel panel-default">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="col-md-3">Departure Time</th>
            <th className="col-md-3">Arrival Time</th>
            <th className="col-md-3">Trip Duration</th>
            <th className="col-md-3">Used Lines</th>
           </tr>
        </thead>
        <TimeList schedules={schedules} />       
      </table>
    </div>
  );
}

export default TimeTable;
