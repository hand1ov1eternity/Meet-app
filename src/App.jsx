/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import EventGenresChart from './components/EventGenresChart';
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState(""); 
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. Event list may not be up-to-date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <h1>Meet App</h1>
      
      <div className={infoAlert ? 'info-alert-container' : errorAlert ? 'error-alert-container' : 'warning-alert-container'}>
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null} 
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>

      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setInfoAlert={setInfoAlert} 
      />

      <NumberOfEvents 
        defaultNumber={currentNOE} 
        onNumberChange={setCurrentNOE} 
        setErrorAlert={setErrorAlert}
      />
      
      <div className="charts-container">
  <CityEventsChart allLocations={allLocations} events={events} />
  <EventGenresChart events={events} />
     </div>

      
      <EventList events={events} />
    </div>
  );
};

export default App;
