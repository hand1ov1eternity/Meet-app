/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberChange, defaultNumber = 32, setErrorAlert }) => {
  const [eventCount, setEventCount] = useState(defaultNumber);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 100) {
      setEventCount(value); // Keep the input value so user sees what they typed
      setErrorAlert("Please enter a number between 1 and 100.");
    } else {
      setEventCount(parsedValue);
      setErrorAlert(""); // Clear error if input is valid
      onNumberChange(parsedValue);
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
