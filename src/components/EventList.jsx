/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Event from './Event';


// eslint-disable-next-line react/prop-types
const EventList = ({ events }) => {
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <ul id="event-list">
        
        {events? events.map(event => <Event key={event.id }event={event} />): null}
      </ul>
    );
   }


export default EventList;