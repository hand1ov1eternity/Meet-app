// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';

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
  test('renders correct number of events', () => {
    EventListComponent.rerender(<EventList events={
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    } />);
    // eslint-disable-next-line no-undef
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
 });