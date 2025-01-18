// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';


// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars, react/prop-types
const CitySearch = ({ allLocations }) => {
    // eslint-disable-next-line no-undef
    const [showSuggestions, setShowSuggestions] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [query, setQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [suggestions, setSuggestions] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const handleInputChanged = (event) => {
    const value = event.target.value;
    // eslint-disable-next-line react/prop-types
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];


    setQuery(value);
    setSuggestions(filteredLocations);
  };
    
  return (
      <div id="city-search">
        <input
          type="text"
          className="city"
          placeholder="Search for a city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
        {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities'>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
      </div>
    )
  }

export default CitySearch;