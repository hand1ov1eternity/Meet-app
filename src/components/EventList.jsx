/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Event from './Event';

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events ? events.map((event) => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      )) : null}
    </ul>
  );
};

export default EventList;