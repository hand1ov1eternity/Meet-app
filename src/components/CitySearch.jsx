// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';


// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
const CitySearch = () => {
    // eslint-disable-next-line no-undef
    const [showSuggestions, setShowSuggestions] = useState(false);
    return (
      <div id="city-search">
        <input
          type="text"
          className="city"
                  placeholder="Search for a city"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions ? <ul className="suggestions"></ul> : null}
      </div>
    )
  }

export default CitySearch;