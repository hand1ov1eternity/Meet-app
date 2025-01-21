/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { render,within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getEvents } from '../api';
import App from './../App';

describe('<App /> component', () => {
  let AppDOM;
   beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
 
 
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
 
 
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);
 
 
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  
 
 
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
 
 
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });

  test('updates the number of events displayed when the user changes the number of events input', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
  
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByTestId('numberOfEventsInput');
  
    // Simulate typing a new number in the input
    await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
  
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
  
    // Check if the number of rendered events matches the new input
    expect(allRenderedEventItems.length).toBe(10);
  }); test('updates the number of events displayed when the user changes the number of events input', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
  
    // Locate the NumberOfEvents input
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).getByTestId('numberOfEventsInput'); // Use getByTestId
  
    // Simulate typing into the input field
    await user.clear(NumberOfEventsInput); // Clear the input
    await user.type(NumberOfEventsInput, '10'); // Type the new value
  
    // Verify the number of rendered events
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEventItems.length).toBe(10);
  });

});