import React from 'react';
import TimeItem from './time_item.js';

const TimeList = (props) => {
  const timeItems = props.schedules.map((schedule) => {
    return (
      <TimeItem
        key ={schedule.getAttribute("destTimeMin")}
        schedule={schedule} />
    );
  });

  return (
    <tbody>
      {timeItems}
    </tbody>
  );
}

export default TimeList;