import React from 'react';
import TimeList from './time_list.js';

const TimeTable = ({schedules}) => {
  if (!schedules) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row table-row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="col-md-3">Departure Time</th>
                  <th className="col-md-3">Arrival Time</th>
                  <th className="col-md-3">Duration</th>
                  <th className="col-md-3">Line Num</th>
                 </tr>
              </thead>
              <TimeList schedules={schedules} />       
            </table>
          </div>
        </div>
      </div>
      <div>Note: BART API only allows to fetch 4 trips after the specified time.</div>
    </div>
  );
}

export default TimeTable;
