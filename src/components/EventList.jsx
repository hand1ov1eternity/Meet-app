// eslint-disable-next-line no-unused-vars
import React from 'react';

import Event from './Event';


// eslint-disable-next-line react/prop-types
const EventList = ({ events }) => {
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <ul id="event-list">
        
        {events.map(event => <Event event={event} />)}
      </ul>
    );
   }


export default EventList;