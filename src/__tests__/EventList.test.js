// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

// eslint-disable-next-line no-undef
describe('<EventList /> component', () => {
  let EventListComponent;
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  })
 
  // eslint-disable-next-line no-undef
  test('has an element with "list" role', () => {
    // eslint-disable-next-line no-undef
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
 
  // eslint-disable-next-line no-undef
  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
// eslint-disable-next-line no-undef
expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
  });