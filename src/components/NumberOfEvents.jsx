/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberChange, defaultNumber = 32 }) => {
  const [eventCount, setEventCount] = useState(defaultNumber);

  const handleInputChange = (event) => {
    const value = event.target.value; // Keep the value as a string for now
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setEventCount(parsedValue); // Update state with the parsed number
      if (onNumberChange) onNumberChange(parsedValue); // Safely call onNumberChange
    } else if (value === '') {
      setEventCount(''); // Allow clearing the input
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        id="number-of-events-input"
        type="number"
        value={eventCount}
        onChange={handleInputChange}
        role="textbox"
        data-testid="numberOfEventsInput"
      />
    </div>
  );
};

export default NumberOfEvents;
