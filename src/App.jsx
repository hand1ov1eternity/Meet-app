/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEventsZZZ';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); 
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); 

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE)); 
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents 
        defaultNumber={currentNOE} 
        onNumberChange={setCurrentNOE} // Pass the function to update currentNOE
      /> 
      <EventList events={events} />
    </div>
  );
};

atatus.config('9ec039446b0541188b6baeb9051973e3').install();
atatus.notify(new Error('Test Atatus Setup'));

export default App;