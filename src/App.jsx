// eslint-disable-next-line no-unused-vars
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberofEvents from './components/NumberOfEvents';

const App = () => {
  return (
    <div>
      <CitySearch />
      <EventList />
      <NumberofEvents />
    </div>
  );
 }


export default App;